// Small interaction and animation helpers (no dependencies)
(function(){
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('open');
      siteNav.style.display = siteNav.style.display === 'block' ? '' : 'block';
    });
  }

  // Smooth scroll for internal links
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });

  // IntersectionObserver reveal
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    },{threshold:0.12});
    reveals.forEach(r=>io.observe(r));
  } else {
    // fallback
    reveals.forEach(r=>r.classList.add('in-view'));
  }

  // Typing effect for hero subtitle
  const typingEl = document.getElementById('typing');
  const phrases = ['Fast. Accessible. Thoughtful.', 'Built for clarity.', 'Small, dependency-free.'];
  let pi=0, ci=0;
  function tick(){
    const p = phrases[pi];
    typingEl.textContent = p.slice(0,ci);
    ci++;
    if(ci<=p.length) setTimeout(tick, 42);
    else setTimeout(()=>{
      // pause then delete
      const del = setInterval(()=>{
        ci--;
        typingEl.textContent = p.slice(0,ci);
        if(ci<=0){clearInterval(del);pi=(pi+1)%phrases.length;setTimeout(tick,200);} }, 28);
    },1200);
  }
  if(typingEl) tick();

  // Set year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
})();
