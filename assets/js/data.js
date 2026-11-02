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
      summary: "Predicting hotel booking cancellations from the information available when a booking is made.",
      problem: "Binary classification: predict is_canceled for bookings of a resort hotel and a city hotel in Portugal. Columns recorded after the booking (reservation status, assigned room, booking changes) are excluded to avoid leakage, duplicate rows are removed before a stratified 70/15/15 split, and all preprocessing is fitted on the training set inside a Pipeline. Scikit-learn models are compared with a majority-class baseline using PR-AUC and F1 of the cancelled class; class weights, SMOTE and a tuned decision threshold are compared for the class imbalance.",
      dataset: {
        name: "Hotel Booking Demand",
        url: "https://github.com/rfordatascience/tidytuesday/tree/master/data/2020/2020-02-11",
        samples: "119,390 bookings (85,175 after removing duplicates and invalid rows)",
        features: "32 columns: lead time, stay length, guests, meal, country, market segment, distribution channel, deposit type, agent, company, average daily rate, special requests, is_canceled (target), ...",
        description: "Bookings from the property management systems of a resort hotel (Algarve) and a city hotel (Lisbon) with arrivals between July 2015 and August 2017 (António, Almeida & Nunes, Data in Brief, 2019, CC BY 4.0; TidyTuesday 2020-02-11 version). It contains missing values in agent, company and country, about 32,000 exact duplicate rows and long-tailed numeric columns, and 37% of the bookings are cancelled."
      },
      // Optional: project-specific steps shown under "Workflow" (other projects use the generic four steps)
      workflow: [
        { title: "Data loading and checks",
          detail: "Downloaded hotels.csv (119,390 bookings, 32 columns) and removed 5 columns that are only known after booking." },
        { title: "Data quality",
          detail: "Kept missing agent / company / country as a separate category; removed 34,050 duplicate rows and 165 invalid rows, leaving 85,175 bookings (27.7% cancelled)." },
        { title: "Exploratory analysis",
          detail: "Three questions on lead time, Non Refund deposits and special requests, each compared on all rows and on de-duplicated rows." },
        { title: "Preprocessing",
          detail: "Stratified 70/15/15 split; Pipeline + ColumnTransformer fitted on train only; compared 4 missing-value and 3 outlier strategies (chose missing-as-category and log1p)." },
        { title: "Modeling",
          detail: "7 models against a baseline, a leakage experiment, class weights vs SMOTE vs tuned threshold, and RandomizedSearchCV on HistGradientBoosting." },
        { title: "Evaluation",
          detail: "Final model (tuned HistGradientBoosting, threshold 0.364) tested once: PR-AUC 0.775, F1 0.707, recall 0.775; permutation importance and error analysis." }
      ],
      owner: "Trần Lê Hoàng Long",
      status: "in-progress", // planned | in-progress | done
      links: { notebook: "notebooks/tabular.ipynb", report: "reports/tabular-report.pdf", video: null },
      results: [
        { model: "Baseline (majority class)", metric: "PR-AUC (test)", value: "0.277" },
        { model: "HistGradientBoosting, tuned, threshold 0.364", metric: "PR-AUC (test)", value: "0.775" },
        { model: "HistGradientBoosting, tuned, threshold 0.364", metric: "F1, cancelled class (test)", value: "0.707" },
        { model: "HistGradientBoosting, tuned, threshold 0.364", metric: "Recall, cancelled class (test)", value: "0.775" },
        { model: "HistGradientBoosting, tuned, threshold 0.364", metric: "ROC-AUC (test)", value: "0.900" }
      ]
    },
    {
      id: "timeseries",
      type: "Time series",
      title: "Time Series Analysis and Forecasting",
      summary: "Forecasting hourly traffic volume on Interstate 94 (Minneapolis – St Paul, USA) from history, weather and holidays.",
      problem: "Time series regression: forecast traffic_volume for the coming hours. Data is split into train/validation/test chronologically (no shuffling); Scikit-learn models using lag features, rolling means, hour/day-of-week and weather variables are compared against a naive baseline with MAE, RMSE and MAPE.",
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
      results: []
    }
  ]
};
