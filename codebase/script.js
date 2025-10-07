// Back to Top button logic
(function () {
  var btn = document.getElementById("backToTop");
  if (!btn) return;

  function toggle() {
    var shouldShow = window.scrollY > 200;
    btn.classList.toggle("show", shouldShow);
  }

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// Footer year
(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
