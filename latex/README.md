# Báo cáo LaTeX: DataInsight

## Cấu trúc
- `main.tex`: báo cáo tổng hợp gồm cả 3 chương.
- `preamble.tex`: packages và thông tin nhóm dùng chung (trường, môn, thành viên, landing page).
- `cover.tex`: trang bìa.
- `chapters/text.tex`, `chapters/tabular.tex`, `chapters/timeseries.tex`: mỗi thành viên chỉ sửa chương của mình.
- `standalone/*-report.tex`: file biên dịch báo cáo PDF riêng của từng mảng.
- `figures/`: hình xuất từ notebook (đã có `hcmut-logo.png` cho trang bìa).
- `build/` (tự sinh, không commit): file trung gian và PDF khi biên dịch.

## Biên dịch trong VS Code
1. Cài MiKTeX (hoặc TeX Live) và extension **LaTeX Workshop**.
2. Mở thư mục `CO5177/` làm workspace (để VS Code đọc `.vscode/settings.json`).
3. Mở `main.tex` hoặc một file trong `standalone/`, bấm **Ctrl+S** để biên dịch, **Ctrl+Alt+V** để xem PDF.
4. Recipe mặc định chạy XeLaTeX 2 lần (để có mục lục). PDF nằm trong `build/` cạnh file đã biên dịch.

## Dùng trên Overleaf
Upload toàn bộ thư mục `latex/`, chọn compiler **XeLaTeX**, Main document là `main.tex`
hoặc `standalone/<type>-report.tex`.

## Quy ước
- Không ghi số liệu giả: thay mọi `--` bằng metric sau lần chạy notebook cuối.
- Hình đặt tên `<type>_<nội-dung>.png` trong `figures/`, chèn bằng `\figureplaceholder{tên.png}{mô tả}`; chưa có hình thì hiện khung placeholder.
- Hình sáng tạo phải trả lời một câu hỏi cụ thể, có so sánh định lượng và caption kết luận.
- Ghi nguồn và license dataset.
- PDF nộp: copy từ `build/` sang `../reports/<type>-report.pdf` rồi cập nhật `links.report` trong `assets/js/data.js`.
