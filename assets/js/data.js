/*
 * Nguồn dữ liệu duy nhất của website — chỉ cần sửa file này để cập nhật mọi trang.
 * - Link chưa có thì để null → trang tự hiển thị "Coming soon".
 * - links.notebook: đường dẫn trong repo (vd "notebooks/tabular.ipynb");
 *   link GitHub và Open in Colab được tạo tự động từ đường dẫn này.
 * - links.report: đường dẫn trong repo (vd "reports/tabular-report.pdf") hoặc URL đầy đủ.
 * - links.video: URL YouTube (Public hoặc Unlisted).
 */
window.SITE_DATA = {
  course: {
    university: "Ho Chi Minh City University of Technology (HCMUT) – VNU-HCM",
    faculty: "Faculty of Computer Science and Engineering",
    name: "Programming Foundations for Data Analysis and Visualization",
    code: "CO5177",
    semester: "Semester 261, Academic Year 2026–2027",
    lecturer: "Lê Thành Sách"
  },

  group: {
    name: "DataInsight",
    tagline: "From raw data to verified insight — tabular, text and time series.",
    githubUser: "trthminh",
    repoName: "CO5177",
    branch: "main"
  },

  members: [
    {
      name: "Trương Thanh Minh",
      studentId: "2580893",
      github: "https://github.com/trthminh",
      role: "Lead, Time series project"
    },
    {
      name: "Tô Anh Phát",
      studentId: "2580894",
      github: null,
      role: "Lead, Text project"
    },
    {
      name: "Trần Lê Hoàng Long",
      studentId: "2570443",
      github: null,
      role: "Lead, Tabular project"
    }
  ],

  projects: [
    {
      id: "text",
      type: "Text",
      title: "Text Data Analysis",
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
      type: "Tabular",
      title: "Tabular Data Analysis",
      summary: null,
      problem: null,
      dataset: null, // { name, url, samples, features, description }
      owner: "Trần Lê Hoàng Long",
      status: "planned", // planned | in-progress | done
      links: { notebook: null, report: null, video: null },
      results: [] // [{ model: "...", metric: "F1-macro", value: "0.87" }]
    },
    {
      id: "timeseries",
      type: "Time series",
      title: "Time Series Analysis and Forecasting",
      summary: "Forecasting hourly traffic volume on Interstate 94 (Minneapolis – St Paul, USA) from history, weather and holidays.",
      problem: "Time series regression: forecast traffic_volume one hour ahead. Data is split into train/validation/test chronologically (no shuffling); Scikit-learn models using lag features, rolling means, hour/weekday/holiday flags and the previous hour's weather are compared with naive baselines and a SARIMAX model with weekly Fourier terms, using MAE, RMSE and MAPE.",
      dataset: {
        name: "Metro Interstate Traffic Volume",
        url: "https://www.kaggle.com/datasets/pooriamst/metro-interstate-traffic-volume",
        samples: "48,204 hourly records (Oct 2012 – Sep 2018)",
        features: "9 columns: date_time, traffic_volume (target), holiday, temp, rain_1h, snow_1h, clouds_all, weather_main, weather_description",
        description: "Westbound I-94 traffic volume from MnDOT ATR station 301, with hourly weather and holiday information (CC BY 4.0, originally from the UCI Machine Learning Repository). The data contains duplicated and missing hours, which makes it suitable for practising reindexing, interpolation, outlier detection and categorical encoding."
      },
      owner: "Trương Thanh Minh",
      status: "in-progress",
      links: { notebook: "notebooks/timeseries.ipynb", report: null, video: null },
      results: [
        { model: "HistGradientBoosting (tuned), final", metric: "Test MAE (vehicles/hour)", value: "131.5" },
        { model: "HistGradientBoosting (tuned), final", metric: "Test skill vs naive (MAE)", value: "+77.4%" },
        { model: "Seasonal naive (same hour last week)", metric: "Test MAE (vehicles/hour)", value: "257.2" },
        { model: "SARIMAX(3,0,0) + weekly Fourier K=63", metric: "Validation MAE (vehicles/hour)", value: "199.1" }
      ]
    }
  ]
};
