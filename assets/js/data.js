/*
 * Nguồn dữ liệu duy nhất của website — chỉ cần sửa file này để cập nhật mọi trang.
 * - Chuỗi song ngữ dùng dạng { vi: "...", en: "..." }.
 * - Link chưa có thì để null → trang tự hiển thị "Sắp cập nhật / Coming soon".
 * - links.notebook: đường dẫn trong repo (vd "notebooks/tabular.ipynb");
 *   link GitHub và Open in Colab được tạo tự động từ đường dẫn này.
 * - links.report: đường dẫn trong repo (vd "reports/tabular-report.pdf") hoặc URL đầy đủ.
 * - links.video: URL YouTube (Public hoặc Unlisted).
 */
window.SITE_DATA = {
  course: {
    university: {
      vi: "Trường Đại học Bách Khoa – ĐHQG-HCM",
      en: "Ho Chi Minh City University of Technology (HCMUT) – VNU-HCM"
    },
    faculty: {
      vi: "Khoa Khoa học và Kỹ thuật Máy tính",
      en: "Faculty of Computer Science and Engineering"
    },
    name: {
      vi: "Nền tảng lập trình cho phân tích và trực quan dữ liệu",
      en: "Programming Foundations for Data Analysis and Visualization"
    },
    code: "CO5177",
    semester: {
      vi: "Học kỳ 261, năm học 2026–2027",
      en: "Semester 261, Academic Year 2026–2027"
    },
    lecturer: "Lê Thành Sách"
  },

  group: {
    name: "DataInsight",
    tagline: {
      vi: "Từ dữ liệu thô đến hiểu biết có kiểm chứng — dạng bảng, văn bản và chuỗi thời gian.",
      en: "From raw data to verified insight — tabular, text and time series."
    },
    githubUser: "trthminh",
    repoName: "CO5177",
    branch: "main"
  },

  members: [
    {
      name: "Trương Thanh Minh",
      studentId: "2580893",
      github: "https://github.com/trthminh",
      role: {
        vi: "Phụ trách bài Time series",
        en: "Lead, Time series project"
      }
    },
    {
      name: "Tô Anh Phát",
      studentId: "2580894",
      github: null,
      role: {
        vi: "Phụ trách bài Text",
        en: "Lead, Text project"
      }
    },
    {
      name: "Trần Lê Hoàng Long",
      studentId: "2570443",
      github: null,
      role: {
        vi: "Phụ trách bài Tabular",
        en: "Lead, Tabular project"
      }
    }
  ],

  projects: [
    {
      id: "text",
      type: { vi: "Dữ liệu văn bản", en: "Text" },
      title: { vi: "Phân tích dữ liệu văn bản", en: "Text Data Analysis" },
      summary: null,
      problem: null,
      dataset: null,
      owner: "Tô Anh Phát",
      status: "planned",
      links: { notebook: null, report: null, video: null },
      results: []
    },
    {
      id: "tabular",
      type: { vi: "Dữ liệu bảng", en: "Tabular" },
      title: { vi: "Phân tích dữ liệu dạng bảng", en: "Tabular Data Analysis" },
      summary: null,
      problem: null,
      dataset: null, // { name, url, samples, features, description: { vi, en } }
      owner: "Trần Lê Hoàng Long",
      status: "planned", // planned | in-progress | done
      links: { notebook: null, report: null, video: null },
      results: [] // [{ model: "...", metric: "F1-macro", value: "0.87" }]
    },
    {
      id: "timeseries",
      type: { vi: "Chuỗi thời gian", en: "Time series" },
      title: { vi: "Phân tích và dự báo chuỗi thời gian", en: "Time Series Analysis and Forecasting" },
      summary: {
        vi: "Dự báo lưu lượng xe theo giờ trên cao tốc I-94 (Minneapolis – St Paul, Mỹ) từ dữ liệu lịch sử, thời tiết và ngày lễ.",
        en: "Forecasting hourly traffic volume on Interstate 94 (Minneapolis – St Paul, USA) from history, weather and holidays."
      },
      problem: {
        vi: "Bài toán hồi quy chuỗi thời gian: dự báo traffic_volume của các giờ tiếp theo. Dữ liệu được chia train/validation/test theo thời gian (không xáo trộn); các mô hình Scikit-learn dùng lag features, rolling mean, giờ/thứ trong tuần và biến thời tiết, được so sánh với baseline naive bằng MAE, RMSE và MAPE.",
        en: "Time series regression: forecast traffic_volume for the coming hours. Data is split into train/validation/test chronologically (no shuffling); Scikit-learn models using lag features, rolling means, hour/day-of-week and weather variables are compared against a naive baseline with MAE, RMSE and MAPE."
      },
      dataset: {
        name: "Metro Interstate Traffic Volume",
        url: "https://www.kaggle.com/datasets/pooriamst/metro-interstate-traffic-volume",
        samples: "48.204 bản ghi theo giờ (10/2012 – 09/2018)",
        features: "9 cột: date_time, traffic_volume (mục tiêu), holiday, temp, rain_1h, snow_1h, clouds_all, weather_main, weather_description",
        description: {
          vi: "Lưu lượng xe đi hướng tây trên I-94, đo tại trạm ATR 301 của Sở Giao thông Minnesota, kèm thời tiết và ngày lễ theo từng giờ (giấy phép CC BY 4.0, bản gốc trên UCI Machine Learning Repository). Dữ liệu có mốc giờ bị trùng và bị thiếu, phù hợp để thực hành reindex, nội suy, phát hiện ngoại lai và mã hóa biến phân loại.",
          en: "Westbound I-94 traffic volume from MnDOT ATR station 301, with hourly weather and holiday information (CC BY 4.0, originally from the UCI Machine Learning Repository). The data contains duplicated and missing hours, which makes it suitable for practising reindexing, interpolation, outlier detection and categorical encoding."
        }
      },
      owner: "Trương Thanh Minh",
      status: "in-progress",
      links: { notebook: "notebooks/timeseries.ipynb", report: null, video: null },
      results: []
    }
  ]
};
