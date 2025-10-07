// Student dashboard with fake data and charts
(function () {
  // Basic session info
  var name = localStorage.getItem("gv_userName") || "Student";
  var role = localStorage.getItem("gv_userRole") || "student";
  var welcome = document.getElementById("welcome");
  if (welcome) welcome.textContent = "Welcome, " + name + " — keep going!";

  // Fake dataset generator
  function generateFakeSubjects() {
    return [
      { id: "math", name: "Mathematics", score: 78 },
      { id: "science", name: "Science", score: 64 },
      { id: "english", name: "English", score: 86 },
      { id: "social", name: "Social Studies", score: 72 },
      { id: "computer", name: "Computer", score: 91 },
    ];
  }

  var subjects = generateFakeSubjects();

  // Render subjects list with progress bars
  var subjectsList = document.getElementById("subjectsList");
  if (subjectsList) {
    subjects.forEach(function (s) {
      var item = document.createElement("div");
      item.className = "mb-3";
      item.innerHTML =
        '<div class="d-flex justify-content-between align-items-center mb-1"><div class="fw-semibold">' +
        s.name +
        '</div><div class="text-muted small">' +
        s.score +
        "%</div></div>" +
        '<div class="progress" style="height:10px"><div class="progress-bar bg-edu-emerald" role="progressbar" style="width:' +
        s.score +
        '%" aria-valuenow="' +
        s.score +
        '" aria-valuemin="0" aria-valuemax="100"></div></div>';
      subjectsList.appendChild(item);
    });
  }

  // Overall percent calculation
  var overall = Math.round(
    subjects.reduce(function (a, b) {
      return a + b.score;
    }, 0) / subjects.length
  );
  var overallEl = document.getElementById("overallPercent");
  if (overallEl) overallEl.textContent = overall + "%";

  // Fake progress over 8 weeks
  var weeks = Array.from({ length: 8 }, function (_, i) {
    return "W" + (i + 1);
  });
  var progressSeries = weeks.map(function (_, i) {
    // base progress with some noise
    return Math.min(
      100,
      Math.max(
        10,
        Math.round(overall * (0.6 + i * 0.06) + (Math.random() * 8 - 4))
      )
    );
  });

  // Render Chart.js line chart for progress
  function renderProgressChart() {
    var ctx = document.getElementById("progressChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: weeks,
        datasets: [
          {
            label: "Completion %",
            data: progressSeries,
            borderColor: "#0a5db1",
            backgroundColor: "rgba(10,93,177,0.12)",
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#0a5db1",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function (v) {
                return v + "%";
              },
            },
          },
        },
      },
    });
  }

  // Subject performance chart (bar)
  function renderSubjectChart() {
    var ctx = document.getElementById("subjectChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: subjects.map(function (s) {
          return s.name;
        }),
        datasets: [
          {
            label: "Score",
            data: subjects.map(function (s) {
              return s.score;
            }),
            backgroundColor: [
              "#0a5db1",
              "#1e7f5a",
              "#f4b400",
              "#6f42c1",
              "#fd7e14",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function (v) {
                return v + "%";
              },
            },
          },
        },
      },
    });
  }

  // Recent activity (fake)
  function renderActivity() {
    var activities = [];
    var subjectsMap = subjects.map(function (s) {
      return s.name;
    });
    for (var i = 0; i < 6; i++) {
      var subj = subjectsMap[Math.floor(Math.random() * subjectsMap.length)];
      var score = Math.max(
        40,
        Math.min(100, Math.round(Math.random() * 30 + 60))
      );
      activities.push({
        time: i + 1 + "h ago",
        text: "Completed quiz in " + subj + " (" + score + "%)",
      });
    }
    var list = document.getElementById("activityList");
    if (list) {
      activities.forEach(function (a) {
        var li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-start";
        li.innerHTML =
          '<div><div class="fw-semibold">' +
          a.text +
          '</div><div class="small text-muted">' +
          a.time +
          "</div></div>";
        list.appendChild(li);
      });
    }
  }

  // Resources
  // Resources: expanded into cards with download and audio read-aloud
  var resources = [
    {
      id: "r1",
      title: "Numbers: Basics",
      type: "audio",
      text: "This lesson teaches numbers 1 to 10 with examples.",
      filename: "numbers-basics.txt",
      url: "/resources/numbers-basics.txt",
    },
    {
      id: "r2",
      title: "Alphabet: Letters",
      type: "audio",
      text: "Learn the alphabet with simple words and pictures.",
      filename: "alphabet-letters.txt",
      url: "/resources/alphabet-letters.txt",
    },
    {
      id: "r3",
      title: "Plants: A short guide",
      type: "pdf",
      text: "A short illustrated guide about plants and their parts.",
      filename: "plants-guide.txt",
      url: "/resources/plants-guide.txt",
    },
  ];

  var resourcesContainer = document.getElementById("resourcesContainer");
  function makeDownloadBlob(text, filename) {
    try {
      var blob = new Blob([text], { type: "text/plain" });
      var url = URL.createObjectURL(blob);
      return { blob: blob, url: url, filename: filename };
    } catch (e) {
      return null;
    }
  }

  if (resourcesContainer) {
    resources.forEach(function (r) {
      var col = document.createElement("div");
      col.className = "col-md-4";

      var card = document.createElement("div");
      card.className = "card resource-card h-100 shadow-sm";

      var body = document.createElement("div");
      body.className = "card-body d-flex flex-column";

      var title = document.createElement("h6");
      title.className = "card-title fw-semibold";
      title.textContent = r.title;

      var desc = document.createElement("p");
      desc.className = "card-text text-muted small mb-3";
      desc.textContent = r.text;

      var controls = document.createElement("div");
      controls.className = "mt-auto d-flex gap-2";

      // Play (use speech synthesis for easy accessibility)
      var playBtn = document.createElement("button");
      playBtn.className = "btn btn-outline-primary btn-sm";
      playBtn.innerHTML = '<i class="bi bi-play-fill"></i> Play';
      playBtn.addEventListener("click", function () {
        if ("speechSynthesis" in window) {
          var utter = new SpeechSynthesisUtterance(r.title + ". " + r.text);
          utter.rate = 0.95;
          speechSynthesis.cancel();
          speechSynthesis.speak(utter);
        } else {
          alert("Speech not supported on this browser.");
        }
      });

      // Download — prefer pre-bundled resource URL when available
      var dlBtn = document.createElement("a");
      dlBtn.className = "btn btn-outline-success btn-sm";
      dlBtn.innerHTML = '<i class="bi bi-download"></i> Download';
      if (r.url) {
        dlBtn.href = r.url;
        dlBtn.download = r.filename || "resource.txt";
      } else {
        var dl = makeDownloadBlob(r.text, r.filename || "resource.txt");
        if (dl) {
          dlBtn.href = dl.url;
          dlBtn.download = dl.filename;
        } else {
          dlBtn.href = "#";
          dlBtn.addEventListener("click", function (e) {
            e.preventDefault();
            alert("Download not available");
          });
        }
      }

      controls.appendChild(playBtn);
      controls.appendChild(dlBtn);

      body.appendChild(title);
      body.appendChild(desc);
      body.appendChild(controls);
      card.appendChild(body);
      col.appendChild(card);
      resourcesContainer.appendChild(col);
    });
  }
  // Quick top 2 resources preview in sidebar
  try {
    var quickList = document.getElementById("resourcesList");
    if (quickList) {
      var top = resources.slice(0, 2);
      top.forEach(function (r) {
        var a = document.createElement("a");
        a.className = "list-group-item list-group-item-action";
        a.href = "resources.html";
        a.textContent = r.title;
        quickList.appendChild(a);
      });
    }
  } catch (e) {}

  // Populate student links from teacher posts (localStorage)
  var links = [];
  try {
    links = JSON.parse(localStorage.getItem("gv_links") || "[]");
  } catch (e) {
    links = [];
  }
  var linksContainer = document.getElementById("studentLinks");
  if (linksContainer) {
    if (links.length === 0) {
      var empty = document.createElement("div");
      empty.className = "list-group-item text-muted";
      empty.textContent = "No links posted yet.";
      linksContainer.appendChild(empty);
    } else {
      links.forEach(function (l) {
        var a = document.createElement("a");
        a.className = "list-group-item list-group-item-action";
        a.href = l;
        a.target = "_blank";
        a.textContent = l;
        linksContainer.appendChild(a);
      });
    }
  }

  // Render charts and activity
  try {
    renderProgressChart();
  } catch (e) {}
  try {
    renderSubjectChart();
  } catch (e) {}
  try {
    renderActivity();
  } catch (e) {}

  // Easy Mode: bigger UI for uneducated/low-literacy users
  var easyBtn = document.getElementById("easyModeBtn");
  function setEasy(enabled) {
    document.documentElement.classList.toggle("easy-mode", enabled);
    try {
      localStorage.setItem("gv_easyMode", enabled ? "1" : "0");
    } catch (e) {}
  }
  if (easyBtn) {
    var saved = localStorage.getItem("gv_easyMode") === "1";
    setEasy(saved);
    easyBtn.addEventListener("click", function () {
      setEasy(!document.documentElement.classList.contains("easy-mode"));
    });
  }

  // Spoken onboarding — run once per user or when clicked
  function runOnboarding() {
    if (!("speechSynthesis" in window)) return;
    var msgs = [
      "Welcome to GramVidya. This is your student dashboard.",
      "Here you can see your overall progress, recent activities and subject scores.",
      "Scroll down to Resources. Tap Play to listen or Download to save for later.",
    ];
    msgs.forEach(function (m, i) {
      var u = new SpeechSynthesisUtterance(m);
      u.rate = 0.95;
      setTimeout(function () {
        speechSynthesis.speak(u);
      }, i * 2800);
    });
  }

  try {
    if (!localStorage.getItem("gv_onboarded")) {
      runOnboarding();
      localStorage.setItem("gv_onboarded", "1");
    }
  } catch (e) {}

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
