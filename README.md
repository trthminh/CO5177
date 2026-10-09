# DataInsight — CO5177

Bài tập lớn môn **Nền tảng lập trình cho phân tích và trực quan dữ liệu** (CO5177)
Trường Đại học Bách Khoa – ĐHQG-HCM · Học kỳ 261, năm học 2026–2027 · Giảng viên: Lê Thành Sách

🌐 **Landing page:** https://trthminh.github.io/CO5177/

## Thành viên

| Họ tên | MSSV | Phụ trách |
|---|---|---|
| Trương Thanh Minh | 2580893 | Text |
| Tô Anh Phát | 2580894 | Tabular |
| Trần Lê Hoàng Long | 2570443 | Time series |

## Các bài tập lớn con

| Loại dữ liệu | Trang | Notebook |
|---|---|---|
| Text | [text/](https://trthminh.github.io/CO5177/text/) | `notebooks/text.ipynb` |
| Tabular | [tabular/](https://trthminh.github.io/CO5177/tabular/) | `notebooks/tabular.ipynb` |
| Time series | [timeseries/](https://trthminh.github.io/CO5177/timeseries/) | `notebooks/timeseries.ipynb` |

## Cấu trúc repo

```
index.html               Landing page
tabular/ text/ timeseries/   Trang từng bài con (dùng chung template)
assets/js/data.js        ★ Toàn bộ thông tin nhóm, bài con, link — chỉ cần sửa file này
assets/js/i18n.js        Chuỗi giao diện song ngữ Việt–Anh
assets/js/render.js      Render trang từ data.js
assets/js/effects.js     Hiệu ứng: hiện dần khi cuộn, số đếm, canvas hero, thẻ nghiêng 3D...
assets/css/style.css     Giao diện
assets/css/effects.css   Hiệu ứng chuyển động (tự tắt khi bật "giảm chuyển động")
notebooks/               File .ipynb (link GitHub + Colab tạo tự động)
reports/                 PDF report từng bài
scripts/check_links.py   Kiểm tra link trước khi nộp
```

## Cập nhật nội dung

1. Mở `assets/js/data.js`, tìm bài cần sửa trong `projects`.
2. Điền `summary`, `problem`, `dataset`, `results`; đổi `status` (`planned` → `in-progress` → `done`).
3. Thêm link: `links.notebook = "notebooks/tabular.ipynb"`, `links.report = "reports/tabular-report.pdf"`, `links.video = "https://youtu.be/..."`.
   Link để `null` sẽ hiển thị "Sắp cập nhật".
4. Nếu có sửa file trong `assets/css` hoặc `assets/js`: tăng số `?v=` trong 4 file `index.html`
   (vd `?v=3` → `?v=4`) để trình duyệt tải bản mới thay vì dùng bản cache cũ.
5. Commit và push — GitHub Pages tự cập nhật sau 1–2 phút.

## Chạy thử local

```bash
python -m http.server 8000
# mở http://localhost:8000
```

Kiểm tra link: `python scripts/check_links.py`

Logo trường: [Wikimedia Commons — HCMUT official logo](https://commons.wikimedia.org/wiki/File:HCMUT_official_logo.png).
