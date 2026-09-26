# TOEIC Flashcard & Cheat Codes — Luyện Đề & Mẹo Siêu Tốc

Ứng dụng web React + Vite + TypeScript được thiết kế theo triết lý **Taste** (tối giản, tinh tế, trải nghiệm người dùng mượt mà) để luyện thuộc đáp án và nắm bắt mẹo làm bài TOEIC Part 5 & 6 dựa trên các tài liệu trong kho lưu trữ (`ToIce 2.docx`, `test-2.doc`).

---

## 🌟 Tính Năng Nổi Bật

1. **81 Câu hỏi TOEIC chuẩn mực**:
   - Được trích xuất trực tiếp từ các file tài liệu trong thư mục (`ToIce 2`, `Test 2 Part 5`, `Part 6`).
   - Đầy đủ 4 lựa chọn (A, B, C, D) và đáp án chính xác 100%.

2. **Mẹo nhận biết từ khóa siêu tốc (TOEIC Cheat Code)**:
   - Dành riêng cho người học yếu/mất gốc tiếng Anh.
   - Nhìn dấu hiệu từ vựng, giới từ, thì ngữ pháp là chọn được ngay trong 3-5 giây (ví dụ: *thấy "under" đi kèm "management" -> chọn ngay "under"*).

3. **Đếm ngược 30 giây (30s Reflex Timer)**:
   - Thanh thời gian chuyển màu mượt mà (Xanh ➔ Cam ➔ Đỏ).
   - Khi chọn sai hoặc hết 30s mà chưa chọn: Tự động dừng giờ, hiện đáp án đúng, mở ngay khung mẹo nhận biết và dịch nghĩa câu.

4. **Chế độ học linh hoạt**:
   - **Tuần tự (Sequential)**: Luyện lần lượt theo số thứ tự câu trong tài liệu (101 ➔ 140).
   - **Ngẫu nhiên (Random / Shuffle)**: Xáo trộn câu hỏi để rèn phản xạ thực chiến.
   - **Ôn câu sai (Spaced Repetition)**: Tự động gom các câu đã từng làm sai để luyện lại đến khi nhuần nhuyễn.

5. **Nhật ký học tập & Ghi chú cải thiện mỗi ngày (Daily Logs)**:
   - Tự động lưu trữ theo ngày vào `localStorage` (không lo mất dữ liệu khi F5 hoặc qua ngày mới).
   - Thống kê số câu đã luyện, số câu đúng/sai, tỷ lệ chính xác (%).
   - Danh sách chi tiết các lỗi sai trong ngày kèm mẹo.
   - **Khung tự ghi chép cải thiện**: Người học tự ghi lại những điểm mình đã tiến bộ hôm nay.

6. **Phím tắt nhanh (Keyboard Shortcuts)**:
   - `1`, `2`, `3`, `4` hoặc `A`, `B`, `C`, `D`: Chọn đáp án tức thì.
   - `Space` hoặc `Enter`: Chuyển sang câu tiếp theo.

---

## 🚀 Hướng Dẫn Chạy Ứng Dụng

Cài đặt và khởi chạy ứng dụng cực kỳ đơn giản:

```bash
# 1. Khởi động server dev
npm run dev

# 2. Hoặc build và chạy bản production
npm run build
npm run preview
```

Mở trình duyệt truy cập: `http://localhost:5173` (hoặc cổng hiển thị trên terminal).
