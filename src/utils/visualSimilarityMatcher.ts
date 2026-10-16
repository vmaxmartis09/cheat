// Client-Side Visual Image Similarity Engine
// Uses HTML5 Canvas + Perceptual Difference Hash (dHash) & Grayscale Luminance Matching
// Enables instant recognition of TOEIC tests by matching Part 1 photographs (even from phone/iPad photos).

import { PART1_TESTS_CATALOG, Part1PhotoItem } from '../data/part1VisualIndex';

export interface VisualTestMatch {
  bookId: string;
  bookName: string;
  testNum: string;
  testLabel: string;
  confidence: number; // 0 to 100%
  matchedQNum: number;
  matchedPhotoUrl: string;
  sampleLabel?: string;
  allPhotos: Part1PhotoItem[];
}

interface ImageSample {
  label: string;
  dHash: string;
  lum: number[];
}

/**
 * Compute 64-bit dHash and 64-element luminance array from canvas image data
 */
function extractFeaturesFromCanvas(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  sw: number,
  sh: number
): { dHash: string; lum: number[] } {
  // 1. Luminance 8x8
  const lumCanvas = document.createElement('canvas');
  lumCanvas.width = 8;
  lumCanvas.height = 8;
  const lumCtx = lumCanvas.getContext('2d')!;
  lumCtx.drawImage(ctx.canvas, sx, sy, sw, sh, 0, 0, 8, 8);
  const lumData = lumCtx.getImageData(0, 0, 8, 8).data;
  const lum: number[] = [];
  for (let i = 0; i < lumData.length; i += 4) {
    const gray = Math.round(0.299 * lumData[i] + 0.587 * lumData[i + 1] + 0.114 * lumData[i + 2]);
    lum.push(gray);
  }

  // 2. dHash 9x8
  const dhCanvas = document.createElement('canvas');
  dhCanvas.width = 9;
  dhCanvas.height = 8;
  const dhCtx = dhCanvas.getContext('2d')!;
  dhCtx.drawImage(ctx.canvas, sx, sy, sw, sh, 0, 0, 9, 8);
  const dhData = dhCtx.getImageData(0, 0, 9, 8).data;
  const grays: number[][] = [];
  for (let y = 0; y < 8; y++) {
    const row: number[] = [];
    for (let x = 0; x < 9; x++) {
      const idx = (y * 9 + x) * 4;
      const g = Math.round(0.299 * dhData[idx] + 0.587 * dhData[idx + 1] + 0.114 * dhData[idx + 2]);
      row.push(g);
    }
    grays.push(row);
  }

  let bits = '';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      bits += grays[y][x + 1] > grays[y][x] ? '1' : '0';
    }
  }

  // Convert 64 bits to 16 hex chars
  let hex = '';
  for (let i = 0; i < 64; i += 4) {
    const nibble = parseInt(bits.slice(i, i + 4), 2);
    hex += nibble.toString(16);
  }

  return { dHash: hex, lum };
}

/**
 * Hamming distance between two 16-hex-char dHashes (0 to 64)
 */
function hammingDistance(h1: string, h2: string): number {
  if (!h1 || !h2 || h1.length !== 16 || h2.length !== 16) return 64;
  let dist = 0;
  for (let i = 0; i < 16; i++) {
    const v1 = parseInt(h1[i], 16);
    const v2 = parseInt(h2[i], 16);
    let xor = v1 ^ v2;
    while (xor > 0) {
      dist += xor & 1;
      xor >>= 1;
    }
  }
  return dist;
}

/**
 * Normalized Correlation & MSE similarity between two 64-element luminance arrays (0..1)
 */
function luminanceSimilarity(lum1: number[], lum2: number[]): number {
  if (!lum1 || !lum2 || lum1.length !== 64 || lum2.length !== 64) return 0;
  let sumSqDiff = 0;
  for (let i = 0; i < 64; i++) {
    const d = lum1[i] - lum2[i];
    sumSqDiff += d * d;
  }
  const rms = Math.sqrt(sumSqDiff / 64);
  // Max possible RMS is 255
  return Math.max(0, 1 - rms / 128);
}

/**
 * Compute similarity score (0..100) between an image sample and a reference Part 1 photo
 */
