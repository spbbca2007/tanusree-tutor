import { curriculum, bankKeyForTopic } from "./curriculum.js";
import { defaultState, loadState, saveState, recordAttempt, recordStageVisit, getTopicMastery, getOverallMastery, getWeakSkills, getMostRecentMisconceptions, getRecommendation, getProgressOverview, getTopicStatus, redoTopic } from "./state.js";
import { tutor } from "./tutor.js";
import { recordQuestionSeen } from "./engine.js";
import { questionBank } from "./questionbank.js";
import { visuals } from "./visuals.js";
import { exportProgress, importProgress, autoBackupIfDue, getLastBackupInfo, formatBackupTime, getMigrationSummary, getBackupLog } from "./backup.js";
import { checkDbConnection, loadStateFromDb, saveStateToDb, scheduleSave, forceSave, getDbStats, getConnectionStatus } from "./db.js";
import { getSolution } from "./solver.js";
import { ensureAuthenticated } from "./auth.js";

let state = defaultState();
let selectedTopicId = curriculum.topics[0].id;
let selectedLessonId = null;
let activeStage = "learn";
let selectedQuestionId = null;
let wrongStreak = {};
let correctStreak = 0;
let challengeState = null;
let sessionStart = Date.now();

const views = {};
document.querySelectorAll(".view").forEach(el => { views[el.id.replace("view-","")] = el; });

function refreshSidebar() {
  if (window.refreshSidebarStats) window.refreshSidebarStats(state, getOverallMastery(state));
}

async function boot() {
  await ensureAuthenticated();
  await checkDbConnection();
  const { state: loaded } = await loadStateFromDb();
  if (loaded) state = { ...defaultState(), ...loaded };
  bindNav(); renderAll(); showView("dashboard"); refreshSidebar(); trackSession();
}
boot();

function showView(name) {
  Object.values(views).forEach(v => v.classList.remove("visible"));
  if (views[name]) views[name].classList.add("visible");
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === name));
}

function bindNav() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const v = btn.dataset.view;
      if (v === "dashboard") { renderDashboard(); showView("dashboard"); }
      else if (v === "topics") { renderTopics(); showView("topics"); }
      else if (v === "parent") { renderParent(); showView("parent"); }
      else showView(v);
    });
  });
  document.body.addEventListener("click", handleClick);
}

function renderAll() { renderDashboard(); renderTopics(); }

function getTopic(id) { return curriculum.topics.find(t => t.id === (id || selectedTopicId)); }
function topicsForCurrentGrade() { return curriculum.topics.filter(t => t.grade === (state.currentGrade || 6)); }
function setGrade(g) { state.currentGrade = g; scheduleSave(state); renderAll(); showView(document.querySelector(".nav-btn.active")?.dataset.view || "dashboard"); }
window.setGrade = setGrade;
function getLesson() { const t = getTopic(); return t.lessons.find(l => l.id === selectedLessonId) || t.lessons[0]; }

// Execute scripts injected via innerHTML
function executeScripts(container) {
  container.querySelectorAll("script").forEach(old => {
    const s = document.createElement("script");
    Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value));
    s.textContent = old.textContent;
    old.parentNode.replaceChild(s, old);
  });
}

function renderLesson() {
  const topic = getTopic(); const lesson = getLesson();
  views.lesson.innerHTML = buildLessonView(topic, lesson);
  executeScripts(views.lesson);
}

function handleClick(e) {
  const btn = e.target.closest("[data-action]"); if (!btn) return;
  const action = btn.dataset.action; const data = btn.dataset;
  switch(action) {
    case "open-topic": selectedTopicId=data.topicId; renderTopicDetail(); showView("topic"); break;
    case "start-lesson":
      selectedTopicId=data.topicId; selectedLessonId=data.lessonId||getTopic().lessons[0].id;
      activeStage="learn"; state=recordStageVisit(state,selectedTopicId,selectedLessonId,"learn");
      scheduleSave(state); renderLesson(); showView("lesson");
      document.getElementById("nav-lesson").style.display="";
      document.getElementById("nav-lesson").style.display="flex"; break;
    case "back-to-topic": renderTopicDetail(); showView("topic"); break;
    case "back-to-topics": renderTopics(); showView("topics"); break;
    case "go-stage": handleGoStage(data.stage); break;
    case "answer-practice": handleAnswer(data.answer); break;
    case "select-question": selectedQuestionId=data.questionId; renderLesson(); break;
    case "back-to-questions": selectedQuestionId=null; renderLesson(); break;
    case "show-solver": handleShowSolver(data.questionId); break;
    case "solver-next-step": handleSolverStep(data.questionId, parseInt(data.step)); break;
    case "redo-topic": handleRedo(data.topicId); break;
    case "export-progress": handleExport(); break;
    case "import-progress": handleImport(); break;
    case "start-challenge": initChallenge(); renderLesson(); break;
    case "submit-challenge": handleChallengeSubmit(); break;
    case "select-challenge": challengeState.selected=data.answer; renderLesson(); break;
  }
}

function handleGoStage(stage) {
  activeStage = stage;
  state = recordStageVisit(state, selectedTopicId, selectedLessonId, stage);
  scheduleSave(state);
  if (stage === "practice") { selectedQuestionId=null; wrongStreak={}; correctStreak=0; }
  if (stage === "challenge") { initChallenge(); }
  renderLesson();
}

