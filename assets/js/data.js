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
        vi: "Phụ trách bài Text",
        en: "Lead, Text project"
      }
    },
    {
      name: "Tô Anh Phát",
      studentId: "2580894",
      github: null,
      role: {
        vi: "Phụ trách bài Tabular",
        en: "Lead, Tabular project"
      }
    },
    {
      name: "Trần Lê Hoàng Long",
      studentId: "2570443",
      github: null,
      role: {
        vi: "Phụ trách bài Time series",
        en: "Lead, Time series project"
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
      owner: "Trương Thanh Minh",
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
      owner: "Tô Anh Phát",
      status: "planned", // planned | in-progress | done
      links: { notebook: null, report: null, video: null },
      results: [] // [{ model: "...", metric: "F1-macro", value: "0.87" }]
    },
    {
      id: "timeseries",
      type: { vi: "Chuỗi thời gian", en: "Time series" },
      title: { vi: "Phân tích và dự báo chuỗi thời gian", en: "Time Series Analysis and Forecasting" },
      summary: null,
      problem: null,
      dataset: null,
      owner: "Trần Lê Hoàng Long",
      status: "planned",
      links: { notebook: null, report: null, video: null },
      results: []
    }
  ]
};
