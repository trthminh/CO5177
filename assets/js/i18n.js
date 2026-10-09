/* Chuỗi giao diện cố định (song ngữ). Nội dung riêng của nhóm/bài nằm trong data.js. */
window.I18N_STRINGS = {
  navCourse: { vi: "Môn học", en: "Course" },
  navGroup: { vi: "Nhóm", en: "Team" },
  navProjects: { vi: "Bài tập lớn", en: "Projects" },
  switchLang: { vi: "Switch to English", en: "Chuyển sang Tiếng Việt" },

  heroEyebrow: { vi: "Bài tập lớn môn học", en: "Course Project" },
  heroCtaProjects: { vi: "Xem các bài tập", en: "View projects" },
  heroCtaRepo: { vi: "Kho mã nguồn", en: "Source repository" },
  heroRotatePrefix: { vi: "Khám phá", en: "Exploring" },
  heroRotate: {
    vi: ["dữ liệu dạng bảng", "dữ liệu văn bản", "chuỗi thời gian"],
    en: ["tabular data", "text data", "time series"]
  },
  statMembers: { vi: "Thành viên", en: "Members" },
  statProjects: { vi: "Bài tập lớn con", en: "Sub-projects" },
  statMaterials: { vi: "Notebook · PDF · video đã sẵn sàng", en: "Notebooks · PDFs · videos ready" },
  progress: { vi: "Mức hoàn thiện", en: "Completion" },
  backToTop: { vi: "Lên đầu trang", en: "Back to top" },

  courseTitle: { vi: "Thông tin môn học", en: "Course information" },
  university: { vi: "Trường", en: "University" },
  faculty: { vi: "Khoa", en: "Faculty" },
  courseName: { vi: "Tên học phần", en: "Course" },
  courseCode: { vi: "Mã học phần", en: "Course code" },
  semester: { vi: "Học kỳ", en: "Semester" },
  lecturer: { vi: "Giảng viên", en: "Lecturer" },

  groupTitle: { vi: "Thông tin nhóm", en: "Team information" },
  groupName: { vi: "Tên nhóm", en: "Team name" },
  memberName: { vi: "Họ tên", en: "Full name" },
  studentId: { vi: "MSSV", en: "Student ID" },
  role: { vi: "Vai trò / đóng góp chính", en: "Role / main contribution" },
  github: { vi: "GitHub", en: "GitHub" },
  repo: { vi: "Kho mã nguồn của nhóm", en: "Team repository" },

  projectsTitle: { vi: "Mục lục bài tập lớn", en: "Projects" },
  projectsLead: {
    vi: "Mỗi loại dữ liệu là một bài tập lớn con với trang riêng, gồm notebook, báo cáo PDF và video trình bày.",
    en: "Each data type is a separate sub-project with its own page, notebook, PDF report and video presentation."
  },
  viewDetails: { vi: "Xem chi tiết", en: "View details" },
  owner: { vi: "Phụ trách", en: "Lead" },

  statusPlanned: { vi: "Đang lên kế hoạch", en: "Planned" },
  "statusIn-progress": { vi: "Đang thực hiện", en: "In progress" },
  statusDone: { vi: "Hoàn thành", en: "Completed" },
  comingSoon: { vi: "Sắp cập nhật", en: "Coming soon" },

  linkNotebook: { vi: "Notebook (GitHub)", en: "Notebook (GitHub)" },
  linkColab: { vi: "Mở trên Colab", en: "Open in Colab" },
  linkReport: { vi: "Báo cáo PDF", en: "PDF report" },
  linkVideo: { vi: "Video YouTube", en: "YouTube video" },

  home: { vi: "Trang chủ", en: "Home" },
  dataType: { vi: "Loại dữ liệu", en: "Data type" },
  secTeam: { vi: "Nhóm thực hiện", en: "Team" },
  secProblem: { vi: "Mô tả bài toán", en: "Problem statement" },
  secDataset: { vi: "Tập dữ liệu", en: "Dataset" },
  secPipeline: { vi: "Quy trình thực hiện", en: "Workflow" },
  secResults: { vi: "Kết quả chính", en: "Key results" },
  secResultsNote: {
    vi: "Số liệu trùng khớp với bảng metric trong báo cáo PDF.",
    en: "Figures match the metric table in the PDF report."
  },
  secMaterials: { vi: "Tài liệu", en: "Materials" },
  secVideo: { vi: "Video trình bày", en: "Video presentation" },
  dsName: { vi: "Tên", en: "Name" },
  dsSource: { vi: "Nguồn", en: "Source" },
  dsSamples: { vi: "Số mẫu", en: "Samples" },
  dsFeatures: { vi: "Số cột / đặc trưng", en: "Columns / features" },
  colModel: { vi: "Mô hình", en: "Model" },
  colMetric: { vi: "Chỉ số", en: "Metric" },
  colValue: { vi: "Giá trị", en: "Value" },
  prevProject: { vi: "Bài trước", en: "Previous" },
  nextProject: { vi: "Bài tiếp theo", en: "Next" },
  backHome: { vi: "Về trang chủ", en: "Back to home" },

  step1: { vi: "Mô tả tập dữ liệu", en: "Dataset description" },
  step1d: {
    vi: "Tổng quan dữ liệu bằng Markdown và trực quan hóa với Matplotlib / Seaborn / Plotly.",
    en: "Dataset overview in Markdown, visualized with Matplotlib / Seaborn / Plotly."
  },
  step2: { vi: "Chuẩn bị dữ liệu", en: "Data preparation" },
  step2d: {
    vi: "Tiền xử lý bằng NumPy / Pandas: xử lý giá trị thiếu, ngoại lai, encoding, scaling; chia train / validation / test.",
    en: "Preprocessing with NumPy / Pandas: missing values, outliers, encoding, scaling; train / validation / test split."
  },
  step3: { vi: "Phân tích và mô hình hóa", en: "Analysis and modeling" },
  step3d: {
    vi: "Huấn luyện mô hình với Scikit-learn và so sánh giữa các mô hình hoặc bộ tham số.",
    en: "Train models with Scikit-learn and compare models or hyperparameter settings."
  },
  step4: { vi: "Tổng kết và mở rộng", en: "Conclusions and extensions" },
  step4d: {
    vi: "Đánh giá bằng metric, biểu đồ, confusion matrix; nêu nhận xét, hạn chế và hướng mở rộng.",
    en: "Evaluate with metrics, charts and confusion matrices; discuss findings, limitations and extensions."
  },

  lastUpdated: { vi: "Cập nhật lần cuối", en: "Last updated" },
  footerNote: {
    vi: "Bài tập lớn môn học — chỉ phục vụ mục đích học tập.",
    en: "Course project — for educational purposes only."
  }
};