// ── Dashboard ──────────────────────────────────────────────────
function renderDashboard() {
  const grade = state.currentGrade || 6;
  const overall = getOverallMastery(state, grade);
  const rec = getRecommendation(state, grade);
  const greeting = tutor.greet(state);
  const ov = getProgressOverview(state, grade);
  const s = ov.summary;
  views.dashboard.innerHTML = `
    <style>
      .grade-toggle{display:flex;gap:8px;margin:14px 0}
      .grade-btn{padding:8px 16px;border-radius:999px;border:1.5px solid #ddd;background:#f9f9f9;color:#666;font-size:13px;font-weight:600;cursor:pointer}
      .grade-btn.on{background:#4a90d9;color:#fff;border-color:#4a90d9}
      .g7-notice{background:#fff8e6;border:1px solid #f4d58d;border-radius:10px;padding:10px 14px;font-size:13px;color:#7a5c00;margin-bottom:14px}
    </style>
    <div class="page-wrap">
      <div class="page-header">
        <div class="sparky-greeting">
          <div class="greeting-title">${greeting.title}</div>
          <div class="greeting-body">${greeting.body}</div>
        </div>
      </div>
      <div class="grade-toggle">
        <button class="grade-btn ${grade===6?'on':''}" onclick="setGrade(6)">Grade 6 · Review</button>
        <button class="grade-btn ${grade===7?'on':''}" onclick="setGrade(7)">Grade 7 · Current</button>
      </div>
      <div class="stats-row">
        <div class="stat-card"><span class="stat-num">${state.stars||0}</span><span class="stat-label">Stars</span></div>
        <div class="stat-card"><span class="stat-num">${state.streak||0}</span><span class="stat-label">Day streak</span></div>
        <div class="stat-card"><span class="stat-num">${overall}%</span><span class="stat-label">Overall mastery</span></div>
        <div class="stat-card"><span class="stat-num" style="color:var(--teal)">${s.completed}</span><span class="stat-label">Topics done</span></div>
        <div class="stat-card"><span class="stat-num" style="color:var(--orange)">${s.inProgress}</span><span class="stat-label">In progress</span></div>
        <div class="stat-card"><span class="stat-num" style="color:var(--ink3)">${s.notStarted}</span><span class="stat-label">Not started</span></div>
      </div>
      ${grade===7 && topicsForCurrentGrade().length < 5 ? `<div class="g7-notice">📚 Grade 7 content is being added topic by topic — ${topicsForCurrentGrade().length} of 14 topics ready so far. More coming soon!</div>` : ""}
      ${rec ? `
      <div class="rec-card" data-action="open-topic" data-topic-id="${rec.topic.id}">
        <span class="rec-emoji">${rec.topic.emoji}</span>
        <div><div class="rec-title">Study next: ${rec.topic.title}</div><div class="rec-reason">${rec.reason}</div></div>
        <span class="rec-arrow">→</span>
      </div>` : ""}
      <div class="topics-grid">
        ${topicsForCurrentGrade().map(t => {
          const m = getTopicMastery(state,t.id);
          const st = getTopicStatus(state,t.id);
          return `<div class="topic-card ${t.color}" data-action="open-topic" data-topic-id="${t.id}" style="cursor:pointer">
            <div class="topic-card-top"><span class="topic-big-emoji">${t.emoji}</span>
              <span class="topic-status-badge ${st==='completed'?'status-done':st==='in-progress'?'status-progress':'status-pending'}">${st==='completed'?'Done':st==='in-progress'?'In progress':'New'}</span>
            </div>
            <h3 class="topic-card-title">${t.title}</h3>
            ${t.fromSchool?'<span class="school-badge">📋 From your papers</span>':''}
            ${m>0?`<div class="topic-progress-bar"><div class="topic-progress-fill" style="width:${m}%"></div></div><div style="font-size:11px;color:var(--ink3);margin-top:2px">${m}% mastery</div>`:''}
          </div>`;
        }).join("")}
      </div>
    </div>`;
}

// ── Topics ─────────────────────────────────────────────────────
function renderTopics() {
  const grade = state.currentGrade || 6;
  const ov = getProgressOverview(state, grade); const s = ov.summary;
  views.topics.innerHTML = `
    <div class="page-wrap">
      <div class="page-header"><h2>All Topics</h2><p class="subtitle">${grade===6?"11 topics — 7 core + 4 from your school papers":`Grade 7 · ${s.total} of 14 topics ready`}</p></div>
      <div class="grade-toggle">
        <button class="grade-btn ${grade===6?'on':''}" onclick="setGrade(6)">Grade 6 · Review</button>
        <button class="grade-btn ${grade===7?'on':''}" onclick="setGrade(7)">Grade 7 · Current</button>
      </div>
      <div class="progress-overview-bar">
        <div class="pob-item pob-done"><span class="pob-num">${s.completed}</span><span class="pob-lbl">Completed</span></div>
        <div class="pob-divider"></div>
        <div class="pob-item pob-progress"><span class="pob-num">${s.inProgress}</span><span class="pob-lbl">In progress</span></div>
        <div class="pob-divider"></div>
        <div class="pob-item pob-pending"><span class="pob-num">${s.notStarted}</span><span class="pob-lbl">Not started</span></div>
        <div class="pob-divider"></div>
        <div class="pob-item"><span class="pob-num">${s.total}</span><span class="pob-lbl">Total</span></div>
        <div class="pob-bar-wrap"><div class="pob-bar">
          <div class="pob-seg pob-seg-done" style="width:${(s.completed/s.total)*100}%"></div>
          <div class="pob-seg pob-seg-prog" style="width:${(s.inProgress/s.total)*100}%"></div>
          <div class="pob-seg pob-seg-pend" style="width:${(s.notStarted/s.total)*100}%"></div>
        </div></div>
      </div>
      ${grade===7 ? renderTopicsByTerm(ov.details) : `<div class="topics-grid">${ov.details.map(renderTopicCard).join("")}</div>`}
    </div>`;
}

function renderTopicCard({topic,status,mastery,totalAttempts,correctAttempts}) {
  return `
          <div class="topic-card ${topic.color}">
            <div class="topic-card-top">
              <span class="topic-big-emoji">${topic.emoji}</span>
              <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end">
                <span class="topic-status-badge ${status==='completed'?'status-done':status==='in-progress'?'status-progress':'status-pending'}">${status==='completed'?'Completed':status==='in-progress'?'In progress':'Not started'}</span>
                ${topic.fromSchool?'<span class="school-badge">📋 School</span>':''}
              </div>
            </div>
            <h3 class="topic-card-title">${topic.title}</h3>
            <p class="topic-card-tagline">${topic.tagline}</p>
            <div class="topic-stats-row">
              <div class="ts-item"><span class="ts-num">${mastery}%</span><span class="ts-lbl">Mastery</span></div>
              <div class="ts-item"><span class="ts-num">${totalAttempts}</span><span class="ts-lbl">Attempts</span></div>
              <div class="ts-item"><span class="ts-num">${totalAttempts>0?Math.round(correctAttempts/totalAttempts*100):0}%</span><span class="ts-lbl">Accuracy</span></div>
            </div>
            ${mastery>0?`<div class="topic-progress-bar"><div class="topic-progress-fill" style="width:${mastery}%"></div></div>`:''}
            <div class="topic-card-actions">
              <button class="btn-topic-start" data-action="open-topic" data-topic-id="${topic.id}">${status==='not-started'?'Start →':status==='completed'?'Review →':'Continue →'}</button>
              ${status!=='not-started'?`<button class="btn-redo" data-action="redo-topic" data-topic-id="${topic.id}">↺ Redo</button>`:''}
            </div>
          </div>`;
}

