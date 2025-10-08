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

// ...existing code...

// Footer year
(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Login modal and role toggle
(function () {
  // Ensure Bootstrap is available
  function safe(fn) {
    try {
      fn();
    } catch (e) {
      // silent
    }
  }

  safe(function () {
    var openBtn = document.getElementById("openLoginBtn");
    var loginModalEl = document.getElementById("loginModal");
    if (!openBtn || !loginModalEl) return;

    var bsModal = new bootstrap.Modal(loginModalEl);

    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      bsModal.show();
    });

    // Role toggle buttons
    var roleButtons = loginModalEl.querySelectorAll(
      ".role-toggle button[data-role]"
    );
    var roleInput = document.getElementById("loginRole");
    var modalTitle = document.getElementById("loginModalLabel");

    roleButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        roleButtons.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        var role = btn.getAttribute("data-role");
        if (roleInput) roleInput.value = role;
        if (modalTitle)
          modalTitle.textContent =
            role === "teacher" ? "Teacher Login" : "Student Login";
      });
    });

    // IDs for role pages (simple identifiers we can use elsewhere)
    var studentId = "student";
    var teacherId = "teacher";

    // Simple submit handler — stores user info and redirects to role page
    var form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = document.getElementById("loginName").value.trim();
        var email = document.getElementById("loginEmail").value.trim();
        var role = roleInput ? roleInput.value : studentId;

        // Minimal validation
        if (!name || !email) {
          form.reportValidity();
          return;
        }

        // Save a minimal session in localStorage for demo purposes
        try {
          localStorage.setItem("gv_userName", name);
          localStorage.setItem("gv_userEmail", email);
          localStorage.setItem("gv_userRole", role);
        } catch (e) {
          // ignore storage errors
        }

        bsModal.hide();

        // Redirect to role page
        if (role === teacherId) {
          window.location.href = "teacher.html";
        } else {
          // Always redirect students to welcome page first
          window.location.href = 'welcome.html';
        }
      });
    }
  });
})();
