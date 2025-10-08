(function () {
  var data = {
    Mathematics: [
      {
        title: "Basic Counting - Video",
        url: "https://www.youtube.com/watch?v=V1Pl8CzNzCw",
      },
      {
        title: "Addition for Beginners",
        url: "https://www.youtube.com/watch?v=JfSB2gqC9j0",
      },
      {
        title: "Shapes and Patterns",
        url: "https://www.youtube.com/watch?v=QwZT7T-TXT0",
      },
    ],
    Science: [
      {
        title: "Plants for Kids",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        title: "Water Cycle Simple",
        url: "https://www.youtube.com/watch?v=ZVjf7s8Qv0k",
      },
    ],
    English: [
      {
        title: "Alphabet Song",
        url: "https://www.youtube.com/watch?v=75p-N9YKqNo",
      },
      {
        title: "Simple Words and Reading",
        url: "https://www.youtube.com/watch?v=5MgBikgcWnY",
      },
    ],
    Computer: [
      {
        title: "Intro to Computers",
        url: "https://www.youtube.com/watch?v=E7wJTI-1dvQ",
      },
      {
        title: "Use a Mouse",
        url: "https://www.youtube.com/watch?v=3GwjfUFyY6M",
      },
    ],
  };

  var subjectSelect = document.getElementById("subjectSelect");
  var linksContainer = document.getElementById("linksContainer");
  var search = document.getElementById("linkSearch");

  function populateSubjects() {
    Object.keys(data).forEach(function (s) {
      var opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      subjectSelect.appendChild(opt);
    });
  }

  function renderList(subject) {
    linksContainer.innerHTML = "";
    var subjects = subject === "all" ? Object.keys(data) : [subject];
    subjects.forEach(function (s) {
      var col = document.createElement("div");
      col.className = "col-12";
      var card = document.createElement("div");
      card.className = "card shadow-sm";
      var body = document.createElement("div");
      body.className = "card-body";
      var h = document.createElement("h5");
      h.className = "card-title mb-2";
      h.textContent = s;
      body.appendChild(h);
      var list = document.createElement("div");
      data[s].forEach(function (item) {
        var a = document.createElement("a");
        a.className =
          "d-flex align-items-center justify-content-between link-item py-2";
        a.href = item.url;
        a.target = "_blank";
        a.innerHTML =
          '<div><i class="bi bi-play-circle-fill me-2"></i><span class="fw-semibold">' +
          item.title +
          '</span></div><div class="text-muted small">YouTube</div>';
        list.appendChild(a);
      });
      body.appendChild(list);
      card.appendChild(body);
      col.appendChild(card);
      linksContainer.appendChild(col);
    });
  }

  populateSubjects();
  renderList("all");

  subjectSelect.addEventListener("change", function () {
    renderList(this.value);
  });
  search.addEventListener("input", function () {
    var q = search.value.toLowerCase();
    var filtered = {};
    Object.keys(data).forEach(function (s) {
      filtered[s] = data[s].filter(function (it) {
        return it.title.toLowerCase().includes(q);
      });
      if (filtered[s].length === 0) delete filtered[s];
    });
    linksContainer.innerHTML = "";
    Object.keys(filtered).forEach(function (s) {
      var col = document.createElement("div");
      col.className = "col-12";
      var card = document.createElement("div");
      card.className = "card shadow-sm";
      var body = document.createElement("div");
      body.className = "card-body";
      var h = document.createElement("h5");
      h.className = "card-title mb-2";
      h.textContent = s;
      body.appendChild(h);
      var list = document.createElement("div");
      filtered[s].forEach(function (item) {
        var a = document.createElement("a");
        a.className =
          "d-flex align-items-center justify-content-between link-item py-2";
        a.href = item.url;
        a.target = "_blank";
        a.innerHTML =
          '<div><i class="bi bi-play-circle-fill me-2"></i><span class="fw-semibold">' +
          item.title +
          '</span></div><div class="text-muted small">YouTube</div>';
        list.appendChild(a);
      });
      body.appendChild(list);
      card.appendChild(body);
      col.appendChild(card);
      linksContainer.appendChild(col);
    });
  });
})();