// Groups the already-computed detail rows by topic.term and renders three
// labelled sections (Term 1/2/3) instead of one flat grid. Topics without a
// term (shouldn't happen for Grade 7, but kept safe) are dropped into an
// "Unassigned" section rather than silently disappearing.
function renderTopicsByTerm(details) {
  const terms = { 1: [], 2: [], 3: [] };
  const unassigned = [];
  details.forEach(d => { if (d.topic.term && terms[d.topic.term]) terms[d.topic.term].push(d); else unassigned.push(d); });
  const termLabels = { 1: "Term 1", 2: "Term 2", 3: "Term 3" };
  let html = "";
  [1,2,3].forEach(termNum => {
    if (!terms[termNum].length) return;
    html += `<div class="term-section"><h3 class="term-heading">${termLabels[termNum]}</h3><div class="topics-grid">${terms[termNum].map(renderTopicCard).join("")}</div></div>`;
  });
  if (unassigned.length) html += `<div class="term-section"><h3 class="term-heading">More</h3><div class="topics-grid">${unassigned.map(renderTopicCard).join("")}</div></div>`;
  return `<style>.term-heading{font-size:16px;font-weight:700;color:#444;margin:22px 0 10px}.term-section:first-of-type .term-heading{margin-top:8px}</style>${html}`;
}

// ── Topic detail ───────────────────────────────────────────────
function renderTopicDetail() {
  const topic = getTopic();
  const mastery = getTopicMastery(state, selectedTopicId);
  const weak = getWeakSkills(state, selectedTopicId);
  views.topic.innerHTML = `
    <div class="page-wrap">
      <button class="btn-back" data-action="back-to-topics">← All Topics</button>
      <div class="topic-detail-header ${topic.color}">
        <span class="topic-detail-emoji">${topic.emoji}</span>
        <div><h2>${topic.title}</h2><p>${topic.tagline}</p>
          ${topic.fromSchool?`<div class="school-note">📋 ${topic.schoolNote||'From your school papers'}</div>`:''}
        </div>
      </div>
      <div class="mastery-bar-wrap">
        <div class="mastery-label"><span>Mastery</span><span>${mastery}%</span></div>
        <div class="mastery-bar"><div class="mastery-fill" style="width:${mastery}%"></div></div>
      </div>
      ${weak.length?`<div class="weak-skills"><p class="weak-title">Focus areas:</p>${weak.map(s=>`<span class="weak-tag">${s.label} ${s.mastery>=0?`(${s.mastery}%)`:''}</span>`).join('')}</div>`:''}
      <div class="lessons-list">
        ${topic.lessons.map(lesson => `
          <div class="lesson-card">
            <div class="lesson-card-info">
              <h3>${lesson.title}</h3>
              <p class="lesson-card-sub">${lesson.practice.length} practice questions</p>
            </div>
            <button class="btn-primary" data-action="start-lesson" data-topic-id="${topic.id}" data-lesson-id="${lesson.id}">Start →</button>
          </div>`).join("")}
      </div>
    </div>`;
  document.getElementById("nav-topic-detail").style.display = "flex";
  document.getElementById("nav-topic-label").textContent = topic.title;
}

// ── Lesson builder ─────────────────────────────────────────────
function buildLessonView(topic, lesson) {
  const stages = ["learn","visual","interactive","practice","challenge","realworld"];
  const icons = {learn:"📖",visual:"🎬",interactive:"🎛️",practice:"📝",challenge:"🏆",realworld:"🌍"};
  const labels = {learn:"1·Understand",visual:"2·See it",interactive:"3·Feel it",practice:"4·Exam-style",challenge:"5·Challenge",realworld:"6·Real World"};
  const pills = stages.map(s => `<button class="path-pill ${s===activeStage?"path-active":""}" data-action="go-stage" data-stage="${s}">${icons[s]} ${labels[s]}</button>`).join("");
  let content = "";
  if (activeStage==="learn") content = buildLearn(lesson);
  else if (activeStage==="visual") content = buildVisual(topic);
  else if (activeStage==="interactive") content = buildInteractive(topic);
  else if (activeStage==="practice") content = buildPractice();
  else if (activeStage==="challenge") content = buildChallenge(lesson);
  else if (activeStage==="realworld") content = buildRealWorld(topic);
  return `<div class="lesson-chrome">
    <div class="lesson-topbar"><button class="btn-back" data-action="back-to-topic">← ${topic.title}</button><div class="lesson-path">${pills}</div></div>
    <div class="lesson-title-row"><span class="topic-badge ${topic.color}">${topic.emoji} ${topic.title}</span><h2>${lesson.title}</h2></div>
    <div class="lesson-stage-content">${content}</div>
  </div>`;
}

function buildLearn(lesson) {
  const blocks = (lesson.blocks||[]).map(b => {
    if (b.type==="text"||b.type==="example") return `<div class="learn-block"><h4>${b.title}</h4><pre class="learn-body">${b.body}</pre></div>`;
    if (b.type==="tip") return `<div class="learn-tip">💡 ${b.body}</div>`;
    return "";
  }).join("");
  return `<div class="learn-wrap">
    <div class="first-principle">${lesson.firstPrinciple}</div>
    ${blocks}
    <div class="learn-nav">
      <button class="btn-primary" data-action="go-stage" data-stage="visual">See it visually →</button>
      <button class="btn-secondary" style="margin-left:8px" data-action="go-stage" data-stage="practice">Skip to questions</button>
    </div>
  </div>`;
}

