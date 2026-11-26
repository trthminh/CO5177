# DataInsight · CO5177

Bài tập lớn môn **Nền tảng lập trình cho phân tích và trực quan dữ liệu**: phân tích, trực quan hóa và xây dựng mô hình học máy trên ba loại
dữ liệu: văn bản (Text), dữ liệu bảng (Tabular) và chuỗi thời gian (Time series).

- **Landing page:** https://trthminh.github.io/CO5177/
- **Repository:** https://github.com/trthminh/CO5177

## 1. Môn học

| | |
|---|---|
| Trường | Đại học Bách Khoa – ĐHQG-HCM |
| Khoa | Khoa Khoa học và Kỹ thuật Máy tính |
| Học phần | Nền tảng lập trình cho phân tích và trực quan dữ liệu (CO5177) |
| Học kỳ | 261, năm học 2026–2027 |
| Giảng viên | Lê Thành Sách |

## 2. Nhóm DataInsight

| Chương | Họ tên | MSSV | Phụ trách |
|---|---|---|---|
| 1 | Tô Anh Phát ([GitHub](https://github.com/pattan99)) | 2580894 | Text: notebook, report, trang con |
| 2 | Trần Lê Hoàng Long ([GitHub](https://github.com/m00nLeo)) | 2570443 | Tabular: notebook, report, trang con |
| 3 | Trương Thanh Minh ([GitHub](https://github.com/trthminh)) | 2580893 | Time series: notebook, report, trang con |

Thứ tự chương giống với báo cáo tổng hợp (`latex/main.tex`) và landing page.

## 3. Các bài tập lớn con

| | Text | Tabular | Time series |
|---|---|---|---|
| **Bài toán** | Phát hiện review spam tiếng Việt: spam hay không (task 1) và loại spam (task 2) | Dự đoán đặt phòng khách sạn bị hủy | Dự báo số xe của giờ kế tiếp trên cao tốc I-94 |
| **Loại bài toán** | Phân loại văn bản | Phân loại nhị phân, mất cân bằng lớp | Hồi quy, dự báo một bước có biến ngoại sinh |
| **Dữ liệu** | [UIT-ViSpamReviews](https://github.com/sonlam1102/vispamdetection), 19 870 review | [Hotel Booking Demand](https://github.com/rfordatascience/tidytuesday/tree/master/data/2020/2020-02-11), 119 390 booking | [Metro Interstate Traffic Volume](https://www.kaggle.com/datasets/pooriamst/metro-interstate-traffic-volume), 48 204 giờ |
| **Chia tập** | Theo split gốc của tác giả | Ngẫu nhiên phân tầng 70/15/15 | Theo thời gian 70/15/15 |
| **Metric chính** | Macro F1 | PR-AUC, F1 lớp hủy | MAE (xe/giờ) |
| **Mô hình cuối** | Linear SVM trên TF-IDF từ và ký tự, 10 tín hiệu tự thiết kế và số sao | HistGradientBoosting (tuned), ngưỡng 0.364 | HistGradientBoosting (tuned) |
| **Kết quả trên test** | Task 1: 85.4 (baseline 41.9); task 2: 76.3 | PR-AUC 0.775 (baseline 0.277), F1 0.707 | MAE 130.8, thấp hơn baseline cùng giờ tuần trước 49% |
| **Trang con** | [text/](https://trthminh.github.io/CO5177/text/) | [tabular/](https://trthminh.github.io/CO5177/tabular/) | [timeseries/](https://trthminh.github.io/CO5177/timeseries/) |
| **Notebook** | [GitHub](notebooks/text.ipynb) · [Colab](https://colab.research.google.com/github/trthminh/CO5177/blob/main/notebooks/text.ipynb) | [GitHub](notebooks/tabular.ipynb) · [Colab](https://colab.research.google.com/github/trthminh/CO5177/blob/main/notebooks/tabular.ipynb) | [GitHub](notebooks/timeseries.ipynb) · [Colab](https://colab.research.google.com/github/trthminh/CO5177/blob/main/notebooks/timeseries.ipynb) |
| **Report** | [text-report.pdf](reports/text-report.pdf) | [tabular-report.pdf](reports/tabular-report.pdf) | [timeseries-report.pdf](reports/timeseries-report.pdf) |

Cả ba notebook theo các bước của đề: mô tả dữ liệu, tiền xử lý (missing values, outlier, encoding, scaling), chia train/validation/test,
huấn luyện và so sánh mô hình với baseline, rồi đánh giá và nêu hạn chế.

## 4. Hệ thống

Repo gồm ba phần, dùng chung một nguồn số liệu là lần chạy cuối của notebook:

```
notebooks/*.ipynb ──(output, hình Plotly)──► latex/ ──(XeLaTeX)──► reports/*.pdf
        │                                                              │
        └──────────── link, kết quả ──► assets/js/data.js ◄────────────┘
                                              │
                                              ▼
                     index.html + text/ tabular/ timeseries/  (GitHub Pages)
```

- **Notebook** (`notebooks/`): mỗi loại dữ liệu một file, chạy bằng Run all trên Google Colab. Quy ước chung là notebook tự cài thư viện
  còn thiếu, tự tải dữ liệu từ nguồn gốc và cố định seed để chạy lại ra cùng kết quả.
- **Báo cáo** (`latex/`): mỗi thành viên viết một chương. `standalone/` biên dịch PDF riêng của từng bài, `main.tex` biên dịch báo cáo
  tổng hợp. Hình được xuất từ output đã lưu của notebook.
- **Website** (`index.html`, `text/`, `tabular/`, `timeseries/`, `assets/`): trang tĩnh trên GitHub Pages. Mọi thông tin của môn học,
  nhóm, bài con và link nằm trong `assets/js/data.js`, và `assets/js/render.js` dựng trang từ file này.

## 5. Cấu trúc thư mục

```
CO5177/
├── index.html                 Landing page
├── text/ tabular/ timeseries/ Trang của từng bài con (dùng chung template)
├── assets/
│   ├── js/data.js             Thông tin môn học, nhóm, bài con, link (chỉ cần sửa file này)
│   ├── js/render.js           Dựng trang từ data.js
│   ├── js/effects.js          Hiệu ứng khi cuộn, số đếm, nền hero
│   ├── css/                   Giao diện và hiệu ứng (tự tắt khi bật "giảm chuyển động")
│   └── img/                   Logo trường
├── notebooks/
│   ├── text.ipynb  tabular.ipynb  timeseries.ipynb
│   ├── templates/             Template và quy chuẩn chung cho notebook
│   └── data/                  Dữ liệu tải về khi chạy local (không commit)
├── latex/
│   ├── main.tex               Báo cáo tổng hợp (nộp LMS)
│   ├── preamble.tex cover.tex Package, thông tin nhóm, trang bìa
│   ├── chapters/              text.tex, tabular.tex, timeseries.tex
│   ├── standalone/            Báo cáo riêng của từng bài
│   └── figures/               Hình xuất từ notebook, theo từng bài
├── reports/                   PDF report của từng bài
├── scripts/check_links.py     Kiểm tra mọi link trước khi nộp
├── CROSS_CHECK.md             Tiêu chí kiểm tra chéo giữa các thành viên
└── requirements.txt           Thư viện khi chạy notebook trên máy cá nhân
```

