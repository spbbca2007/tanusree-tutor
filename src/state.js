import { curriculum } from "./curriculum.js";
const STORAGE_KEY = "tanusree-tutor-v1";
const WINDOW_SIZE = 10;
export function defaultState() {
  return { stars:0, streak:0, lastActiveDate:null, hintCount:0, skillHistory:{}, stageVisits:{}, redoHistory:{}, attempts:[], examRecords:[], dailyActivity:{}, currentGrade:6 };
}

// Topics for a given grade (6 or 7). If grade is omitted, returns all topics
// (preserves old behaviour for any caller that doesn't care about grade).
function topicsFor(grade) {
  return grade ? curriculum.topics.filter(t => t.grade === grade) : curriculum.topics;
}
export function loadState() {
  try { const r=localStorage.getItem(STORAGE_KEY); if(!r) return defaultState(); return {...defaultState(),...JSON.parse(r)}; } catch { return defaultState(); }
}
export function saveState(s) { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(s)); } catch(e) { console.warn(e); } }
export function recordStageVisit(s,tId,lId,stage) {
  if(!s.stageVisits) s.stageVisits={};
  if(!s.stageVisits[tId]) s.stageVisits[tId]={};
  if(!s.stageVisits[tId][lId]) s.stageVisits[tId][lId]={};
  if(!s.stageVisits[tId][lId][stage]) s.stageVisits[tId][lId][stage]=new Date().toISOString();
  return s;
}
export function recordAttempt(s,{topicId,lessonId,questionId,skill,correct,misconception}) {
  const now=new Date().toISOString();
  if(!s.skillHistory[topicId]) s.skillHistory[topicId]={};
  if(!s.skillHistory[topicId][skill]) s.skillHistory[topicId][skill]=[];
  s.skillHistory[topicId][skill].push({correct,timestamp:now});
  if(s.skillHistory[topicId][skill].length>WINDOW_SIZE) s.skillHistory[topicId][skill].shift();
  s.attempts.push({topicId,lessonId,questionId,skill,correct,misconception,timestamp:now});
  if(s.attempts.length>100) s.attempts.shift();
  if(correct) { s.stars+=5; const today=now.slice(0,10); if(s.lastActiveDate!==today) { const yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10); s.streak=s.lastActiveDate===yesterday?s.streak+1:1; s.lastActiveDate=today; } }
  return s;
}
export function getSkillMastery(s,tId,skill) { const h=s.skillHistory?.[tId]?.[skill]; if(!h||!h.length) return null; return Math.round(h.filter(x=>x.correct).length/h.length*100); }
export function getTopicMastery(s,tId) {
  const t=curriculum.topics.find(x=>x.id===tId); if(!t) return 0;
  const skills=[]; t.lessons.forEach(l=>l.practice.forEach(q=>{ if(!skills.includes(q.skill)) skills.push(q.skill); }));
  if(!skills.length) return 0;
  const m=skills.map(sk=>getSkillMastery(s,tId,sk)).filter(x=>x!==null);
  if(!m.length) return 0;
  return Math.round(m.reduce((a,b)=>a+b,0)/m.length);
}
export function getOverallMastery(s,grade) { const m=topicsFor(grade).map(t=>getTopicMastery(s,t.id)); const nz=m.filter(x=>x>0); if(!nz.length) return 0; return Math.round(nz.reduce((a,b)=>a+b,0)/nz.length); }
export function getTopicStatus(s,tId) { const m=getTopicMastery(s,tId); const has=s.skillHistory?.[tId]&&Object.keys(s.skillHistory[tId]).length>0; if(!has) return "not-started"; if(m>=80) return "completed"; return "in-progress"; }
export function getProgressOverview(s,grade) {
  let ns=0,ip=0,done=0;
  const topics=topicsFor(grade);
  const details=topics.map(t=>{ const st=getTopicStatus(s,t.id); const m=getTopicMastery(s,t.id); if(st==="not-started")ns++; else if(st==="completed")done++; else ip++; const attempts=(s.attempts||[]).filter(a=>a.topicId===t.id); return {topic:t,status:st,mastery:m,totalAttempts:attempts.length,correctAttempts:attempts.filter(a=>a.correct).length}; });
  return {summary:{notStarted:ns,inProgress:ip,completed:done,total:topics.length},details};
}
export function redoTopic(s,tId) { if(s.skillHistory?.[tId]) delete s.skillHistory[tId]; if(s.stageVisits?.[tId]) delete s.stageVisits[tId]; if(!s.redoHistory) s.redoHistory={}; if(!s.redoHistory[tId]) s.redoHistory[tId]={}; s.redoHistory[tId].count=(s.redoHistory[tId].count||0)+1; s.redoHistory[tId].lastAt=new Date().toISOString(); return s; }
export function getWeakSkills(s,tId,limit=3) { const t=curriculum.topics.find(x=>x.id===tId); if(!t) return []; const skills=[]; t.lessons.forEach(l=>l.practice.forEach(q=>{ if(!skills.find(x=>x.skill===q.skill)) skills.push({skill:q.skill,label:q.skill.replaceAll("-"," ")}); })); return skills.map(sk=>({...sk,mastery:getSkillMastery(s,tId,sk.skill)??-1})).filter(sk=>sk.mastery<70).sort((a,b)=>a.mastery-b.mastery).slice(0,limit); }
export function getMostRecentMisconceptions(s,limit=4) { const c={}; (s.attempts||[]).filter(a=>!a.correct&&a.misconception).forEach(a=>{c[a.misconception]=(c[a.misconception]||0)+1;}); return Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,limit).map(([k,n])=>({key:k,label:k.replaceAll("-"," "),count:n})); }
export function getRecommendation(s,grade) { const sc=topicsFor(grade).map(t=>({topic:t,mastery:getTopicMastery(s,t.id),attempted:!!(s.skillHistory?.[t.id]&&Object.keys(s.skillHistory[t.id]).length>0)})); if(!sc.length) return null; const started=sc.filter(x=>x.attempted&&x.mastery<80); if(started.length){started.sort((a,b)=>a.mastery-b.mastery);return{topic:started[0].topic,reason:"Needs practice"};} const un=sc.filter(x=>!x.attempted); if(un.length) return{topic:un[0].topic,reason:"New topic"}; sc.sort((a,b)=>a.mastery-b.mastery); return{topic:sc[0].topic,reason:"Review"}; }