function buildVisual(topic) {
  const v = visuals[topic.id];
  if (!v) return `<div class="vis-placeholder"><p>Visual coming soon for ${topic.title}!</p><button class="btn-primary" data-action="go-stage" data-stage="practice">Go to questions →</button></div>`;
  return `<div class="visual-stage-wrap">
    <div class="visual-stage-label"><span class="eyebrow">Step 2 · See it</span><h3>Watch the concept come alive</h3></div>
    <div class="visual-content-block">${v.animated}</div>
    <div class="visual-stage-nav"><button class="btn-primary" data-action="go-stage" data-stage="interactive">Now feel it yourself →</button><button class="btn-secondary" data-action="go-stage" data-stage="practice" style="margin-left:8px">Skip to questions</button></div>
  </div>`;
}

function buildInteractive(topic) {
  const v = visuals[topic.id];
  if (!v) return `<div class="vis-placeholder"><p>Interactive coming soon!</p><button class="btn-primary" data-action="go-stage" data-stage="practice">Go to questions →</button></div>`;
  return `<div class="visual-stage-wrap">
    <div class="visual-stage-label"><span class="eyebrow">Step 3 · Feel it</span><h3>You control it now</h3></div>
    <div class="visual-content-block">${v.interactive}</div>
    <div class="visual-stage-nav"><button class="btn-primary" data-action="go-stage" data-stage="practice">Try exam-style questions →</button></div>
  </div>`;
}

function currentTopicQuestions() {
  const key = bankKeyForTopic[selectedTopicId];
  return (key && questionBank[key]) ? questionBank[key] : [];
}

function lastAttemptFor(qId) {
  const attempts = state.attempts || [];
  for (let i = attempts.length - 1; i >= 0; i--) { if (attempts[i].questionId === qId) return attempts[i]; }
  return null;
}

function buildPractice() {
  const all = currentTopicQuestions();
  if (!all.length) return `<div class="vis-placeholder"><p>No questions available. Add questions to the bank for this topic.</p></div>`;
  if (!selectedQuestionId) return buildQuestionList(all);
  const q = all.find(x => x.id === selectedQuestionId);
  if (!q) { selectedQuestionId = null; return buildQuestionList(all); }
  return buildQuestionCard(q);
}

function buildQuestionList(all) {
  const attemptedCount = all.filter(q => lastAttemptFor(q.id)).length;
  const correctCount = all.filter(q => { const a = lastAttemptFor(q.id); return a && a.correct; }).length;
  const tiers = ["easy","medium","hard"];
  const tierLabels = {easy:"Easy",medium:"Medium",hard:"Hard"};
  const sections = tiers.map(tier => {
    const qs = all.filter(q => q.tier === tier);
    if (!qs.length) return "";
    const items = qs.map(q => {
      const a = lastAttemptFor(q.id);
      const status = !a ? "qs-new" : a.correct ? "qs-correct" : "qs-wrong";
      const icon = !a ? "" : a.correct ? "✓" : "✕";
      const preview = q.prompt.length > 70 ? q.prompt.slice(0,70)+"…" : q.prompt;
      return `<button class="qlist-item ${status}" data-action="select-question" data-question-id="${q.id}"><span class="qlist-icon">${icon}</span><span class="qlist-prompt">${preview}</span></button>`;
    }).join("");
    return `<div class="qlist-tier"><h4 class="qlist-tier-label">${tierLabels[tier]}</h4><div class="qlist-grid">${items}</div></div>`;
  }).join("");
  return `<div class="qlist-wrap">
    <style>
      .qlist-summary{display:flex;gap:16px;margin-bottom:16px;font-size:13px;color:#666}
      .qlist-summary b{color:#333}
      .qlist-tier-label{font-size:13px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:.03em;margin:16px 0 8px}
      .qlist-tier:first-child .qlist-tier-label{margin-top:0}
      .qlist-grid{display:flex;flex-direction:column;gap:8px}
      .qlist-item{display:flex;align-items:center;gap:10px;text-align:left;padding:12px 14px;border-radius:10px;border:1.5px solid #e5e5e5;background:#fff;cursor:pointer;font-size:14px;color:#333;width:100%}
      .qlist-item:hover{border-color:#4a90d9}
      .qlist-item.qs-correct{border-color:#3d9970;background:#f0faf5}
      .qlist-item.qs-wrong{border-color:#e07a3d;background:#fff8f0}
      .qlist-icon{width:18px;flex-shrink:0;font-weight:700;text-align:center}
      .qs-correct .qlist-icon{color:#3d9970}
      .qs-wrong .qlist-icon{color:#e07a3d}
    </style>
    <div class="qlist-summary"><span><b>${attemptedCount}</b> of ${all.length} attempted</span><span><b>${correctCount}</b> correct so far</span></div>
    ${sections}
  </div>`;
}

function buildQuestionCard(q) {
  return `<div class="practice-layout">
    <button class="btn-back" data-action="back-to-questions" style="margin-bottom:12px">← All questions</button>
    <div class="question-card">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span class="tier-badge tier-${q.tier}">${q.tier}</span>
        <span id="ws-status-badge" class="ws-status-badge">Not attempted</span>
      </div>
      <p class="question-prompt">${q.prompt}</p>
      <div class="answer-grid" id="ans-grid">
        ${q.options.map(opt => `<button class="answer-btn" data-action="answer-practice" data-answer="${opt}">${opt}</button>`).join("")}
      </div>
      <button class="hint-btn" id="hint-btn" onclick="document.getElementById('hint-area').style.display='block';this.style.display='none'">💡 Need a hint?</button>
      <div id="hint-area" class="hint-area" style="display:none"><p>${q.hint}</p></div>
    </div>
    <div id="feedback-area" class="feedback-area"></div>
    ${buildWorkspace(q.id)}
  </div>`;
}

