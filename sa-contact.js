/* sa-contact.js — injects a lead-capture contact card wired to window.SA_LEAD_ENDPOINT.
   Configure per page with data attributes on the script tag:
     data-page   → value sent as the `page` field (e.g. "crm.html · contact")
     data-msg    → value sent as the `message` field
     data-title-en / data-title-es  → optional card headline override
     data-sub-en / data-sub-es      → optional card subtitle override
     data-textarea="on"             → show a free-text message field
   Can be included more than once per page: all state is scoped to the injected card. */
(function () {
  var script = document.currentScript;
  var d = script.dataset;

  var page  = d.page || (location.pathname.split('/').pop() || 'index.html');
  var msg   = d.msg  || 'Contact form submission';
  var textarea = d.textarea === 'on';

  var t = {
    en: {
      kicker:  'contact',
      title:   d.titleEn || 'Tell us about your project',
      sub:     d.subEn   || 'Leave your email. We reply within one working day.',
      msgPh:   'What would you like to automate? (optional)',
      btn:     'Send',
      sending: 'Sending...',
      privacy: 'I agree to the <a href="privacy.html" target="_blank" rel="noopener">privacy policy</a>',
      tyLabel: 'sent',
      tyTitle: 'Thanks. We got it.',
      tySub:   'We reply within one working day.'
    },
    es: {
      kicker:  'contacto',
      title:   d.titleEs || 'Cuéntanos tu proyecto',
      sub:     d.subEs   || 'Déjanos tu correo. Respondemos en un día laborable.',
      msgPh:   '¿Qué te gustaría automatizar? (opcional)',
      btn:     'Enviar',
      sending: 'Enviando...',
      privacy: 'Acepto la <a href="privacy.html" target="_blank" rel="noopener">política de privacidad</a>',
      tyLabel: 'enviado',
      tyTitle: 'Gracias, lo hemos recibido.',
      tySub:   'Respondemos en un día laborable.'
    }
  };

  function pair(cls, key, tag) {
    tag = tag || 'span';
    return '<' + tag + ' data-lang="en"' + (cls ? ' class="' + cls + '"' : '') + '>' + t.en[key] + '</' + tag + '>' +
           '<' + tag + ' data-lang="es"' + (cls ? ' class="' + cls + '"' : '') + '>' + t.es[key] + '</' + tag + '>';
  }

  var html = '<section class="sa-contact">' +
    '<div class="card reveal">' +
      '<div class="magnet-kicker">' + pair('', 'kicker') + '</div>' +
      '<h3 class="magnet-title">' + pair('', 'title') + '</h3>' +
      '<p class="magnet-sub">' + pair('', 'sub') + '</p>' +
      '<div class="email-wrap" data-role="form">' +
        '<input class="email-input" type="email" data-role="email" autocomplete="email" placeholder="tu@correo.com" />' +
        (textarea
          ? '<textarea class="msg-input" data-role="usermsg" data-ph-en="' + t.en.msgPh + '" data-ph-es="' + t.es.msgPh + '"></textarea>'
          : '') +
        '<div class="privacy-checkbox">' +
          '<input type="checkbox" data-role="consent" />' +
          '<label>' + pair('', 'privacy') + '</label>' +
        '</div>' +
        '<button class="cta-btn" data-role="submit">' + pair('', 'btn') + '</button>' +
      '</div>' +
      '<div class="thankyou" data-role="thankyou">' +
        '<div class="thankyou-label">' + pair('', 'tyLabel') + '</div>' +
        '<div class="thankyou-title">' + pair('', 'tyTitle') + '</div>' +
        '<div class="thankyou-sub">' + pair('', 'tySub') + '</div>' +
      '</div>' +
    '</div>' +
  '</section>';

  script.insertAdjacentHTML('beforebegin', html);

  var root     = script.previousElementSibling;
  var form     = root.querySelector('[data-role="form"]');
  var emailEl  = root.querySelector('[data-role="email"]');
  var userMsg  = root.querySelector('[data-role="usermsg"]');
  var consent  = root.querySelector('[data-role="consent"]');
  var btn      = root.querySelector('[data-role="submit"]');
  var thankyou = root.querySelector('[data-role="thankyou"]');

  // The privacy label wraps the checkbox by proximity, not by id — wire it manually.
  root.querySelector('.privacy-checkbox label').addEventListener('click', function (e) {
    if (e.target.tagName !== 'A') consent.checked = !consent.checked;
  });

  function flash(el) {
    el.style.borderColor = '#ff6b6b';
    el.focus();
    setTimeout(function () { el.style.borderColor = ''; }, 1200);
  }

  function submit() {
    var lang = SA.getLang();

    if (!consent.checked) { flash(consent); return; }

    var email = emailEl.value.trim();
    if (!email || email.indexOf('@') === -1) { flash(emailEl); return; }
    SA.saveLead(email);

    btn.disabled = true;
    btn.innerHTML = '<span>' + t[lang].sending + '</span>';

    var body = new FormData();
    body.append('email', email);
    body.append('lang', lang);
    body.append('message', userMsg && userMsg.value.trim() ? msg + ' | ' + userMsg.value.trim() : msg);
    body.append('page', page);

    fetch(window.SA_LEAD_ENDPOINT, { method: 'POST', mode: 'no-cors', body: body })
      .catch(function () {})
      .then(function () {
        form.style.display = 'none';
        thankyou.style.display = 'block';
      });
  }

  btn.addEventListener('click', submit);
  emailEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submit();
  });

  // The textarea placeholder can't use data-lang spans — swap it on language change.
  if (userMsg) {
    var applyPh = function () { userMsg.placeholder = userMsg.dataset['ph' + (SA.getLang() === 'en' ? 'En' : 'Es')]; };
    applyPh();
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { setTimeout(applyPh, 0); });
    });
  }
})();
