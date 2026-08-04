/* sa-nav.js — injects the shared nav and owns the lang toggle, mobile nav and scroll-reveal.
   Include as the first script inside <body>, after the lang bootstrap. */
(function () {
  var links = [
    { href: 'index.html',   en: 'Home',     es: 'Inicio' },
    { href: 'about.html',   en: 'About us', es: 'Sobre nosotros' },
    { href: 'catalog.html', en: 'Catalog',  es: 'Catálogo' },
    { href: 'contact.html', en: 'Contact',  es: 'Contacto' }
  ];

  var current = location.pathname.split('/').pop() || 'index.html';
  // Product pages live under the catalog.
  var catalogPages = ['catalog.html', 'crm.html', 'erp.html', 'solar.html'];
  if (catalogPages.indexOf(current) !== -1) current = 'catalog.html';

  var items = links.map(function (l) {
    var active = (l.href === current) ? ' class="active"' : '';
    return '<a href="' + l.href + '"' + active + '>' +
             '<span data-lang="en">' + l.en + '</span>' +
             '<span data-lang="es">' + l.es + '</span>' +
           '</a>';
  }).join('');

  var html = '<nav>' +
    '<a class="nav-logo" href="index.html"><span class="logo-simple">simple</span><span class="logo-auto">auto</span></a>' +
    '<div class="nav-center">' + items + '</div>' +
    '<button class="hamburger" onclick="toggleMobileNav()"><span></span><span></span><span></span></button>' +
    '<div class="nav-controls">' +
      '<div class="lang-toggle">' +
        '<button class="lang-btn" onclick="setLang(\'en\')">EN</button>' +
        '<button class="lang-btn" onclick="setLang(\'es\')">ES</button>' +
      '</div>' +
    '</div>' +
  '</nav>';

  document.currentScript.insertAdjacentHTML('beforebegin', html);

  window.setLang = function (l) {
    window.saLang = l;
    document.body.classList.remove('lang-en', 'lang-es');
    document.body.classList.add('lang-' + l);
    document.documentElement.lang = l;
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.textContent === l.toUpperCase());
    });
    SA.saveLang(l);
  };

  window.toggleMobileNav = function () {
    document.querySelector('.nav-center').classList.toggle('mobile-open');
    document.querySelector('.hamburger').classList.toggle('active');
  };

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-center a').forEach(function (link) {
    link.addEventListener('click', function () {
      document.querySelector('.nav-center').classList.remove('mobile-open');
      document.querySelector('.hamburger').classList.remove('active');
    });
  });

  setLang(SA.getLang());

  // Scroll-reveal: staggers siblings that enter the viewport in the same frame.
  document.addEventListener('DOMContentLoaded', function () {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var pending = [];
    var flushScheduled = false;
    function flush() {
      pending.forEach(function (el, i) {
        el.style.transitionDelay = (i * 90) + 'ms';
        el.classList.add('in');
      });
      pending = [];
      flushScheduled = false;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          pending.push(entry.target);
          io.unobserve(entry.target);
        }
      });
      if (pending.length && !flushScheduled) {
        flushScheduled = true;
        requestAnimationFrame(flush);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  });
})();