function buildWorkspace(questionId) {
  return `<div class="ws-grid" id="ws-grid">
    <style>
      .ws-grid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:14px;transition:grid-template-columns .3s ease}
      .ws-panel{background:#f7f5f0;border-radius:12px;padding:14px}
      .ws-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
      .ws-label{font-size:13px;color:#666}
      .ws-actions{display:flex;gap:8px}
      .ws-btn{padding:6px 12px;border-radius:8px;border:1px solid #ccc;background:#fff;color:#444;font-size:13px;cursor:pointer}
      .ws-canvas{width:100%;height:260px;border-radius:8px;border:1.5px solid #ddd;background:#fff;touch-action:none;display:block;cursor:crosshair}
      .ws-canvas:focus{outline:none;border-color:#4a90d9;box-shadow:0 0 0 2px rgba(74,144,217,0.25)}
      .ws-btn-row{display:flex;gap:8px;margin-top:10px}
      .ws-btn-row button{flex:1;padding:8px 12px;border-radius:8px;border:1px solid #ccc;background:#fff;color:#444;font-size:13px;cursor:pointer}
      .ws-check-btn{border-color:#4a90d9!important;color:#4a90d9!important}
      .ws-complete-btn.is-complete{border-color:#3d9970!important;color:#3d9970!important}
      .ws-review-col{display:none;flex-direction:column;background:#eef5fc;border-radius:12px;padding:14px}
      .ws-review-label{font-size:13px;color:#666;margin-bottom:8px}
      .ws-review-empty{font-size:13px;color:#999;margin:auto;text-align:center}
      .ws-review-msg{font-size:13px;color:#2c5f8a;margin:0}
      .ws-status-badge{font-size:12px;color:#999}
      .ws-status-badge.is-complete{color:#3d9970}
    </style>
    <div class="ws-panel">
      <div class="ws-header">
        <span class="ws-label">✏️ Working space — write or draw your steps</span>
        <div class="ws-actions">
          <button class="ws-btn" id="ws-clear">Clear</button>
          <button class="ws-btn" id="ws-save">Save as image</button>
        </div>
      </div>
      <canvas id="ws-canvas" class="ws-canvas" tabindex="0"></canvas>
      <div class="ws-btn-row">
        <button class="ws-check-btn" id="ws-check">🧑‍🏫 Check my work</button>
        <button class="ws-complete-btn" id="ws-complete">Mark complete</button>
        <button id="ws-redo" style="display:none">Redo</button>
      </div>
    </div>
    <div class="ws-review-col" id="ws-review-col">
      <span class="ws-review-label">AI feedback</span>
      <div id="ws-review-panel" class="ws-review-empty">Tap "Check my work" to see feedback here.</div>
    </div>
  </div>
  <script>
    (function(){
      var WS_COMPLETE_KEY = "sparky-workspace-complete";
      var questionId = ${JSON.stringify(questionId)};

      function getCompletedSet(){
        try { return new Set(JSON.parse(localStorage.getItem(WS_COMPLETE_KEY) || "[]")); }
        catch(e) { return new Set(); }
      }
      function saveCompletedSet(set){
        try { localStorage.setItem(WS_COMPLETE_KEY, JSON.stringify(Array.from(set))); } catch(e) {}
      }

      if (typeof window.__wsCleanup === "function") { window.__wsCleanup(); }

      var PAUSE_THRESHOLD_MS = window.SPARKY_PAUSE_THRESHOLD_MS || 20000;
      var POLL_MS = window.SPARKY_WS_POLL_MS || 1000;

      var canvas = document.getElementById("ws-canvas");
      if (!canvas) return;
      var ctx = canvas.getContext("2d");
      if (!ctx) return;

      var drawing = false;
      var hasContent = false;
      var lastStrokeTime = Date.now();
      var pauseTriggered = false;

      // Resizing a canvas's width/height ALWAYS wipes its pixel content —
      // that's just how <canvas> works. Since this now runs every time the
      // review panel expands/collapses (not just once at load), a naive
      // resize would silently erase her work the moment she asks for a
      // review. So: snapshot whatever's currently drawn to an offscreen
      // canvas first, resize, then draw the snapshot back — scaled to the
      // new size. Not pixel-perfect if the aspect ratio changes a lot, but
      // nothing gets lost.
      function resizeCanvas(){
        var rect = canvas.getBoundingClientRect();
        var dpr = window.devicePixelRatio || 1;
        var cssW = rect.width, cssH = rect.height;

        var snapshot = null;
        if (hasContent && canvas.width > 0 && canvas.height > 0) {
          var temp = document.createElement("canvas");
          temp.width = canvas.width;
          temp.height = canvas.height;
          temp.getContext("2d").drawImage(canvas, 0, 0);
          snapshot = temp;
        }

        canvas.width = cssW * dpr;
        canvas.height = cssH * dpr;
        ctx.scale(dpr, dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#2c2c2a";

        if (snapshot) {
          ctx.drawImage(snapshot, 0, 0, snapshot.width, snapshot.height, 0, 0, cssW, cssH);
        }
      }
      resizeCanvas();

      function pos(e){
        var rect = canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
      function widthFor(e){
        var isPen = e.pointerType === "pen";
        var p = (isPen || e.pointerType === "touch") && e.pressure > 0 ? e.pressure : 0.5;
        return Math.max(1.2, p * 4.5);
      }

      var grid = document.getElementById("ws-grid");
      var reviewCol = document.getElementById("ws-review-col");
      var reviewPanel = document.getElementById("ws-review-panel");

      function expandReview(){
        grid.style.gridTemplateColumns = "1.3fr 1fr";
        reviewCol.style.display = "flex";
      }
      function collapseReview(){
        grid.style.gridTemplateColumns = "1fr";
        reviewCol.style.display = "none";
        reviewPanel.className = "ws-review-empty";
        reviewPanel.textContent = "Tap \\"Check my work\\" to see feedback here.";
        setTimeout(resizeCanvas, 50);
      }

      // Single integration point for the future Grok-backed step review.
      // Today this only shows a placeholder message in the review column.
      // Later, replace the body of this function with a real call — e.g.
      // POST canvas.toDataURL() plus the question context to a Netlify
      // function that calls Grok — gated by the confirm-before-save step
      // already agreed for accuracy safety.
      function requestStepReview(reason){
        expandReview();
        reviewPanel.className = "ws-review-msg";
        reviewPanel.textContent = reason === "pause"
          ? "Looks like you paused on this one — want a hint? (AI review isn't connected yet)"
          : "Checking your work… (AI review isn't connected yet)";
        setTimeout(resizeCanvas, 50);
      }

      canvas.addEventListener("pointerdown", function(e){
        e.preventDefault();
        if (reviewCol.style.display === "flex") { collapseReview(); }
        drawing = true;
        hasContent = true;
        lastStrokeTime = Date.now();
        pauseTriggered = false;
        var p = pos(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        canvas.setPointerCapture(e.pointerId);
      });
      canvas.addEventListener("pointermove", function(e){
        if (!drawing) return;
        e.preventDefault();
        lastStrokeTime = Date.now();
        var p = pos(e);
        ctx.lineWidth = widthFor(e);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
      });
      function stopDrawing(){ drawing = false; }
      canvas.addEventListener("pointerup", stopDrawing);
      canvas.addEventListener("pointerleave", stopDrawing);
      canvas.addEventListener("pointercancel", stopDrawing);

      document.getElementById("ws-clear").addEventListener("click", function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hasContent = false;
        pauseTriggered = false;
        if (reviewCol.style.display === "flex") { collapseReview(); }
      });
      document.getElementById("ws-save").addEventListener("click", function(){
        var link = document.createElement("a");
        link.download = "tanusree-work.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
      document.getElementById("ws-check").addEventListener("click", function(){
        if (!hasContent) {
          expandReview();
          reviewPanel.className = "ws-review-msg";
          reviewPanel.textContent = "Write out your steps first, then tap Check my work.";
          setTimeout(resizeCanvas, 50);
          return;
        }
        requestStepReview("manual");
      });

      var statusBadge = document.getElementById("ws-status-badge");
      var completeBtn = document.getElementById("ws-complete");
      var redoBtn = document.getElementById("ws-redo");

      function refreshStatus(){
        var done = questionId && getCompletedSet().has(questionId);
        if (done) {
          statusBadge.textContent = "Complete";
          statusBadge.classList.add("is-complete");
          completeBtn.style.display = "none";
          redoBtn.style.display = "block";
        } else {
          statusBadge.textContent = "Not attempted";
          statusBadge.classList.remove("is-complete");
          completeBtn.style.display = "block";
          redoBtn.style.display = "none";
        }
      }
      refreshStatus();

      completeBtn.addEventListener("click", function(){
        if (!questionId) return;
        var set = getCompletedSet();
        set.add(questionId);
        saveCompletedSet(set);
        refreshStatus();
      });
      redoBtn.addEventListener("click", function(){
        if (questionId) {
          var set = getCompletedSet();
          set.delete(questionId);
          saveCompletedSet(set);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hasContent = false;
        pauseTriggered = false;
        collapseReview();
        refreshStatus();
      });

      var pauseChecker = setInterval(function(){
        if (!hasContent || pauseTriggered) return;
        if (Date.now() - lastStrokeTime >= PAUSE_THRESHOLD_MS) {
          pauseTriggered = true;
          requestStepReview("pause");
        }
      }, POLL_MS);

      window.__wsCleanup = function(){ clearInterval(pauseChecker); };
    })();
  </script>`;
}

