// Resource library app (fake data)
(function () {
  var resources = [
    {
      id: "r1",
      title: "Numbers: Basics",
      desc: "Learn numbers 1-10 with pictures and audio.",
      url: "/resources/numbers-basics.txt",
      tags: ["numbers", "beginner"],
    },
    {
      id: "r2",
      title: "Alphabet: Letters",
      desc: "Alphabet with simple words and images.",
      url: "/resources/alphabet-letters.txt",
      tags: ["letters", "beginner"],
    },
    {
      id: "r3",
      title: "Plants: A Short Guide",
      desc: "Plant parts and simple experiments.",
      url: "/resources/plants-guide.txt",
      tags: ["science", "plants"],
    },
    {
      id: "r4",
      title: "Counting Objects",
      desc: "Interactive counting activity (fake).",
      url: "",
      tags: ["activity"],
    },
    {
      id: "r5",
      title: "Simple Words",
      desc: "Flashcards for early readers.",
      url: "",
      tags: ["reading"],
    },
  ];

  // Merge teacher-posted resources (gv_resources)
  try {
    var teacherResources = JSON.parse(localStorage.getItem('gv_resources') || '[]');
    if (Array.isArray(teacherResources) && teacherResources.length) {
      // prepend teacher resources so they appear first
      resources = teacherResources.concat(resources);
    }
  } catch (e) {}

  var grid = document.getElementById("resourceGrid");
  var search = document.getElementById("searchInput");
  var bookmarksEl = document.getElementById("bookmarks");
  var downloadPackBtn = document.getElementById("downloadPackBtn");
  var quizArea = document.getElementById("quizArea");

  function renderCard(r) {
    var col = document.createElement("div");
    col.className = "col-md-6";
    var card = document.createElement("div");
    card.className = "card resource-card h-100 shadow-sm";
    var body = document.createElement("div");
    body.className = "card-body d-flex flex-column";
    var title = document.createElement("h6");
    title.className = "card-title";
    title.textContent = r.title;
    var p = document.createElement("p");
    p.className = "card-text small text-muted";
    p.textContent = r.desc;
    var ctrl = document.createElement("div");
    ctrl.className = "mt-auto d-flex gap-2";

    var play = document.createElement("button");
    play.className = "btn btn-outline-primary btn-sm";
    play.innerHTML = '<i class="bi bi-play-fill"></i> Play';
    play.addEventListener("click", function () {
      if ("speechSynthesis" in window) {
        var u = new SpeechSynthesisUtterance(r.title + ". " + r.desc);
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      } else alert("Speech not supported");
    });

    var dl = document.createElement("a");
    dl.className = "btn btn-outline-success btn-sm";
    dl.innerHTML = '<i class="bi bi-download"></i> Download';
    if (r.url) {
      dl.href = r.url;
      dl.download = r.title.replace(/\s+/g, "-") + ".txt";
    } else {
      dl.href = "#";
      dl.addEventListener("click", function (e) {
        e.preventDefault();
        alert("No file for this resource");
      });
    }

    var bookmark = document.createElement("button");
    bookmark.className = "btn btn-outline-secondary btn-sm";
    bookmark.innerHTML = '<i class="bi bi-bookmark"></i> Bookmark';
    bookmark.addEventListener("click", function () {
      toggleBookmark(r.id);
      renderBookmarks();
    });

    var practice = document.createElement("button");
    practice.className = "btn btn-outline-info btn-sm";
    practice.innerHTML = '<i class="bi bi-pencil-square"></i> Practice';
    practice.addEventListener("click", function () {
      startMiniQuiz(r);
    });

    ctrl.appendChild(play);
    ctrl.appendChild(dl);
    ctrl.appendChild(bookmark);
    ctrl.appendChild(practice);
    body.appendChild(title);
    body.appendChild(p);
    body.appendChild(ctrl);
    card.appendChild(body);
    col.appendChild(card);
    return col;
  }

  function renderAll(list) {
    grid.innerHTML = "";
    list.forEach(function (r) {
      grid.appendChild(renderCard(r));
    });
  }
  renderAll(resources);

  // Search
  search.addEventListener("input", function () {
    var q = search.value.trim().toLowerCase();
    renderAll(
      resources.filter(function (r) {
        return (
          r.title.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q) ||
          r.tags.join(" ").includes(q)
        );
      })
    );
  });

  // Bookmarks using localStorage
  function getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem("gv_bookmarks") || "[]");
    } catch (e) {
      return [];
    }
  }
  function toggleBookmark(id) {
    var bm = getBookmarks();
    var i = bm.indexOf(id);
    if (i > -1) bm.splice(i, 1);
    else bm.unshift(id);
    try {
      localStorage.setItem("gv_bookmarks", JSON.stringify(bm));
    } catch (e) {}
  }
  function renderBookmarks() {
    bookmarksEl.innerHTML = "";
    var bm = getBookmarks();
    if (bm.length === 0) {
      bookmarksEl.innerHTML =
        '<div class="list-group-item text-muted">No bookmarks</div>';
      return;
    }
    bm.forEach(function (id) {
      var r = resources.find(function (x) {
        return x.id === id;
      });
      if (!r) return;
      var a = document.createElement("a");
      a.className = "list-group-item list-group-item-action";
      a.href = "#";
      a.textContent = r.title;
      a.addEventListener("click", function (e) {
        e.preventDefault();
        renderAll([r]);
      });
      bookmarksEl.appendChild(a);
    });
  }
  renderBookmarks();

  // Mini-quiz: simple Q/A generated from title words
  function startMiniQuiz(resource) {
    quizArea.innerHTML = "";
    var words = resource.title.split(/\s+/).slice(0, 3);
    var q = document.createElement("div");
    q.className = "small";
    q.innerHTML =
      '<div class="fw-semibold mb-2">Quick Quiz: choose the correct starting word</div>';
    var options = [];
    words.forEach(function (w) {
      options.push(w);
    });
    options.push("Tree");
    shuffle(options);
    options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.className = "btn btn-outline-primary btn-sm me-2 mb-2";
      btn.textContent = opt;
      btn.addEventListener("click", function () {
        if (opt === words[0]) alert("Correct!");
        else alert("Try again");
      });
      quizArea.appendChild(btn);
    });
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
  }

  // Download offline pack: bundle bookmarked and core resources into a zip-like blob (simulated)
  downloadPackBtn.addEventListener("click", function () {
    var bm = getBookmarks();
    var toInclude = resources.filter(function (r) {
      return bm.indexOf(r.id) > -1 || r.url;
    });
    if (toInclude.length === 0) {
      alert("No resources to include. Bookmark some or use available files.");
      return;
    }
    var combined = toInclude
      .map(function (r) {
        return (
          "--- " +
          r.title +
          " ---\n\n" +
          (r.url ? "See file at: " + r.url : r.desc) +
          "\n\n"
        );
      })
      .join("\n");
    var blob = new Blob([combined], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "gramvidya-offline-pack.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 5000);
  });

  // Utility: play onboarding from resources page
  document.addEventListener("DOMContentLoaded", function () {
    /* no-op */
  });
})();
