// Rolagem suave para links de âncora
(function(){
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Ação do botão Baixar App
  const downloadBtn = document.querySelector('[data-action="download-app"]');
  if(downloadBtn){
    downloadBtn.addEventListener('click', function(e){
      e.preventDefault();
      // TODO: substitua esta URL pela URL real da loja (Play Store, etc.)
      const urlLoja = 'https://play.google.com/store';
      window.open(urlLoja, '_blank');
    });
  }
})();

// IntersectionObserver: animar sections quando entram em view
(function(){
  if(!('IntersectionObserver' in window)) return;

  // Observer para cada elemento .reveal
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        el.classList.add('in-view');
        // garantir que a section receba a classe in-view também (ativa o divisor)
        const section = el.closest('section');
        if(section) section.classList.add('in-view');
        obs.unobserve(el);
      }
    });
  }, {threshold: 0.15, rootMargin: '0px 0px -10% 0px'});

  // Encontrar elementos candidatos e configurar delays por ordem dentro da section
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const candidates = section.querySelectorAll('h1,h2,h3,p,article,header,aside,.benefit-card,.buyers-card,.sellers-card,.journey-steps');
    candidates.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${i * 80}ms`);
      revealObserver.observe(el);
    });
  });
})();