function handleAnswer(answer) {
  const all = currentTopicQuestions();
  const q = all.find(x => x.id === selectedQuestionId);
  if (!q) return;
  const correct = answer === q.answer;
  if (correct) correctStreak++; else { correctStreak=0; wrongStreak[q.id]=(wrongStreak[q.id]||0)+1; }
  state = recordAttempt(state,{topicId:selectedTopicId,lessonId:selectedLessonId,questionId:q.id,skill:q.skill,correct,misconception:correct?null:q.misconception});
  scheduleSave(state); refreshSidebar(); recordQuestionSeen(q.id);
  document.querySelectorAll("#ans-grid .answer-btn").forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.answer===q.answer) btn.classList.add("answer-correct");
    else if (btn.dataset.answer===answer&&!correct) btn.classList.add("answer-wrong");
  });
  const fb = document.getElementById("feedback-area"); if(!fb) return;
  const msg = correct ? tutor.correct(correctStreak) : tutor.incorrect(q.misconception, getTopic().title);
  const idx = all.findIndex(x => x.id === q.id);
  const nextQ = all[idx+1];
  fb.innerHTML = `<div class="feedback-msg ${correct?"feedback-correct":"feedback-incorrect"}">
    <strong>${msg.title}</strong><p>${msg.body}</p>
    ${!correct?`<p class="explanation">${q.explanation}</p>`:""}
    <div class="feedback-actions">
      <button class="btn-solver" data-action="show-solver" data-question-id="${q.id}">📋 Show me how to solve this</button>
      <button class="btn-secondary" data-action="back-to-questions" style="margin-left:8px">← All questions</button>
      ${nextQ?`<button class="btn-primary" data-action="select-question" data-question-id="${nextQ.id}" style="margin-left:8px">Next question →</button>`:""}
    </div>
  </div>
  <div id="solver-panel-${q.id}" class="solver-panel" style="display:none"></div>`;
}

// ── Challenge ──────────────────────────────────────────────────
function initChallenge() {
  const lesson = getLesson();
  challengeState = { ch: lesson.challenge, selected: null, submitted: false };
}

