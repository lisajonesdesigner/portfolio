
// quizzes
document.addEventListener('click',function(e){
  var b=e.target.closest('.quiz-opt');
  if(b){
    var box=b.closest('.quiz-box');if(box.dataset.done)return;box.dataset.done=1;
    var fb=box.querySelector('.quiz-feedback');
    box.querySelectorAll('.quiz-opt').forEach(function(o){
      if(o.dataset.ok==='1')o.classList.add('correct');
      o.style.cursor='default';
    });
    if(b.dataset.ok==='1'){fb.textContent='Correct!';fb.style.color='#2e7d32';}
    else{b.classList.add('wrong');fb.textContent='Not quite \u2014 the correct answer is highlighted.';fb.style.color='#b23b3b';}
    fb.hidden=false;
    return;
  }
  // accordions
  var h=e.target.closest('.acc>header');
  if(h){h.parentElement.classList.toggle('open');return;}
  var ex=e.target.closest('[data-expand]');
  if(ex){
    e.preventDefault();
    var open=ex.dataset.expand==='1';
    document.querySelectorAll('.acc').forEach(function(a){a.classList.toggle('open',open);});
  }
});
// open accordion when arriving via #anchor
function openFromHash(){
  if(!location.hash)return;
  var el=document.querySelector(location.hash.replace(/([.:])/g,'\\$1'));
  if(el&&el.classList.contains('acc')){el.classList.add('open');el.scrollIntoView();}
}
window.addEventListener('hashchange',openFromHash);
document.addEventListener('DOMContentLoaded',openFromHash);
