// main js for site interactions
(function(){
  // nav toggle
  var toggle = document.querySelector('.nav-toggle');
  toggle && toggle.addEventListener('click', function(){
    document.body.classList.toggle('nav-open');
    var expanded = document.body.classList.contains('nav-open');
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // fade in on scroll
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },{threshold:0.1});
  document.querySelectorAll('.card, .section-head, .hero-copy').forEach(function(el){observer.observe(el)});

  // cookie banner
  if(!localStorage.getItem('cookie_accepted')){
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style = 'position:fixed;left:0;right:0;bottom:0;background:#071a3b;color:#fff;padding:14px;display:flex;justify-content:center;align-items:center;gap:12px;z-index:9999';
    banner.innerHTML = '<div style="max-width:1200px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center">We use cookies for analytics and referral tracking. <button id="accept-cookies" style="background:linear-gradient(90deg,#06b6d4,#3b82f6);border:0;padding:8px 12px;border-radius:999px;font-weight:700">Accept</button></div>';
    document.body.appendChild(banner);
    document.getElementById('accept-cookies').addEventListener('click',function(){localStorage.setItem('cookie_accepted','1'); banner.remove();});
  }

  // animated counters if any
  function animateCounter(el, end){var start=0;var duration=1500;var range=end-start;var startTime=null;function step(timestamp){if(!startTime)startTime=timestamp;var progress=Math.min((timestamp-startTime)/duration,1);el.textContent=Math.floor(start+range*progress);if(progress<1)window.requestAnimationFrame(step);}window.requestAnimationFrame(step)}
document.querySelectorAll('.stat-number').forEach(function(el){var val=parseInt(el.textContent.replace(/[^0-9]/g,''))||0;el.textContent='0';animateCounter(el,val)});
})();