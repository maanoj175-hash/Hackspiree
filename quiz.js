(function () {
  // Simple quiz data: 10 short quizzes across different subjects
  var quizzes = [
    {
      id: "q1",
      title: "Numbers 1-10",
      subject: "Mathematics",
      questions: [
        { q: "What comes after 3?", options: ["2","4","5","1"], a: 1 },
        { q: "Which is the largest?", options: ["2","9","5","7"], a: 1 },
        { q: "How many fingers on one hand?", options: ["4","5","6","3"], a: 1 }
      ]
    },
    {
      id: "q2",
      title: "Alphabet Basics",
      subject: "English",
      questions: [
        { q: "Which letter starts the word 'Apple'?", options: ["B","A","C","D"], a: 1 },
        { q: "Which is a vowel?", options: ["B","C","E","D"], a: 2 }
      ]
    },
    {
      id: "q3",
      title: "Plant Parts",
      subject: "Science",
      questions: [
        { q: "Which part absorbs water?", options: ["Leaf","Stem","Root","Flower"], a: 2 },
        { q: "Where seeds are made?", options: ["Roots","Leaves","Flowers","Stem"], a: 2 }
      ]
    },
    {
      id: "q4",
      title: "Shapes",
      subject: "Mathematics",
      questions: [
        { q: "How many sides does a triangle have?", options: ["3","4","5","2"], a: 0 },
        { q: "A circle has how many corners?", options: ["1","0","2","3"], a: 1 }
      ]
    },
    {
      id: "q5",
      title: "Colors",
      subject: "Art",
      questions: [
        { q: "Which color is made by mixing red and white?", options: ["Pink","Green","Blue","Black"], a: 0 }
      ]
    },
    {
      id: "q6",
      title: "Counting Objects",
      subject: "Mathematics",
      questions: [
        { q: "Count: 2 apples + 3 apples = ?", options: ["4","5","6","3"], a: 1 }
      ]
    },
    {
      id: "q7",
      title: "Simple Machines",
      subject: "Science",
      questions: [
        { q: "Which tool helps lift heavy loads with less effort?", options: ["Lever","Book","Pencil","Paper"], a: 0 }
      ]
    },
    {
      id: "q8",
      title: "Days of Week",
      subject: "General",
      questions: [
        { q: "What day comes after Monday?", options: ["Sunday","Tuesday","Wednesday","Thursday"], a: 1 }
      ]
    },
    {
      id: "q9",
      title: "Body Parts",
      subject: "Health",
      questions: [
        { q: "We see with our...", options: ["Nose","Eyes","Ears","Mouth"], a: 1 }
      ]
    },
    {
      id: "q10",
      title: "Computers: Basics",
      subject: "Computer",
      questions: [
        { q: "Which device is used to type?", options: ["Keyboard","Monitor","Mouse","Printer"], a: 0 }
      ]
    }
  ];

  // Merge in teacher-created quizzes (if any)
  try {
    var teacherQs = JSON.parse(localStorage.getItem('gv_teacher_quizzes') || '[]');
    if (Array.isArray(teacherQs) && teacherQs.length) {
      // prepend teacher quizzes with a small marker
      teacherQs.forEach(function (tq) {
        tq._teacher = true;
      });
      quizzes = teacherQs.concat(quizzes);
    }
  } catch (e) {}

  var quizListEl = document.getElementById("quizList");
  var quizRunner = document.getElementById("quizRunner");
  var quizTitle = document.getElementById("quizTitle");
  var quizQuestion = document.getElementById("quizQuestion");
  var quizOptions = document.getElementById("quizOptions");
  var currentIndexEl = document.getElementById("currentIndex");
  var totalQuestionsEl = document.getElementById("totalQuestions");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var submitBtn = document.getElementById("submitBtn");
  var quizResult = document.getElementById("quizResult");

  // Render list of quizzes
  function renderQuizList() {
    if (!quizListEl) return;
    quizzes.forEach(function (q) {
      var col = document.createElement("div");
      col.className = "col-md-6";
      var card = document.createElement("div");
      card.className = "card shadow-sm p-0";
      var body = document.createElement("div");
      body.className = "card-body";
      var h = document.createElement("h5");
      h.className = "card-title mb-1";
      h.textContent = q.title + " — " + q.subject;
      var p = document.createElement("p");
      p.className = "text-muted small mb-2";
      p.textContent = q.questions.length + " question(s) • Quick quiz";
      var btn = document.createElement("button");
      btn.className = "btn btn-apply btn-sm";
      btn.textContent = "Take Quiz";
      btn.addEventListener("click", function () {
        startQuiz(q);
      });
      body.appendChild(h);
      body.appendChild(p);
      body.appendChild(btn);
      card.appendChild(body);
      col.appendChild(card);
      quizListEl.appendChild(col);
    });
  }

  // Quiz state
  var activeQuiz = null;
  var answers = [];
  var qIndex = 0;

  function startQuiz(q) {
    activeQuiz = q;
    answers = Array(q.questions.length).fill(null);
    qIndex = 0;
    quizTitle.textContent = q.title + " — " + q.subject;
    totalQuestionsEl.textContent = q.questions.length;
    renderQuestion();
    quizListEl.parentElement.querySelector('#quizRunner').hidden = false;
    quizListEl.hidden = true;
    quizRunner.hidden = false;
    quizResult.hidden = true;
    updateNavButtons();
  }

  function renderQuestion() {
    var item = activeQuiz.questions[qIndex];
    currentIndexEl.textContent = qIndex + 1;
    quizQuestion.textContent = item.q;
    quizOptions.innerHTML = "";
    item.options.forEach(function (opt, idx) {
      var btn = document.createElement("button");
      btn.className = "btn btn-outline-secondary d-block w-100 text-start mb-2";
      btn.textContent = opt;
      btn.addEventListener("click", function () {
        answers[qIndex] = idx;
        // mark selected
        Array.from(quizOptions.children).forEach(function (c) {
          c.classList.remove("btn-primary");
          c.classList.add("btn-outline-secondary");
        });
        btn.classList.remove("btn-outline-secondary");
        btn.classList.add("btn-primary");
        updateNavButtons();
      });
      // restore selection
      if (answers[qIndex] === idx) {
        btn.classList.remove("btn-outline-secondary");
        btn.classList.add("btn-primary");
      }
      quizOptions.appendChild(btn);
    });
  }

  function updateNavButtons() {
    prevBtn.disabled = qIndex === 0;
    if (qIndex === activeQuiz.questions.length - 1) {
      nextBtn.hidden = true;
      submitBtn.hidden = false;
    } else {
      nextBtn.hidden = false;
      submitBtn.hidden = true;
    }
  }

  prevBtn.addEventListener("click", function () {
    if (qIndex > 0) {
      qIndex--;
      renderQuestion();
      updateNavButtons();
    }
  });

  nextBtn.addEventListener("click", function () {
    if (qIndex < activeQuiz.questions.length - 1) {
      qIndex++;
      renderQuestion();
      updateNavButtons();
    }
  });

  submitBtn.addEventListener("click", function () {
    // simple grading
    var correct = 0;
    activeQuiz.questions.forEach(function (it, idx) {
      if (answers[idx] === it.a) correct++;
    });
    var pct = Math.round((correct / activeQuiz.questions.length) * 100);
    quizResult.hidden = false;
    quizResult.className = "alert alert-success mt-3";
    quizResult.textContent = "You scored " + correct + "/" + activeQuiz.questions.length + " (" + pct + "%).";
    // save brief grade in localStorage by quiz id
    try {
      // store as array of submissions so teacher can view multiple student submissions
      var submissions = JSON.parse(localStorage.getItem('gv_quiz_grades') || '[]');
      if(!Array.isArray(submissions)) submissions = [];
      var studentName = localStorage.getItem('gv_userName') || 'Anonymous';
      var studentEmail = localStorage.getItem('gv_userEmail') || '';
      submissions.push({ id: 's-' + Date.now(), quizId: activeQuiz.id, quizTitle: activeQuiz.title || '', studentName: studentName, studentEmail: studentEmail, score: pct, correct: correct, total: activeQuiz.questions.length, timestamp: new Date().toISOString() });
      localStorage.setItem('gv_quiz_grades', JSON.stringify(submissions));
    } catch (e) {}
  });

  // initial render
  renderQuizList();
})();