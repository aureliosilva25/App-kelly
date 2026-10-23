const STORES=["clientes","agenda","servicos","protocolos","financeiro","atendimentos","fotos"];let db;
function dbInit(){return new Promise((ok,no)=>{let r=indexedDB.open("KellyPodologiaV2",1);r.onupgradeneeded=e=>{let d=e.target.result;STORES.forEach(s=>{if(!d.objectStoreNames.contains(s))d.createObjectStore(s,{keyPath:"id",autoIncrement:true})})};r.onsuccess=e=>{db=e.target.result;ok()};r.onerror=()=>no(r.error)})}
const getAll=s=>new Promise((ok,no)=>{let r=db.transaction(s).objectStore(s).getAll();r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
const addRow=(s,o)=>new Promise((ok,no)=>{let r=db.transaction(s,"readwrite").objectStore(s).add(o);r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
const putRow=(s,o)=>new Promise((ok,no)=>{let r=db.transaction(s,"readwrite").objectStore(s).put(o);r.onsuccess=()=>ok();r.onerror=()=>no(r.error)});
const delRow=(s,id)=>new Promise((ok,no)=>{let r=db.transaction(s,"readwrite").objectStore(s).delete(id);r.onsuccess=()=>ok();r.onerror=()=>no(r.error)});
const clearStore=s=>new Promise((ok,no)=>{let r=db.transaction(s,"readwrite").objectStore(s).clear();r.onsuccess=()=>ok();r.onerror=()=>no(r.error)});