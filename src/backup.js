const SCHEMA_VERSION = "1.0";
const BACKUP_LOG_KEY = "sparky-backup-log";
const AUTO_BACKUP_KEY = "sparky-last-auto-bak";

function buildPayload(state) {
  return { schema:SCHEMA_VERSION, student:{name:"Tanusree",grade:6,nextGrade:7}, exportedAt:new Date().toISOString(), exportedFrom:"sparky-local", appVersion:"2.0", state:JSON.parse(JSON.stringify(state)) };
}
function download(payload, filename) {
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download=filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}
function logBackup(filename, type) {
  const log=getBackupLog(); log.unshift({filename,type,timestamp:new Date().toISOString()});
  localStorage.setItem(BACKUP_LOG_KEY,JSON.stringify(log.slice(0,30)));
}
export function getBackupLog() { try { return JSON.parse(localStorage.getItem(BACKUP_LOG_KEY)||"[]"); } catch { return []; } }
export function exportProgress(state) {
  const payload=buildPayload(state);
  const filename=`tanusree-backup-${new Date().toISOString().slice(0,10)}.json`;
  download(payload,filename); logBackup(filename,"manual");
  return{filename,timestamp:payload.exportedAt};
}
export function autoBackupIfDue(state) {
  const today=new Date().toISOString().slice(0,10);
  if(localStorage.getItem(AUTO_BACKUP_KEY)===today) return false;
  if(!state.attempts||!state.attempts.length) return false;
  const payload=buildPayload(state);
  const filename=`tanusree-backup-${today}.json`;
  download(payload,filename); logBackup(filename,"auto");
  localStorage.setItem(AUTO_BACKUP_KEY,today);
  return{filename,timestamp:payload.exportedAt};
}
export function importProgress() {
  return new Promise((resolve,reject)=>{
    const input=document.createElement("input"); input.type="file"; input.accept=".json,application/json";
    input.addEventListener("change",()=>{
      const file=input.files[0]; if(!file){reject("No file selected.");return;}
      const reader=new FileReader();
      reader.onload=(e)=>{
        try {
          const parsed=JSON.parse(e.target.result);
          if(!parsed.schema||!parsed.state){reject("Invalid backup file.");return;}
          resolve({state:parsed.state,meta:{exportedAt:parsed.exportedAt,filename:file.name,student:parsed.student,schema:parsed.schema}});
        } catch(err){reject("Could not read file: "+err.message);}
      };
      reader.onerror=()=>reject("Could not read file.");
      reader.readAsText(file);
    });
    document.body.appendChild(input); input.click(); document.body.removeChild(input);
  });
}
export function getLastBackupInfo() { const log=getBackupLog(); return log.length?log[0]:null; }
export function formatBackupTime(iso) {
  if(!iso) return "Never";
  try { const d=new Date(iso); return d.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})+" at "+d.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}); } catch{return iso;}
}
export function getMigrationSummary(state) {
  return { attempts:(state.attempts||[]).length, skillHistoryTopics:Object.keys(state.skillHistory||{}).length, examRecords:(state.examRecords||[]).length, dailyActivityDays:Object.keys(state.dailyActivity||{}).length, stars:state.stars||0, streak:state.streak||0, backupCount:getBackupLog().length };
}