function buildChallenge(lesson) {
  if (!challengeState || challengeState.ch !== lesson.challenge) initChallenge();
  const ch = challengeState.ch;
  if (!ch) return `<div class="vis-placeholder"><p>Challenge coming soon!</p></div>`;
  if (challengeState.submitted) {
    const correct = challengeState.selected === ch.answer;
    return `<div class="challenge-result ${correct?"result-correct":"result-try-again"}">
      <div class="result-icon">${correct?"🏆":"💪"}</div>
      <h3>${correct?"Challenge cleared!":"Good try!"}</h3>
      <div class="challenge-explanation"><p>${ch.explanation}</p>${!correct?`<p class="coach-note">💬 ${ch.coach}</p>`:""}</div>
      <div class="result-actions">
        <button class="btn-primary" data-action="go-stage" data-stage="realworld">🌍 Try it in real life →</button>
        <button class="btn-secondary" data-action="back-to-topic" style="margin-left:8px">Topic overview</button>
        ${!correct?`<button class="btn-secondary" data-action="go-stage" data-stage="challenge" style="margin-left:8px">Try again</button>`:""}
        <button class="btn-solver" data-action="show-solver" data-question-id="challenge-${selectedTopicId}" style="margin-left:8px">📋 Show solution</button>
      </div>
      <div id="solver-panel-challenge-${selectedTopicId}" class="solver-panel" style="display:none"></div>
    </div>`;
  }
  return `<div class="challenge-wrap">
    <div class="challenge-header"><span class="challenge-badge">🏆 Challenge</span><p>No hints. No help. Just you and the problem.</p></div>
    <div class="question-card challenge-card">
      <p class="question-prompt">${ch.prompt}</p>
      <div class="answer-grid">
        ${ch.options.map(opt => `<button class="answer-btn ${challengeState.selected===opt?"selected":""}" data-action="select-challenge" data-answer="${opt}">${opt}</button>`).join("")}
      </div>
    </div>
    <button class="btn-primary ${!challengeState.selected?"btn-disabled":""}" ${!challengeState.selected?"disabled":""} data-action="submit-challenge" style="margin-top:12px">Submit answer →</button>
  </div>`;
}

function buildRealWorld(topic) {
  const rw = topic.realWorld;
  if (!rw) return `<div class="vis-placeholder"><p>Real-world activity coming soon!</p><button class="btn-primary" data-action="back-to-topic">Back to topic</button></div>`;
  return `<div class="realworld-wrap">
    <div class="rw-hero">
      <span class="rw-hero-emoji">${rw.emoji||"🌍"}</span>
      <div><span class="eyebrow">Step 6 · Real World Mission</span><h3>${rw.title}</h3></div>
    </div>
    <div class="rw-card">
      <div class="rw-section">
        <span class="rw-label">🎯 Your mission</span>
        <p class="rw-task">${rw.task}</p>
      </div>
      <div class="rw-section">
        <span class="rw-label">🧰 What you need</span>
        <p class="rw-materials">${rw.materials}</p>
      </div>
      <div class="rw-bringback">
        <span class="rw-label">📸 Bring back</span>
        <p>${rw.bringBack}</p>
      </div>
    </div>
    <div class="rw-note">Real maths lives outside the screen. Try this with your hands — it makes the hard stuff feel simple. Show your parent what you found!</div>
    <div class="visual-stage-nav" style="margin-top:16px">
      <button class="btn-primary" data-action="back-to-topic">Done — back to topic</button>
      <button class="btn-secondary" data-action="go-stage" data-stage="practice" style="margin-left:8px">More practice</button>
    </div>
  </div>`;
}

function handleChallengeSubmit() {
  if (!challengeState || !challengeState.selected) return;
  challengeState.submitted = true;
  const correct = challengeState.selected === challengeState.ch.answer;
  state = recordAttempt(state,{topicId:selectedTopicId,lessonId:selectedLessonId,questionId:`challenge-${selectedTopicId}`,skill:"challenge",correct,misconception:null});
  scheduleSave(state); refreshSidebar(); renderLesson();
}

// ── Solver ─────────────────────────────────────────────────────
function handleShowSolver(questionId) {
  let question = null;
  Object.values(questionBank).forEach(qs => { const f=qs.find(q=>q.id===questionId); if(f) question=f; });
  if (!question) { const lesson=getLesson(); if(lesson.challenge) question={id:questionId,...lesson.challenge}; }
  if (!question) return;
  renderSolverPanel(questionId, question, 0);
}

function renderSolverPanel(questionId, question, stepIndex) {
  const steps = getSolution(questionId, question);
  const panel = document.getElementById(`solver-panel-${questionId}`); if(!panel) return;
  panel.style.display = "block";
  const total = steps.length; const step = steps[stepIndex]; const isLast = stepIndex===total-1;
  const pills = steps.map((s,i) => `<span class="solver-pill ${i<stepIndex?"solver-pill-done":i===stepIndex?"solver-pill-active":"solver-pill-pending"}">${i<stepIndex?"✓":i+1}</span>${i<total-1?"<span class='solver-pill-connector'></span>":""}`).join("");
  panel.innerHTML = `<div class="solver-wrap">
    <div class="solver-header"><span class="solver-title">📋 Step-by-step solution</span><span class="solver-count">Step ${stepIndex+1} of ${total}</span></div>
    <div class="solver-progress">${pills}</div>
    <div class="solver-step">
      <div class="solver-step-label">${step.title}</div>
      <p class="solver-explanation">${step.explanation}</p>
      <div class="solver-math">${step.math}</div>
      ${step.tip?`<div class="solver-tip">💡 ${step.tip}</div>`:""}
    </div>
    <div class="solver-nav">
      ${stepIndex>0?`<button class="btn-secondary btn-small" data-action="solver-next-step" data-question-id="${questionId}" data-step="${stepIndex-1}">← Previous</button>`:"<span></span>"}
      ${!isLast?`<button class="btn-primary btn-small" data-action="solver-next-step" data-question-id="${questionId}" data-step="${stepIndex+1}">Next step →</button>`:`<button class="btn-primary btn-small" onclick="document.getElementById('solver-panel-${questionId}').style.display='none'">Got it! ✓</button>`}
    </div>
  </div>`;
}

function handleSolverStep(questionId, step) {
  let question = null;
  Object.values(questionBank).forEach(qs => { const f=qs.find(q=>q.id===questionId); if(f) question=f; });
  if (!question) { const lesson=getLesson(); if(lesson.challenge) question={id:questionId,...lesson.challenge}; }
  if (question) renderSolverPanel(questionId, question, step);
}

// ── Redo ───────────────────────────────────────────────────────
function handleRedo(topicId) {
  const topic = getTopic(topicId);
  if (!confirm(`Reset "${topic.title}"?\n\nThis clears mastery so practice feels fresh. Your attempt history is kept.\n\nOK to reset?`)) return;
  state = redoTopic(state, topicId); scheduleSave(state); refreshSidebar(); renderTopics(); showView("topics");
}

