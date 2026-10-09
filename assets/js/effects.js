/* Hiệu ứng chuyển động. Tự tắt khi người dùng bật "giảm chuyển động" (prefers-reduced-motion). */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var revealObserver = null;
  var canvasStops = [];
  var typeTimer = null;

  // Bật trạng thái ẩn-chờ-hiện trước lần render đầu tiên để tránh nhấp nháy.
  if (!reduceMotion) document.documentElement.classList.add("js-anim");

  /* ---------- Hiện dần khi cuộn tới ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (revealObserver) revealObserver.disconnect();
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); runCounters(el); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        runCounters(e.target);
        revealObserver.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Số đếm chạy ---------- */
  function runCounters(scope) {
    var els = scope.matches && scope.matches("[data-count]") ? [scope] : [];
    els = els.concat(Array.prototype.slice.call(scope.querySelectorAll("[data-count]")));
    els.forEach(function (el) {
      if (el.dataset.counted) return;
      el.dataset.counted = "1";
      var target = parseFloat(el.dataset.count) || 0;
      var suffix = el.dataset.suffix || "";
      if (reduceMotion || target === 0) { el.textContent = target + suffix; return; }
      var start = null, dur = 1400;
      function step(t) {
        if (!start) start = t;
        var k = Math.min((t - start) / dur, 1);
        var eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- Header thu nhỏ, thanh tiến độ cuộn, nút lên đầu trang ---------- */
  var backTop = null;
  function ensureBackTop() {
    if (backTop) return;
    backTop = document.createElement("button");
    backTop.type = "button";
    backTop.className = "back-top";
    backTop.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" ' +
      'stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
    document.body.appendChild(backTop);
  }

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var header = document.querySelector(".site-header");
    var bar = document.getElementById("scroll-progress");
    if (header) header.classList.toggle("scrolled", y > 12);
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (backTop) backTop.classList.toggle("show", y > 600);
    updateTimeline();
  }

  /* ---------- Đường timeline tự vẽ theo cuộn (trang bài con) ---------- */
  function updateTimeline() {
    var tl = document.querySelector(".timeline");
    if (!tl) return;
    var r = tl.getBoundingClientRect();
    var vh = window.innerHeight;
    var k = (vh * 0.75 - r.top) / r.height;
    tl.style.setProperty("--progress", Math.max(0, Math.min(1, k)).toFixed(3));
  }

  /* ---------- Thẻ nghiêng 3D + vệt sáng theo chuột ---------- */
  function initTilt() {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (y * 100).toFixed(1) + "%");
        card.style.setProperty("--ry", ((x - 0.5) * 10).toFixed(2) + "deg");
        card.style.setProperty("--rx", ((0.5 - y) * 8).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- Gợn sóng khi bấm nút ---------- */
  function initRipple() {
    if (reduceMotion) return;
    document.addEventListener("pointerdown", function (e) {
      var btn = e.target.closest && e.target.closest("a.btn, .lang-toggle");
      if (!btn) return;
      var r = btn.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 2;
      var dot = document.createElement("span");
      dot.className = "ripple";
      dot.style.width = dot.style.height = size + "px";
      dot.style.left = e.clientX - r.left - size / 2 + "px";
      dot.style.top = e.clientY - r.top - size / 2 + "px";
      btn.appendChild(dot);
      setTimeout(function () { dot.remove(); }, 650);
    });
  }

  /* ---------- Chữ gõ máy luân phiên ---------- */
  function initTypewriter() {
    clearTimeout(typeTimer);
    var el = document.querySelector(".typewriter");
    if (!el) return;
    var words;
    try { words = JSON.parse(el.dataset.words); } catch (e) { return; }
    if (reduceMotion || !words.length) return;
    var w = 0, i = words[0].length, deleting = true;
    typeTimer = setTimeout(function tick() {
      var word = words[w];
      i += deleting ? -1 : 1;
      el.textContent = word.slice(0, i);
      var delay = deleting ? 40 : 85;
      if (!deleting && i === word.length) { deleting = true; delay = 1800; }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      typeTimer = setTimeout(tick, delay);
    }, 2400);
  }

  /* ---------- Mạng "điểm dữ liệu" trên nền hero ---------- */
  function initCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return function () {};
    var host = canvas.parentElement;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, pts = [], raf = 0, visible = true;
    var mouse = { x: -9999, y: -9999 };

    function resize() {
      W = host.clientWidth; H = host.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, (W * H) / 14000));
      pts = [];
      for (var k = 0; k < n; k++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.8
        });
      }
      if (reduceMotion) draw();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      var link = 130;
      for (var a = 0; a < pts.length; a++) {
        var p = pts[a];
        if (!reduceMotion) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          var mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < 140 && md > 0) { p.x += (mdx / md) * 0.9; p.y += (mdy / md) * 0.9; }
        }
        for (var b = a + 1; b < pts.length; b++) {
          var q = pts[b], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < link) {
            ctx.strokeStyle = "rgba(255,255,255," + (0.22 * (1 - d / link)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    function loop() {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    }

    function onMove(e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    }
    function onLeave() { mouse.x = mouse.y = -9999; }

    resize();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    var io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(function (en) { visible = en[0].isIntersecting; });
      io.observe(host);
    }
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return function stop() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (io) io.disconnect();
    };
  }

  function initCanvases() {
    canvasStops.forEach(function (stop) { stop(); });
    canvasStops = [];
    document.querySelectorAll(".hero-canvas").forEach(function (c) { canvasStops.push(initCanvas(c)); });
  }

  /* ---------- Khởi chạy sau mỗi lần render (kể cả khi đổi ngôn ngữ) ---------- */
  var bound = false;
  document.addEventListener("site:rendered", function () {
    ensureBackTop();
    var label = window.I18N_STRINGS.backToTop[document.documentElement.lang] || "Lên đầu trang";
    backTop.setAttribute("aria-label", label);
    backTop.title = label;
    initReveal();
    initTilt();
    initTypewriter();
    initCanvases();
    if (!bound) {
      bound = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      initRipple();
    }
    onScroll();
  });
})();
