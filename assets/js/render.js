/* Render landing page và trang bài con từ SITE_DATA + I18N_STRINGS. */
(function () {
  "use strict";

  var D = window.SITE_DATA;
  var S = window.I18N_STRINGS;
  var body = document.body;
  var ROOT = body.getAttribute("data-root") || "";
  var PAGE = body.getAttribute("data-page") || "home";
  var PROJECT_ID = body.getAttribute("data-project");
  var LANGS = ["vi", "en"];
  var lang = detectLang();

  /* ---------- Ngôn ngữ ---------- */
  function detectLang() {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (LANGS.indexOf(fromUrl) !== -1) {
      saveLang(fromUrl);
      return fromUrl;
    }
    try {
      var saved = window.localStorage.getItem("lang");
      if (LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) { /* localStorage bị chặn */ }
    return "en";
  }

  function saveLang(l) {
    try { window.localStorage.setItem("lang", l); } catch (e) { /* bỏ qua */ }
  }

  // Lấy giá trị theo ngôn ngữ hiện tại, thiếu bản dịch thì rơi về tiếng Việt.
  function tr(value) {
    if (value == null) return "";
    if (typeof value !== "object") return String(value);
    return value[lang] || value.vi || "";
  }

  function s(key) {
    return S[key] ? tr(S[key]) : key;
  }

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------- Link ---------- */
  var repoUrl = "https://github.com/" + D.group.githubUser + "/" + D.group.repoName;

  function isAbsolute(url) {
    return /^https?:\/\//i.test(url);
  }

  function notebookUrl(path) {
    if (!path) return null;
    return isAbsolute(path) ? path : repoUrl + "/blob/" + D.group.branch + "/" + path;
  }

  function colabUrl(path) {
    if (!path || isAbsolute(path)) return null;
    return "https://colab.research.google.com/github/" + D.group.githubUser + "/" +
      D.group.repoName + "/blob/" + D.group.branch + "/" + path;
  }

  function reportUrl(path) {
    if (!path) return null;
    return isAbsolute(path) ? path : ROOT + path;
  }

  function youtubeId(url) {
    if (!url) return null;
    var m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function projectLinks(p) {
    return [
      { key: "linkNotebook", icon: "code", url: notebookUrl(p.links.notebook) },
      { key: "linkColab", icon: "play", url: colabUrl(p.links.notebook) },
      { key: "linkReport", icon: "file", url: reportUrl(p.links.report) },
      { key: "linkVideo", icon: "video", url: p.links.video }
    ];
  }

  /* ---------- Icon (SVG nội tuyến) ---------- */
  var ICONS = {
    code: '<path d="M8 6 2 12l6 6M16 6l6 6-6 6"/>',
    play: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    video: '<rect x="2" y="5" width="15" height="14" rx="2"/><path d="m17 10 5-3v10l-5-3"/>',
    github: '<path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
    text: '<path d="M4 6h16M4 10h16M4 14h10M4 18h7"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/>'
  };
  var TYPE_ICON = { tabular: "table", text: "text", timeseries: "chart" };

  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONS[name] + "</svg>";
  }

  // Nút link; chưa có URL thì hiện nút vô hiệu hóa kèm "Sắp cập nhật" (không tạo link giả).
  function linkButton(l, compact) {
    var label = s(l.key);
    if (!l.url) {
      return '<span class="btn btn-disabled" aria-disabled="true" title="' + esc(s("comingSoon")) + '">' +
        icon(l.icon) + "<span>" + esc(label) + "</span>" +
        (compact ? "" : '<span class="soon">' + esc(s("comingSoon")) + "</span>") + "</span>";
    }
    return '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
      icon(l.icon) + "<span>" + esc(label) + "</span></a>";
  }

  function statusBadge(status) {
    var key = "status" + status.charAt(0).toUpperCase() + status.slice(1);
    return '<span class="status status-' + esc(status) + '">' + esc(s(key)) + "</span>";
  }

  function comingSoon() {
    return '<p class="muted placeholder">' + esc(s("comingSoon")) + "</p>";
  }

  // Mức hoàn thiện của bài con: số mục đã có trên 5 mục chính.
  function progressOf(p) {
    var items = [p.problem, p.dataset, p.links.notebook, p.links.report, p.links.video];
    var filled = items.filter(function (x) { return x != null && x !== ""; }).length;
    return Math.round((filled / items.length) * 100);
  }

  function progressRing(pct) {
    return '<div class="ring-wrap" title="' + esc(s("progress")) + '">' +
      '<svg class="ring" viewBox="0 0 44 44" aria-hidden="true">' +
        '<circle class="ring-bg" cx="22" cy="22" r="18"/>' +
        '<circle class="ring-fg" cx="22" cy="22" r="18" style="--p:' + pct + '"/>' +
      "</svg>" +
      '<span class="ring-label" data-count="' + pct + '" data-suffix="%">0%</span>' +
    "</div>";
  }

  // Bọc từng từ để tạo hiệu ứng hiện lần lượt.
  function splitWords(text) {
    return esc(text).split(" ").map(function (w, i) {
      return '<span class="word" style="--i:' + i + '">' + w + "</span>";
    }).join(" ");
  }

  // Hiệu ứng hiện dần khi cuộn tới; d = độ trễ (ms) để tạo nhịp lần lượt.
  function reveal(d, extra) {
    return ' class="reveal' + (extra ? " " + extra : "") + '" style="--d:' + (d || 0) + 'ms"';
  }

  /* ---------- Khung chung ---------- */
  function renderHeader() {
    var home = PAGE === "home" ? "" : ROOT + "index.html";
    var other = lang === "vi" ? "EN" : "VI";
    return (
      '<div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>' +
      '<div class="container header-inner">' +
        '<a class="brand" href="' + (home || "#top") + '">' +
          '<img src="' + ROOT + 'assets/img/hcmut-logo.png" alt="HCMUT" width="36" height="36">' +
          '<span class="brand-text"><strong>' + esc(D.group.name) + "</strong>" +
          '<small>' + esc(D.course.code) + "</small></span>" +
        "</a>" +
        '<nav class="nav" aria-label="Main">' +
          '<a href="' + home + '#course">' + esc(s("navCourse")) + "</a>" +
          '<a href="' + home + '#team">' + esc(s("navGroup")) + "</a>" +
          '<a href="' + home + '#projects">' + esc(s("navProjects")) + "</a>" +
        "</nav>" +
        '<button class="lang-toggle" type="button" id="lang-toggle" aria-label="' + esc(s("switchLang")) +
          '" title="' + esc(s("switchLang")) + '">' + icon("globe") + "<span>" + other + "</span></button>" +
      "</div>"
    );
  }

  function renderFooter() {
    return (
      '<div class="container footer-inner">' +
        "<p><strong>" + esc(D.group.name) + "</strong> · " + esc(tr(D.course.name)) + " (" + esc(D.course.code) + ")</p>" +
        "<p>" + esc(tr(D.course.university)) + " · " + esc(tr(D.course.semester)) + "</p>" +
        '<p class="muted">' + esc(s("footerNote")) + " " + esc(s("lastUpdated")) + ": " + esc(D.lastUpdated) + "</p>" +
      "</div>"
    );
  }

  /* ---------- Landing page ---------- */
  function renderHome() {
    var c = D.course;
    var courseRows = [
      ["university", tr(c.university)],
      ["faculty", tr(c.faculty)],
      ["courseName", tr(c.name)],
      ["courseCode", c.code],
      ["semester", tr(c.semester)],
      ["lecturer", c.lecturer]
    ].map(function (r, i) {
      return "<div" + reveal(i * 70, "info-row") + "><dt>" + esc(s(r[0])) + "</dt><dd>" + esc(r[1]) + "</dd></div>";
    }).join("");

    var memberRows = D.members.map(function (m, i) {
      var gh = m.github
        ? '<a href="' + esc(m.github) + '" target="_blank" rel="noopener" class="gh-link">' + icon("github") +
          "<span>" + esc(m.github.replace(/^https?:\/\/github\.com\//, "")) + "</span></a>"
        : '<span class="muted">—</span>';
      var initials = m.name.split(" ").slice(-1)[0].charAt(0);
      // Màu avatar theo bài mà thành viên phụ trách (không phụ thuộc thứ tự trong danh sách).
      var owned = D.projects.filter(function (p) { return p.owner === m.name; })[0];
      return "<tr" + reveal(i * 120, "row-reveal") + ">" +
        '<td data-label="' + esc(s("memberName")) + '"><span class="member-cell"><span class="avatar' +
          (owned ? " avatar-" + esc(owned.id) : "") + '">' +
          esc(initials) + "</span><strong>" + esc(m.name) + "</strong></span></td>" +
        '<td data-label="' + esc(s("studentId")) + '">' + esc(m.studentId) + "</td>" +
        '<td data-label="' + esc(s("role")) + '">' + esc(tr(m.role)) + "</td>" +
        '<td data-label="' + esc(s("github")) + '">' + gh + "</td>" +
        "</tr>";
    }).join("");

    var cards = D.projects.map(function (p, i) {
      var page = ROOT + p.id + "/";
      var quick = projectLinks(p).map(function (l) { return linkButton(l, true); }).join("");
      var ds = p.dataset ? esc(p.dataset.name) : esc(s("comingSoon"));
      return (
        "<article" + reveal(i * 140, "project-card tilt type-" + esc(p.id)) + ">" +
          '<span class="spotlight" aria-hidden="true"></span>' +
          '<div class="card-top">' +
            '<span class="type-badge">' + icon(TYPE_ICON[p.id] || "table") + esc(tr(p.type)) + "</span>" +
            statusBadge(p.status) +
          "</div>" +
          '<div class="card-head">' +
            '<p class="card-index">0' + (i + 1) + "</p>" +
            progressRing(progressOf(p)) +
          "</div>" +
          "<h3>" + esc(tr(p.title)) + "</h3>" +
          '<p class="card-summary">' + (p.summary ? esc(tr(p.summary)) : '<span class="muted">' + esc(s("comingSoon")) + "</span>") + "</p>" +
          '<dl class="card-meta">' +
            "<div><dt>" + esc(s("secDataset")) + "</dt><dd>" + ds + "</dd></div>" +
            "<div><dt>" + esc(s("owner")) + "</dt><dd>" + esc(p.owner) + "</dd></div>" +
          "</dl>" +
          '<div class="quick-links">' + quick + "</div>" +
          '<a class="btn btn-primary card-cta" href="' + page + '">' + esc(s("viewDetails")) + icon("arrow") + "</a>" +
        "</article>"
      );
    }).join("");

    // Số liệu cho dải thống kê
    var ready = 0, total = 0;
    D.projects.forEach(function (p) {
      ["notebook", "report", "video"].forEach(function (k) { total++; if (p.links[k]) ready++; });
    });
    var stats = [
      { value: D.members.length, key: "statMembers" },
      { value: D.projects.length, key: "statProjects" },
      { value: ready, suffix: "/" + total, key: "statMaterials" }
    ].map(function (st, i) {
      return "<div" + reveal(i * 120, "stat") + '><span class="stat-value" data-count="' + st.value + '" data-suffix="' +
        esc(st.suffix || "") + '">0' + esc(st.suffix || "") + '</span><span class="stat-label">' + esc(s(st.key)) + "</span></div>";
    }).join("");

    var rotate = S.heroRotate[lang] || S.heroRotate.vi;

    var hexes = [
      { x: 78, y: 18, s: 120, d: 0 }, { x: 88, y: 62, s: 70, d: 2 }, { x: 66, y: 72, s: 46, d: 4 },
      { x: 92, y: 8, s: 40, d: 1 }, { x: 58, y: 10, s: 30, d: 3 }, { x: 72, y: 44, s: 24, d: 5 }
    ].map(function (h, i) {
      return '<svg class="hex hex-' + i + '" viewBox="0 0 100 100" style="left:' + h.x + "%;top:" + h.y + "%;width:" + h.s +
        "px;--delay:-" + h.d + 's" aria-hidden="true"><polygon points="50,3 93,27 93,73 50,97 7,73 7,27"/></svg>';
    }).join("");

    function title(num, key) {
      return "<h2" + reveal(0, "section-title") + '><span class="kicker">' + num + "</span>" + esc(s(key)) + "</h2>";
    }

    return (
      '<section class="hero" id="top">' +
        '<canvas class="hero-canvas" aria-hidden="true"></canvas>' +
        '<div class="hero-hexes" aria-hidden="true">' + hexes + "</div>" +
        '<div class="hero-glow" aria-hidden="true"></div>' +
        '<div class="container hero-inner">' +
          '<p class="eyebrow fade-up" style="--d:0ms"><span class="pulse-dot"></span>' + esc(s("heroEyebrow")) + " · " + esc(c.code) + " · " + esc(tr(c.semester)) + "</p>" +
          '<h1 class="split">' + splitWords(tr(c.name)) + "</h1>" +
          '<p class="hero-rotate fade-up" style="--d:700ms">' + esc(s("heroRotatePrefix")) + ' <span class="typewriter" data-words="' +
            esc(JSON.stringify(rotate)) + '">' + esc(rotate[0]) + '</span><span class="caret" aria-hidden="true"></span></p>' +
          '<p class="hero-group fade-up" style="--d:850ms">' + esc(s("groupName")) + ': <strong class="shimmer-text">' + esc(D.group.name) + "</strong></p>" +
          '<p class="hero-lead fade-up" style="--d:1000ms">' + esc(tr(D.group.tagline)) + "</p>" +
          '<div class="hero-actions fade-up" style="--d:1150ms">' +
            '<a class="btn btn-primary shine" href="#projects">' + esc(s("heroCtaProjects")) + icon("arrow") + "</a>" +
            '<a class="btn btn-ghost" href="' + repoUrl + '" target="_blank" rel="noopener">' + icon("github") + esc(s("heroCtaRepo")) + "</a>" +
          "</div>" +
        "</div>" +
        '<a class="scroll-hint" href="#course" aria-label="' + esc(s("navCourse")) + '"><span></span></a>' +
      "</section>" +

      '<section class="stats-band"><div class="container stats">' + stats + "</div></section>" +

      '<section class="section" id="course">' +
        '<div class="container">' +
          title("01", "courseTitle") +
          '<dl class="info-grid">' + courseRows + "</dl>" +
        "</div>" +
      "</section>" +

      '<section class="section section-alt" id="team">' +
        '<div class="container">' +
          title("02", "groupTitle") +
          "<p" + reveal(80, "team-name") + ">" + esc(s("groupName")) + ": <strong>" + esc(D.group.name) + "</strong></p>" +
          '<div class="table-wrap"><table class="members">' +
            "<thead><tr><th>" + esc(s("memberName")) + "</th><th>" + esc(s("studentId")) + "</th><th>" +
              esc(s("role")) + "</th><th>" + esc(s("github")) + "</th></tr></thead>" +
            "<tbody>" + memberRows + "</tbody>" +
          "</table></div>" +
          "<p" + reveal(200, "repo-line") + ">" + esc(s("repo")) + ': <a href="' + repoUrl + '" target="_blank" rel="noopener">' +
            esc(repoUrl.replace(/^https:\/\//, "")) + "</a></p>" +
        "</div>" +
      "</section>" +

      '<section class="section" id="projects">' +
        '<div class="container">' +
          title("03", "projectsTitle") +
          "<p" + reveal(80, "section-lead") + ">" + esc(s("projectsLead")) + "</p>" +
          '<div class="project-grid">' + cards + "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* ---------- Trang bài con ---------- */
  function renderProject() {
    var idx = -1;
    D.projects.forEach(function (p, i) { if (p.id === PROJECT_ID) idx = i; });
    if (idx === -1) return '<div class="container section"><p>Project not found.</p></div>';
    var p = D.projects[idx];
    var prev = D.projects[idx - 1];
    var next = D.projects[idx + 1];

    var members = D.members.map(function (m) {
      return "<li><strong>" + esc(m.name) + "</strong> — " + esc(m.studentId) +
        (m.name === p.owner ? ' <span class="owner-tag">' + esc(s("owner")) + "</span>" : "") + "</li>";
    }).join("");

    var dataset = comingSoon();
    if (p.dataset) {
      var d = p.dataset;
      dataset =
        (d.description ? "<p>" + esc(tr(d.description)) + "</p>" : "") +
        '<dl class="info-grid compact">' +
          '<div class="info-row"><dt>' + esc(s("dsName")) + "</dt><dd>" + esc(d.name) + "</dd></div>" +
          '<div class="info-row"><dt>' + esc(s("dsSource")) + "</dt><dd>" +
            (d.url ? '<a href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.url) + "</a>" : "—") + "</dd></div>" +
          '<div class="info-row"><dt>' + esc(s("dsSamples")) + "</dt><dd>" + esc(d.samples != null ? d.samples : "—") + "</dd></div>" +
          '<div class="info-row"><dt>' + esc(s("dsFeatures")) + "</dt><dd>" + esc(d.features != null ? d.features : "—") + "</dd></div>" +
        "</dl>";
    }

    var steps = [1, 2, 3, 4].map(function (n) {
      return "<li" + reveal(n * 120, "step") + '><span class="step-num">' + n + "</span><div><h4>" + esc(s("step" + n)) +
        "</h4><p>" + esc(s("step" + n + "d")) + "</p></div></li>";
    }).join("");

    var results = comingSoon();
    if (p.results && p.results.length) {
      results = '<div class="table-wrap"><table class="results"><thead><tr><th>' + esc(s("colModel")) +
        "</th><th>" + esc(s("colMetric")) + "</th><th>" + esc(s("colValue")) + "</th></tr></thead><tbody>" +
        p.results.map(function (r) {
          return "<tr><td>" + esc(r.model) + "</td><td>" + esc(r.metric) + "</td><td>" + esc(r.value) + "</td></tr>";
        }).join("") + "</tbody></table></div>" +
        '<p class="muted small">' + esc(s("secResultsNote")) + "</p>";
    }

    var vid = youtubeId(p.links.video);
    var video = vid
      ? '<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(vid) +
        '" title="' + esc(D.group.name + " – " + tr(p.type)) + '" loading="lazy" allowfullscreen ' +
        'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe></div>'
      : '<div class="video-placeholder">' + icon("video") + "<span>" + esc(s("comingSoon")) + "</span></div>";

    var materials = projectLinks(p).map(function (l) { return linkButton(l, false); }).join("");

    function navLink(target, dir) {
      if (!target) return "<span></span>";
      return '<a class="pager-link ' + dir + '" href="' + ROOT + target.id + '/">' +
        "<small>" + esc(s(dir === "prev" ? "prevProject" : "nextProject")) + "</small>" +
        "<span>" + esc(tr(target.title)) + "</span></a>";
    }

    document.title = tr(p.title) + " · " + D.group.name;

    return (
      '<section class="page-head type-' + esc(p.id) + '">' +
        '<canvas class="hero-canvas" aria-hidden="true"></canvas>' +
        '<div class="hero-glow" aria-hidden="true"></div>' +
        '<div class="container page-head-inner">' +
          "<div" + reveal(500, "page-head-ring") + ">" + progressRing(progressOf(p)) +
            "<small>" + esc(s("progress")) + "</small></div>" +
          '<nav class="breadcrumb fade-up" style="--d:0ms" aria-label="Breadcrumb"><a href="' + ROOT + 'index.html">' + esc(s("home")) +
            "</a><span>›</span><span>" + esc(tr(p.type)) + "</span></nav>" +
          '<div class="card-top fade-up" style="--d:120ms">' +
            '<span class="type-badge">' + icon(TYPE_ICON[p.id] || "table") + esc(s("dataType")) + ": " + esc(tr(p.type)) + "</span>" +
            statusBadge(p.status) +
          "</div>" +
          '<h1 class="split">' + splitWords(tr(p.title)) + "</h1>" +
          (p.summary ? '<p class="hero-lead fade-up" style="--d:600ms">' + esc(tr(p.summary)) + "</p>" : "") +
        "</div>" +
      "</section>" +

      '<div class="container project-layout">' +
        '<div class="project-main">' +
          "<section" + reveal(0, "block") + "><h2>" + esc(s("secProblem")) + "</h2>" +
            (p.problem ? "<p>" + esc(tr(p.problem)) + "</p>" : comingSoon()) + "</section>" +
          "<section" + reveal(0, "block") + "><h2>" + esc(s("secDataset")) + "</h2>" + dataset + "</section>" +
          "<section" + reveal(0, "block") + "><h2>" + esc(s("secPipeline")) + '</h2><ol class="steps timeline">' + steps + "</ol></section>" +
          "<section" + reveal(0, "block") + "><h2>" + esc(s("secResults")) + "</h2>" + results + "</section>" +
          "<section" + reveal(0, "block") + "><h2>" + esc(s("secVideo")) + "</h2>" + video + "</section>" +
        "</div>" +
        '<aside class="project-side">' +
          "<section" + reveal(150, "block side-card") + "><h2>" + esc(s("secMaterials")) + '</h2><div class="material-list">' + materials + "</div></section>" +
          "<section" + reveal(280, "block side-card") + "><h2>" + esc(s("secTeam")) + "</h2>" +
            '<p class="team-name"><strong>' + esc(D.group.name) + '</strong></p><ul class="member-list">' + members + "</ul></section>" +
        "</aside>" +
      "</div>" +

      "<div" + reveal(0, "container pager") + ">" + navLink(prev, "prev") + navLink(next, "next") + "</div>" +
      '<div class="container back-home"><a class="btn btn-ghost" href="' + ROOT + 'index.html">' + icon("back") + esc(s("backHome")) + "</a></div>"
    );
  }

  /* ---------- Khởi chạy ---------- */
  function render() {
    document.documentElement.lang = lang;
    if (PAGE === "home") {
      document.title = D.group.name + " · " + tr(D.course.name);
    }
    document.getElementById("site-header").innerHTML = renderHeader();
    document.getElementById("app").innerHTML = PAGE === "project" ? renderProject() : renderHome();
    document.getElementById("site-footer").innerHTML = renderFooter();
    document.dispatchEvent(new CustomEvent("site:rendered"));

    document.getElementById("lang-toggle").addEventListener("click", function () {
      var y = window.scrollY;
      lang = lang === "vi" ? "en" : "vi";
      saveLang(lang);
      render();
      window.scrollTo(0, y);
    });
  }

  render();
})();
