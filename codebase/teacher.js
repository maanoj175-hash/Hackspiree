// Teacher page behavior
(function () {
  var name = localStorage.getItem("gv_userName") || "Teacher";
  var role = localStorage.getItem("gv_userRole") || "teacher";
  var welcome = document.getElementById("welcome");
  if (welcome) welcome.textContent = "Welcome, " + name + " (" + role + ")";

  // Load posted links
  var links = [];
  try {
    links = JSON.parse(localStorage.getItem("gv_links") || "[]");
  } catch (e) {
    links = [];
  }
  var posted = document.getElementById("postedLinks");
  function renderPosted() {
    if (!posted) return;
    posted.innerHTML = "";
    if (links.length === 0) {
      var empty = document.createElement("div");
      empty.className = "list-group-item text-muted";
      empty.textContent = "No links posted yet.";
      posted.appendChild(empty);
    } else {
      links.forEach(function (l) {
        var item = document.createElement("a");
        item.className = "list-group-item list-group-item-action";
        item.href = l;
        item.target = "_blank";
        item.textContent = l;
        posted.appendChild(item);
      });
    }
  }
  renderPosted();

  var form = document.getElementById("postLinkForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("postLinkInput");
      var val = ((input && input.value) || "").trim();
      if (!val) return;
      links.unshift(val);
      try {
        localStorage.setItem("gv_links", JSON.stringify(links));
      } catch (e) {}
      input.value = "";
      renderPosted();
    });
  }

  // Logout
  var logout = document.getElementById("logoutBtn");
  if (logout) {
    logout.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("gv_userName");
      localStorage.removeItem("gv_userEmail");
      localStorage.removeItem("gv_userRole");
      window.location.href = "index.html";
    });
  }
})();
