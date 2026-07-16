import { curriculum } from "./curriculum.js";
import { bankKeyForTopic } from "./curriculum.js";
import { questionBank } from "./questionbank.js";
import { getSkillMastery, getTopicMastery } from "./state.js";

const SESSION_KEY = "sparky-seen";

export function recordQuestionSeen(qId) {
  const seen = JSON.parse(sessionStorage.getItem(SESSION_KEY)||"[]");
  if(!seen.includes(qId)){ seen.push(qId); sessionStorage.setItem(SESSION_KEY,JSON.stringify(seen)); }
}

export function buildPracticeQueue(state, topicId, count=6) {
  const key = bankKeyForTopic[topicId];
  if(!key || !questionBank[key]) return [];
  const all = questionBank[key];
  const seen = JSON.parse(sessionStorage.getItem(SESSION_KEY)||"[]");
  const mastery = getTopicMastery(state, topicId);
  
  const unseen = all.filter(q=>!seen.includes(q.id));
  const pool = unseen.length >= count ? unseen : all;
  
  const weak = getWeakSkillIds(state, topicId);
  const sorted = [...pool].sort((a,b) => {
    const aWeak = weak.includes(a.skill) ? 0 : 1;
    const bWeak = weak.includes(b.skill) ? 0 : 1;
    if(aWeak !== bWeak) return aWeak - bWeak;
    const tierOrder = {easy:0,medium:1,hard:2};
    const diff = mastery < 40 ? "easy" : mastery < 70 ? "medium" : "hard";
    const aDiff = Math.abs(tierOrder[a.tier]-tierOrder[diff]);
    const bDiff = Math.abs(tierOrder[b.tier]-tierOrder[diff]);
    return aDiff - bDiff;
  });
  
  return sorted.slice(0, count);
}

function getWeakSkillIds(state, topicId) {
  const t = curriculum.topics.find(x=>x.id===topicId);
  if(!t) return [];
  const skills = [];
  t.lessons.forEach(l=>l.practice.forEach(q=>{ if(!skills.includes(q.skill)) skills.push(q.skill); }));
  return skills.filter(sk => { const m = getSkillMastery(state,topicId,sk); return m===null||m<65; });
}

export function getQuestionBankStats(topicId) {
  const key = bankKeyForTopic[topicId];
  if(!key||!questionBank[key]) return null;
  const qs = questionBank[key];
  return { total:qs.length, easy:qs.filter(q=>q.tier==="easy").length, medium:qs.filter(q=>q.tier==="medium").length, hard:qs.filter(q=>q.tier==="hard").length };
}
