import { readFileSync } from 'node:fs';

function extractArrayBody(src, marker) {
  const idx = src.indexOf(marker);
  if (idx < 0) throw new Error('marker not found: ' + marker);
  const start = src.indexOf('= [', idx);
  if (start < 0) throw new Error('array start not found after ' + marker);
  const arrStart = start + 2;
  let depth = 0;
  for (let i = arrStart; i < src.length; i++) {
    const ch = src[i];
    if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) return src.slice(arrStart + 1, i);
    }
  }
  throw new Error('unclosed array');
}

function splitTopObjects(body) {
  const objs = [];
  let depth = 0;
  let start = -1;
  let inStr = false;
  let esc = false;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start >= 0) {
        objs.push(body.slice(start, i + 1));
        start = -1;
      }
    }
  }
  return objs;
}

function extractField(block, field) {
  const re = new RegExp(`"${field}":\\s*"((?:\\\\.|[^"\\\\])*)"`);
  const m = block.match(re);
  return m ? JSON.parse('"' + m[1] + '"') : '';
}

function extractBool(block, field) {
  const m = block.match(new RegExp(`"${field}":\\s*(true|false)`));
  return m ? m[1] === 'true' : false;
}

function extractNum(block, field) {
  const m = block.match(new RegExp(`"${field}":\\s*(\\d+)`));
  return m ? Number(m[1]) : null;
}

function parseFile(filePath, marker) {
  const src = readFileSync(filePath, 'utf8');
  const body = extractArrayBody(src, marker);
  return splitTopObjects(body).map((block, i) => ({
    index: i,
    id: extractField(block, 'id'),
    num: extractNum(block, 'num'),
    source: extractField(block, 'source'),
    question: extractField(block, 'question'),
    isPassage: extractBool(block, 'isPassageQuestion'),
    correctAnswer: extractField(block, 'correctAnswer'),
    optA: extractField(block, 'A'),
    optB: extractField(block, 'B'),
    optC: extractField(block, 'C'),
    optD: extractField(block, 'D'),
    passageContent: extractField(block, 'content'),
    filePath,
    block,
  }));
}

function norm(s) {
  return (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function fingerprint(q) {
  return [q.question, q.optA, q.optB, q.optC, q.optD].map(norm).join(' | ');
}

function stemKey(q) {
  return norm(q.question).replace(/[-–—]/g, '-');
}

const docs1 = parseFile('/Volumes/Data/cheat/src/data/questions.ts', 'const rawQuestions');
const docs2 = parseFile('/Volumes/Data/cheat/src/data/docs2Questions.ts', 'export const docs2Questions');
const all = [...docs1, ...docs2];

console.log('docs1', docs1.length, 'docs2', docs2.length, 'total', all.length);

const byFp = new Map();
for (const q of all) {
  const fp = fingerprint(q);
  if (!byFp.has(fp)) byFp.set(fp, []);
  byFp.get(fp).push(q);
}
const dups = [...byFp.entries()].filter(([, a]) => a.length > 1);
console.log('\nexact question+options dup groups:', dups.length);
let extra = 0;
for (const [, arr] of dups) {
  extra += arr.length - 1;
  console.log('\n--- keep?', arr.map(q => `${q.id}#${q.num}/${q.source}/p=${q.isPassage}`).join('  ||  '));
  console.log(arr[0].question.slice(0, 140));
}
console.log('\nextra exact copies:', extra);

const byStem = new Map();
for (const q of all) {
  const k = stemKey(q);
  if (!byStem.has(k)) byStem.set(k, []);
  byStem.get(k).push(q);
}
const stemDups = [...byStem.entries()].filter(([, a]) => a.length > 1);
console.log('\nsame-stem groups:', stemDups.length);
for (const [k, arr] of stemDups) {
  const fps = new Set(arr.map(fingerprint));
  if (fps.size === 1) continue;
  console.log('\nNEAR', arr.map(q => `${q.id}#${q.num}/${q.source} ans=${q.correctAnswer} [${q.optA}|${q.optB}|${q.optC}|${q.optD}]`).join('\n  '));
  console.log('  stem:', k.slice(0, 160));
}

const byPassage = new Map();
for (const q of all.filter(q => q.isPassage && q.passageContent)) {
  const k = norm(q.passageContent).slice(0, 400);
  if (!byPassage.has(k)) byPassage.set(k, []);
  byPassage.get(k).push(q);
}
console.log('\npassage-content groups:', [...byPassage.values()].filter(a => a.length > 1).length);
for (const arr of [...byPassage.values()].filter(a => a.length > 1)) {
  const ids = arr.map(q => q.id).join(', ');
  const uniqueStems = new Set(arr.map(stemKey));
  console.log(`  n=${arr.length} uniqueQuestions=${uniqueStems.size} ids=${ids.slice(0, 200)}`);
}
