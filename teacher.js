// Teacher page behavior
(function () {
  var name = localStorage.getItem("gv_userName") || "Teacher";
  var role = localStorage.getItem("gv_userRole") || "";
  // Access control: only teachers
  if (role !== "teacher") {
    // redirect to index if not teacher
    try {
      window.location.href = "index.html";
    } catch (e) {}
  }
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
      links.forEach(function (l, idx) {
        var item = document.createElement("div");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        var a = document.createElement("a");
        a.href = l;
        a.target = "_blank";
        a.textContent = l;
        var del = document.createElement("button");
        del.className = "btn btn-sm btn-outline-danger";
        del.textContent = "Delete";
        del.addEventListener("click", function () {
          if (!confirm("Delete this link?")) return;
          links.splice(idx, 1);
          try { localStorage.setItem("gv_links", JSON.stringify(links)); } catch(e){}
          renderPosted();
        });
        item.appendChild(a);
        item.appendChild(del);
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

  // Teacher quizzes and resources
  var teacherQuizzes = [];
  try { teacherQuizzes = JSON.parse(localStorage.getItem('gv_teacher_quizzes') || '[]'); } catch(e){ teacherQuizzes = []; }
  var tqEl = document.getElementById('teacherQuizzes');
  function renderTeacherQuizzes(){
    if(!tqEl) return;
    tqEl.innerHTML = '';
    if(teacherQuizzes.length === 0){
      var empty = document.createElement('div'); empty.className='list-group-item text-muted'; empty.textContent='No quizzes authored yet.'; tqEl.appendChild(empty); return;
    }
    teacherQuizzes.forEach(function(q, idx){
      var item = document.createElement('div');
      item.className = 'list-group-item d-flex justify-content-between align-items-center';
      var left = document.createElement('div');
      left.innerHTML = '<div class="fw-semibold">'+q.title+'</div><div class="small text-muted">'+q.subject+' • '+(q.questions.length)+' question(s)</div>';
      var right = document.createElement('div');
      var del = document.createElement('button'); del.className='btn btn-sm btn-outline-danger me-2'; del.textContent='Delete';
      del.addEventListener('click', function(){ if(!confirm('Delete quiz?')) return; teacherQuizzes.splice(idx,1); try{ localStorage.setItem('gv_teacher_quizzes', JSON.stringify(teacherQuizzes)); }catch(e){}; renderTeacherQuizzes(); });
      var exportBtn = document.createElement('button'); exportBtn.className='btn btn-sm btn-outline-secondary'; exportBtn.textContent='Export';
      exportBtn.addEventListener('click', function(){ var blob = new Blob([JSON.stringify(q, null, 2)], {type:'application/json'}); var url = URL.createObjectURL(blob); var a = document.createElement('a'); a.href = url; a.download = q.title.replace(/\s+/g,'-')+'.json'; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(url); document.body.removeChild(a); },3000); });
      right.appendChild(del); right.appendChild(exportBtn);
      item.appendChild(left); item.appendChild(right); tqEl.appendChild(item);
    });
  }
  renderTeacherQuizzes();

  var openCreate = document.getElementById('openCreateQuiz');
  if(openCreate){
    openCreate.addEventListener('click', function(){
      // open a simple prompt-driven creation flow (keeps UI simple)
      var title = prompt('Quiz title'); if(!title) return;
      var subject = prompt('Subject (e.g. Mathematics)')||'General';
      var count = parseInt(prompt('How many questions? (1-10)','3'))||3; count = Math.max(1, Math.min(10, count));
      var questions = [];
      for(var i=0;i<count;i++){
        var qtxt = prompt('Q'+(i+1)+': question text'); if(!qtxt){ alert('Cancelled'); return; }
        var opts = [];
        for(var j=0;j<4;j++){ var o = prompt('Option '+(j+1)+' for Q'+(i+1)); if(!o) o = 'Option '+(j+1); opts.push(o); }
        var ans = parseInt(prompt('Index of correct option (1-4) for Q'+(i+1),'1'))||1; ans = Math.max(1, Math.min(4, ans));
        questions.push({ q: qtxt, options: opts, a: ans-1 });
      }
      var quiz = { id: 'tq-'+Date.now(), title: title, subject: subject, createdAt: new Date().toISOString(), questions: questions, authorEmail: localStorage.getItem('gv_userEmail') || '' };
      teacherQuizzes.unshift(quiz);
      try{ localStorage.setItem('gv_teacher_quizzes', JSON.stringify(teacherQuizzes)); }catch(e){}
      renderTeacherQuizzes();
      alert('Quiz created. Students will see it on the Quizzes page.');
    });
  }

  // Export / Import quizzes
  var expBtn = document.getElementById('exportQuizzes');
  if(expBtn){ expBtn.addEventListener('click', function(){ var blob = new Blob([JSON.stringify(teacherQuizzes||[], null, 2)], {type:'application/json'}); var url = URL.createObjectURL(blob); var a = document.createElement('a'); a.href = url; a.download = 'teacher-quizzes.json'; document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(url); document.body.removeChild(a); },3000); }); }
  var impBtn = document.getElementById('importQuizzes');
  if(impBtn){ impBtn.addEventListener('click', function(){ var txt = prompt('Paste quizzes JSON here'); if(!txt) return; try{ var arr = JSON.parse(txt); if(!Array.isArray(arr)) throw new Error('Invalid'); teacherQuizzes = arr.concat(teacherQuizzes); localStorage.setItem('gv_teacher_quizzes', JSON.stringify(teacherQuizzes)); renderTeacherQuizzes(); alert('Imported '+arr.length+' quizzes'); }catch(e){ alert('Invalid JSON'); } }); }

  // Teacher-posted resources
  var resources = [];
  try{ resources = JSON.parse(localStorage.getItem('gv_resources') || '[]'); }catch(e){ resources = []; }
  var resForm = document.getElementById('postResourceForm');
  if(resForm){ resForm.addEventListener('submit', function(ev){ ev.preventDefault(); var t = document.getElementById('resTitle').value.trim(); var u = document.getElementById('resUrl').value.trim(); var d = document.getElementById('resDesc').value.trim(); if(!t) return alert('Title required'); var r = { id: 'r-'+Date.now(), title: t, url: u, desc: d, subject: '' }; resources.unshift(r); try{ localStorage.setItem('gv_resources', JSON.stringify(resources)); }catch(e){}; document.getElementById('resTitle').value=''; document.getElementById('resUrl').value=''; document.getElementById('resDesc').value=''; alert('Resource added'); }); }

  // Grade summary (reads gv_quiz_grades)
  function renderGradeSummary(){
    try{
      var gradesObj = JSON.parse(localStorage.getItem('gv_quiz_grades') || '{}');
    }catch(e){ gradesObj = {}; }
    // If structured as array (new format), handle both
    var rows = [];
    if(Array.isArray(gradesObj)) rows = gradesObj; else {
      // older format: object keyed by quizId; convert to simple rows
      rows = Object.keys(gradesObj).map(function(k){ var g = gradesObj[k]; return { quizId: k, score: g.score, date: g.date || g.timestamp, studentEmail: g.studentEmail || '', studentName: g.studentName || '' }; });
    }
    // build a small summary inserted near top
    var perf = document.getElementById('performance');
    if(!perf) return;
    var summary = document.getElementById('gradeSummary');
    if(!summary){ summary = document.createElement('div'); summary.id='gradeSummary'; summary.className='mt-3'; perf.parentNode.insertBefore(summary, perf.nextSibling); }
    // aggregate
    if(rows.length === 0){ summary.innerHTML = '<div class="small text-muted">No quiz submissions yet.</div>'; return; }
    var total = rows.reduce(function(s,r){ return s + (r.score||0); },0);
    var avg = Math.round(total/rows.length);
    summary.innerHTML = '<div class="small">Total submissions: '+rows.length+' • Average score: '+avg+'%</div>';
  }
  renderGradeSummary();

  // Render recent submissions for teacher review
  function renderSubmissions(){
    var subEl = document.getElementById('submissionsList');
    if(!subEl) return;
    subEl.innerHTML = '';
    var subs = [];
    try{ subs = JSON.parse(localStorage.getItem('gv_quiz_grades') || '[]'); }catch(e){ subs = []; }
    if(!Array.isArray(subs) || subs.length === 0){ subEl.innerHTML = '<div class="list-group-item text-muted">No submissions yet.</div>'; return; }
    // show latest 20
    subs.slice().reverse().slice(0,20).forEach(function(s, idx){
      var item = document.createElement('div'); item.className='list-group-item d-flex justify-content-between align-items-start';
      var left = document.createElement('div'); left.innerHTML = '<div class="fw-semibold">'+(s.studentName||s.studentEmail||'Anonymous')+' — '+(s.quizTitle||s.quizId||'Quiz')+'</div><div class="small text-muted">Score: '+(s.score||0)+'% • '+(new Date(s.timestamp||s.date||'').toLocaleString())+'</div>';
      var right = document.createElement('div'); var del = document.createElement('button'); del.className='btn btn-sm btn-outline-danger'; del.textContent='Remove';
      del.addEventListener('click', function(){ if(!confirm('Remove this submission?')) return; try{ var all = JSON.parse(localStorage.getItem('gv_quiz_grades')||'[]'); all = all.filter(function(x){ return x.id !== s.id; }); localStorage.setItem('gv_quiz_grades', JSON.stringify(all)); renderSubmissions(); renderGradeSummary(); }catch(e){}});
      right.appendChild(del);
      item.appendChild(left); item.appendChild(right); subEl.appendChild(item);
    });
  }
  renderSubmissions();

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
