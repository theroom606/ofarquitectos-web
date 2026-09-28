const filters=document.querySelectorAll('[data-filter]');
const rows=document.querySelectorAll('[data-category]');
const eras=document.querySelectorAll('.archive-era');
function matches(row,f){
 if(f==='all')return true;
 if(f==='patagonia')return row.dataset.region==='patagonia';
 if(f==='era-of')return row.dataset.era==='of';
 if(f==='era-pre')return row.dataset.era==='pre';
 return row.dataset.category===f;
}
function apply(button){
 filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 const f=button.dataset.filter;let count=0;
 rows.forEach(row=>{row.hidden=!matches(row,f);if(!row.hidden)count++;});
 eras.forEach(row=>{row.hidden=f!=='all'&&f!=='era-of'&&f!=='era-pre';});
 document.querySelector('.archive-count').textContent=count+' '+(document.documentElement.lang==='en'?(count===1?'project':'projects'):(count===1?'proyecto':'proyectos'));
}
filters.forEach(button=>button.addEventListener('click',()=>{apply(button);history.replaceState(null,'',button.dataset.filter==='all'?location.pathname:'#'+button.dataset.filter);}));
const initial=location.hash&&document.querySelector('[data-filter="'+location.hash.slice(1)+'"]');
if(initial)apply(initial);