function compareSampleToPhoto(sample: ImageSample, photo: Part1PhotoItem): number {
  const hDist = hammingDistance(sample.dHash, photo.dHash);
  // Hamming score: 0 dist = 100%, 32 dist = 0%
  const hashScore = Math.max(0, (32 - hDist) / 32) * 100;

  const lumScore = luminanceSimilarity(sample.lum, photo.lum) * 100;

  // Blended score with weight
  return 0.55 * hashScore + 0.45 * lumScore;
}

/**
 * Main Visual Matcher Function
 * Compares an uploaded image against all Part 1 photos in the database
 */
export async function matchImageToPart1Tests(
  imageSource: File | Blob | string
): Promise<VisualTestMatch[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    let objectUrlToRevoke: string | null = null;
    if (typeof imageSource === 'string') {
      img.src = imageSource;
    } else {
      objectUrlToRevoke = URL.createObjectURL(imageSource);
      img.src = objectUrlToRevoke;
    }

    img.onload = () => {
      if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);

      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        if (width < 20 || height < 20) {
          resolve([]);
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);

        // Generate multiple multi-scale region samples:
        // 1. Full image
        // 2. Top-half & Bottom-half (typical for 2-photo pages)
        // 3. Central crop
        // 4. 4 quadrants (for 4-photo pages)
        const samples: ImageSample[] = [];

        // Full image sample
        const full = extractFeaturesFromCanvas(ctx, 0, 0, width, height);
        samples.push({ label: 'Ảnh Toàn Phần', ...full });

        // Center 80% crop (removes phone bezels / desk padding)
        const padX = Math.round(width * 0.1);
        const padY = Math.round(height * 0.1);
        const center = extractFeaturesFromCanvas(ctx, padX, padY, width - 2 * padX, height - 2 * padY);
        samples.push({ label: 'Vùng Trung Tâm', ...center });

        // If portrait orientation (e.g. phone photo of a test page with 2 photos)
        if (height > width * 1.1) {
          const halfH = Math.round(height * 0.5);
          samples.push({
            label: 'Nửa Trên (Câu 1/3/5)',
            ...extractFeaturesFromCanvas(ctx, 0, 0, width, halfH),
          });
          samples.push({
            label: 'Nửa Dưới (Câu 2/4/6)',
            ...extractFeaturesFromCanvas(ctx, 0, halfH, width, height - halfH),
          });

          // Top photo focused (y: 15%..45%)
          samples.push({
            label: 'Khung Tranh 1',
            ...extractFeaturesFromCanvas(ctx, Math.round(width * 0.15), Math.round(height * 0.15), Math.round(width * 0.7), Math.round(height * 0.3)),
          });
          // Bottom photo focused (y: 50%..80%)
          samples.push({
            label: 'Khung Tranh 2',
            ...extractFeaturesFromCanvas(ctx, Math.round(width * 0.15), Math.round(height * 0.5), Math.round(width * 0.7), Math.round(height * 0.3)),
          });
        }

        // Compare each test in the catalog
        const testMatches: VisualTestMatch[] = [];

        for (const testInfo of PART1_TESTS_CATALOG) {
          if (!testInfo.photos || testInfo.photos.length === 0) continue;

          let bestScoreForTest = 0;
          let bestPhoto: Part1PhotoItem = testInfo.photos[0];
          let bestSampleLabel = '';

          // Compare all samples with all photos of this test
          for (const sample of samples) {
            for (const photo of testInfo.photos) {
              const score = compareSampleToPhoto(sample, photo);
              if (score > bestScoreForTest) {
                bestScoreForTest = score;
                bestPhoto = photo;
                bestSampleLabel = sample.label;
              }
            }
          }

          if (bestScoreForTest > 25) {
            testMatches.push({
              bookId: testInfo.bookId,
              bookName: testInfo.bookName,
              testNum: testInfo.testNum,
              testLabel: testInfo.testLabel,
              confidence: Math.round(bestScoreForTest),
              matchedQNum: bestPhoto.qNum,
              matchedPhotoUrl: bestPhoto.imageUrl,
              sampleLabel: bestSampleLabel,
              allPhotos: testInfo.photos,
            });
          }
        }

        // Sort descending by confidence
        testMatches.sort((a, b) => b.confidence - a.confidence);

        resolve(testMatches.slice(0, 10));
      } catch (err) {
        console.error('Visual Matching Error:', err);
        resolve([]);
      }
    };

    img.onerror = (e) => {
      console.error('Failed to load image for visual matching:', e);
      resolve([]);
    };
  });
}
