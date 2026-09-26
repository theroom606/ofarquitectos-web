const filters=document.querySelectorAll('[data-filter]');
const rows=document.querySelectorAll('[data-category]');
function apply(button){
 filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 const f=button.dataset.filter;let count=0;
 rows.forEach(row=>{row.hidden=f!=='all'&&(f==='patagonia'?row.dataset.region!=='patagonia':row.dataset.category!==f);if(!row.hidden)count++;});
 document.querySelector('.archive-count').textContent=count+' '+(document.documentElement.lang==='en'?(count===1?'project':'projects'):(count===1?'proyecto':'proyectos'));
}
filters.forEach(button=>button.addEventListener('click',()=>{apply(button);history.replaceState(null,'',button.dataset.filter==='all'?location.pathname:'#'+button.dataset.filter);}));
const initial=location.hash&&document.querySelector('[data-filter="'+location.hash.slice(1)+'"]');
if(initial)apply(initial);
