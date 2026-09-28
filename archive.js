const filters=document.querySelectorAll('[data-filter]');
const rows=document.querySelectorAll('[data-category]');
const eras=document.querySelectorAll('.archive-era');
const search=document.querySelector('#archive-search');
const clear=document.querySelector('.archive-search-clear');
const empty=document.querySelector('.archive-empty');
const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
function matches(row,f){
 if(f==='all')return true;
 if(f==='patagonia')return row.dataset.region==='patagonia';
 if(f==='era-of')return row.dataset.era==='of';
 if(f==='era-pre')return row.dataset.era==='pre';
 return row.dataset.category===f;
}
function apply(button){
 filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 const f=button.dataset.filter;
 const terms=normalize(search.value.trim()).split(/\s+/).filter(Boolean);
 let count=0;
 rows.forEach(row=>{
  row.hidden=!matches(row,f)||!terms.every(term=>normalize(row.dataset.search).includes(term));
  if(!row.hidden)count++;
 });
 eras.forEach(era=>{
  let next=era.nextElementSibling;
  let hasResults=false;
  while(next&&!next.classList.contains('archive-era')){
   if(next.classList.contains('archive-row')&&!next.hidden)hasResults=true;
   next=next.nextElementSibling;
  }
  era.hidden=f!=='all'&&!['era-of','era-pre'].includes(f)||!hasResults;
 });
 document.querySelector('.archive-count').textContent=count+' '+(document.documentElement.lang==='en'?(count===1?'project':'projects'):(count===1?'proyecto':'proyectos'));
 empty.hidden=count!==0;
 clear.hidden=!search.value;
}
filters.forEach(button=>button.addEventListener('click',()=>{apply(button);history.replaceState(null,'',button.dataset.filter==='all'?location.pathname:'#'+button.dataset.filter);}));
const initial=location.hash&&document.querySelector('[data-filter="'+location.hash.slice(1)+'"]');
if(initial)apply(initial);
search.addEventListener('input',()=>apply(document.querySelector('[data-filter][aria-pressed="true"]')));
search.addEventListener('keydown',event=>{if(event.key==='Escape'&&search.value){search.value='';apply(document.querySelector('[data-filter][aria-pressed="true"]'));}});
clear.addEventListener('click',()=>{search.value='';apply(document.querySelector('[data-filter][aria-pressed="true"]'));search.focus();});
