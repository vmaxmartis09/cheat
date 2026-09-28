# TOEIC Flashcard & Cheat Codes — Luyện Đề & Mẹo Siêu Tốc

Ứng dụng web React + Vite + TypeScript được thiết kế theo triết lý **Taste** (tối giản, tinh tế, trải nghiệm người dùng mượt mà) để luyện thuộc đáp án và nắm bắt mẹo làm bài TOEIC Part 5, 6 & 7 dựa trên các tài liệu trong thư mục [`docs/`](file:///Volumes/Data/cheat/docs/) (`docs/ToIce 2.docx`, `docs/test-2.doc`, `docs/Toeic Doc_Cong.docx`).

---

## 🌟 Tính Năng & Kho Đề Hoàn Toàn Mới (385 Câu Reading + 100 Câu Listening)

### 1. Phân Chia 3 Tab Học Thông Minh & Tinh Tế:
- **📖 Tab 1: Ôn Đọc (Reading - 385 câu)**:
  - **⭐ Giai đoạn 1: Docs 1 (151 câu Bắt Buộc Học Thuộc)**: Gắn nhãn bắt buộc học thuộc, trích xuất từ `ToIce 2.docx`, `test-2.doc`, `Toeic Doc_Cong.docx`.
  - **🚀 Giai đoạn 2: Docs 2 (234 câu Reading Toàn Diện)**:
    - *Trọn bộ Đề 1 (Trial Test - 100 câu #101-200)*
    - *Trọn bộ Đề 2 (YBM Assignment Test 1 - 100 câu #101-200)*
    - *Chuyên đề & Rèn Luyện Tips (34 câu)*: 6 câu Part 5 in-class + 12 câu Part 6 in-class/homework + 16 câu Part 7 drills.
  - Cơ chế làm đúng xuất hiện câu tương tự, làm sai lấy câu trước làm Case study, bộ đếm dừng tối thiểu 9s để đọc mẹo.

- **🎧 Tab 2: Luyện Nghe (Listening - Trọn bộ 100 câu LC)**:
  - **Bộ đề thi chuẩn Hackers Listening Test 7 (Session 10 & 12)**:
    - *Part 1 (Q1–Q6)*: Đầy đủ **hình ảnh chụp thực tế (photographs)** trích xuất chất lượng cao, kèm accent giọng đọc (Australian, British, Canadian...). Bấm vào ảnh để phóng to toàn màn hình.
    - *Part 2 (Q7–Q31)*: Hỏi & đáp 3 lựa chọn (A, B, C) kèm bẫy từ đồng âm & bẫy Yes/No.
    - *Part 3 (Q32–Q70)*: Hội thoại ngắn 3 câu/đoạn kèm biểu đồ/bảng giảm giá đồ họa (**Graphic questions Q67, Q70**) và toàn văn Audio Script chính thức.
    - *Part 4 (Q71–Q100)*: Bài nói ngắn độc thoại kèm sơ đồ mặt bằng, biểu đồ doanh thu và quy trình công việc (**Graphics Q93, Q96, Q100**).
  - **Trình phát Audio Player & Live Script đồng bộ**:
    - Nghe audio gốc trực tiếp trong ứng dụng (`/audio/part1.mp3`, `part2.mp3`, `part3.mp3`, `part4.mp3`).
    - Nút tua nhanh/lùi 5s (`-5s` / `+5s`), điều chỉnh tốc độ đọc (`0.8x`, `1.0x`, `1.2x`).
    - **Hiển thị Lời thoại (Live Script) tự động khi đang phát audio** kèm hoạt ảnh sóng âm trực quan, có thể bật/tắt linh hoạt.

- **📊 Tab 3: Kết Quả & Ôn Lỗi Sai (Analytics & Spaced Repetition)**:
  - Thống kê tỷ lệ chính xác, chuỗi làm đúng (streak), nhật ký học tập lưu tự động theo ngày.
  - Chế độ lọc ôn riêng các câu làm sai để khắc sâu kiến thức.

- **☁️ Đồng Bộ Đa Thiết Bị (Cross-Device Sync) & Supabase**:
  - Đăng nhập và liên kết tiến trình học giữa **Điện thoại, Máy tính, iPad** bằng Passkey: **`vmax0109`**.
  - **Cloud Sync tức thì**: Tự động lưu và đồng bộ câu trả lời, chuỗi streak, câu sai, nhật ký học tập mỗi khi làm bài.
  - **Hỗ trợ Supabase**: Tùy chọn kết nối trực tiếp với dự án Supabase riêng với 1 click copy câu lệnh SQL tạo bảng `toeic_sync`.
  - **Sao lưu ngoại tuyến (Offline Backup)**: Xuất và nhập file `.json` tiện lợi.

---

## 🚀 Hướng Dẫn Chạy Ứng Dụng

Cài đặt và khởi chạy ứng dụng:

```bash
# 1. Cài đặt dependencies (nếu clone mới)
npm install

# 2. Khởi động server phát triển
npm run dev

# 3. Hoặc build bản production tối ưu
npm run build
npm run preview
```

Mở trình duyệt truy cập: `http://localhost:5173` (hoặc cổng hiển thị trên terminal).

> **Ghi chú về dữ liệu**: Để đảm bảo repository trên GitHub luôn nhẹ và tải nhanh (< 5MB), toàn bộ mã nguồn, giao diện và dữ liệu câu hỏi đã được đóng gói hoàn chỉnh trong mã nguồn (`src/data/`), các tệp tài liệu thô ban đầu (`docs/`, `docs2/`) và file âm thanh nặng (`public/audio/`) được tự động loại khỏi git theo quy định trong `.gitignore`.