// ── Export/Import ──────────────────────────────────────────────
function handleExport() {
  exportProgress(state);
  const btn = document.getElementById("export-btn");
  if (btn) { btn.textContent="✓ Saved!"; btn.disabled=true; setTimeout(()=>{btn.textContent="📥 Export progress";btn.disabled=false;},2500); }
}

async function handleImport() {
  try {
    const {state:restored, meta} = await importProgress();
    state = {...defaultState(),...restored}; scheduleSave(state); refreshSidebar(); renderAll();
    const slot = document.getElementById("import-result");
    if (slot) slot.innerHTML=`<div class="backup-success">✓ Restored from ${meta.filename}<br><span style="font-size:12px;color:var(--ink3)">Backed up: ${formatBackupTime(meta.exportedAt)}</span></div>`;
  } catch(err) {
    const slot = document.getElementById("import-result");
    if (slot) slot.innerHTML=`<div class="backup-error">⚠️ ${err}</div>`;
  }
}

// ── Parent View ────────────────────────────────────────────────
function renderParent() {
  const overall = getOverallMastery(state);
  const misconceptions = getMostRecentMisconceptions(state);
  const examRecords = state.examRecords || [];
  const lastBackup = getLastBackupInfo();
  const migration = getMigrationSummary(state);
  const connStatus = getConnectionStatus();
  getDbStats().then(stats => { const el=document.getElementById("db-stats-slot"); if(!el||!stats) return; el.innerHTML=`<div class="db-stat-grid"><div class="db-stat"><span class="db-stat-n">${stats.counts?.attempts||0}</span><span class="db-stat-l">Attempts</span></div><div class="db-stat"><span class="db-stat-n">${stats.counts?.active_days||0}</span><span class="db-stat-l">Active days</span></div><div class="db-stat"><span class="db-stat-n">${stats.db_size_kb||0}KB</span><span class="db-stat-l">DB size</span></div><div class="db-stat"><span class="db-stat-n">${stats.last_updated?stats.last_updated.slice(11,16):'--'}</span><span class="db-stat-l">Last saved</span></div></div>`; });
  views.parent.innerHTML = `
    <div class="page-wrap">
      <div class="page-header"><h2>Parent View</h2><p class="subtitle">Tanusree's full progress at a glance</p></div>
      <div class="section-card db-status-card">
        <div class="section-head"><span class="eyebrow">Data storage</span><h3>Database status</h3></div>
        <div class="db-status-row">
          <div class="db-status-indicator ${connStatus.connected?"db-connected":"db-disconnected"}"><span class="db-dot"></span><span class="db-label">${connStatus.connected?connStatus.label:"localStorage (offline)"}</span></div>
          <span class="db-detail">${connStatus.detail}</span>
        </div>
        ${connStatus.connected?`<div id="db-stats-slot"><p style="font-size:12px;color:var(--ink3)">Loading stats...</p></div>`:`<div class="db-offline-msg">Can't reach the cloud right now — progress is being saved on this device and will sync once you're back online.</div>`}
      </div>
      <div class="section-card">
        <div class="section-head"><span class="eyebrow">Overview</span><h3>Mastery by topic</h3></div>
        <div class="mastery-list">
          ${topicsForCurrentGrade().map(t => { const m=getTopicMastery(state,t.id); return `<div class="mastery-row"><span class="mr-emoji">${t.emoji}</span><span class="mr-name">${t.title}${t.fromSchool?' 📋':''}</span><div class="mr-bar"><div class="mr-fill" style="width:${m}%"></div></div><span class="mr-pct">${m}%</span></div>`; }).join("")}
        </div>
      </div>
      ${misconceptions.length?`
      <div class="section-card">
        <div class="section-head"><span class="eyebrow">Watch these</span><h3>Recurring mistakes</h3></div>
        ${misconceptions.map(m=>`<div class="misc-row"><span class="misc-label">${m.label}</span><span class="misc-count">${m.count}×</span></div>`).join("")}
      </div>`:""}
      <div class="section-card backup-card">
        <div class="section-head"><span class="eyebrow">Progress protection</span><h3>Backup & restore</h3></div>
        <div class="backup-status ${lastBackup?'backup-ok':'backup-warn'}">
          <span class="backup-status-icon">${lastBackup?"✓":"⚠️"}</span>
          <div><p class="backup-status-title">${lastBackup?"Last backup: "+formatBackupTime(lastBackup.timestamp):"No backup yet"}</p>
          <p class="backup-status-sub">${lastBackup?lastBackup.type==="auto"?"Auto-saved":"Manual export":"Back up now to protect Tanusree's progress"}</p></div>
        </div>
        <div class="backup-data-summary">
          <div class="bds-item"><span class="bds-num">${migration.attempts}</span><span class="bds-lbl">Attempts</span></div>
          <div class="bds-item"><span class="bds-num">${migration.skillHistoryTopics}</span><span class="bds-lbl">Topics</span></div>
          <div class="bds-item"><span class="bds-num">${migration.examRecords}</span><span class="bds-lbl">Exams</span></div>
          <div class="bds-item"><span class="bds-num">${migration.dailyActivityDays}</span><span class="bds-lbl">Active days</span></div>
        </div>
        <div class="backup-actions">
          <button class="btn-primary btn-small" id="export-btn" data-action="export-progress">📥 Export progress</button>
          <button class="btn-secondary btn-small" id="import-btn" data-action="import-progress">📂 Restore from backup</button>
        </div>
        <div id="import-result"></div>
      </div>
    </div>`;
}

// ── Session tracking ───────────────────────────────────────────
function trackSession() {
  setInterval(() => scheduleSave(state), 60000);
  window.addEventListener("beforeunload", () => {
    const mins = Math.round((Date.now()-sessionStart)/60000);
    if (mins>0) { const today=new Date().toISOString().slice(0,10); state.dailyActivity=state.dailyActivity||{}; state.dailyActivity[today]=(state.dailyActivity[today]||0)+mins; forceSave(state); }
    autoBackupIfDue(state);
  });
}
