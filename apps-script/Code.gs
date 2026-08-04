/**
 * simple-auto — lead capture web app
 * ----------------------------------
 * Receives the contact forms from every page of the site, logs the lead to a
 * Google Sheet, auto-replies to the visitor and notifies us.
 *
 * This file lives in the repo for version control, but it runs inside Google
 * Apps Script (script.google.com), bound to (or standalone with) a Sheet.
 *
 * ── Deploy ───────────────────────────────────────────────────────────────
 * 1. Create a Google Sheet (the lead log). Note its ID from the URL.
 * 2. Extensions → Apps Script (or a standalone script). Paste this file.
 * 3. Set the CONFIG values below (SHEET_ID, NOTIFY_TO, SITE_URL).
 * 4. Deploy → New deployment → type "Web app":
 *      - Execute as: Me (vmat.icaza@gmail.com)
 *      - Who has access: Anyone
 * 5. Copy the /exec URL and paste it into the pages as
 *      window.SA_LEAD_ENDPOINT = '...'.
 *
 * Notes:
 *  - The forms post with mode:'no-cors' (fire-and-forget), so the response
 *    body is never read by the browser — we don't need CORS headers.
 *  - MailApp sends from the deploying account (your Gmail) for now.
 *  - The auto-reply deliberately quotes no price and promises no commercial
 *    terms: pricing is agreed on the call. Keep it that way.
 */

var CONFIG = {
  SHEET_ID:    'PASTE_SHEET_ID_HERE',
  SHEET_NAME:  'Leads',
  NOTIFY_TO:   'vmat.icaza@gmail.com',          // internal notification
  REPLY_FROM:  'simpleauto',                     // display name on the auto-reply
  SITE_URL:    'https://simpleauto.tech/catalog.html'
};

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};
    var email   = String(p.email || '').trim();
    var lang    = (String(p.lang || 'en').toLowerCase() === 'es') ? 'es' : 'en';
    var message = String(p.message || '').trim();   // which form, plus any text the visitor typed
    var page    = String(p.page || '').trim();      // which page it came from

    if (!email || email.indexOf('@') === -1) {
      return _json({ ok: false, error: 'invalid email' });
    }

    _appendLead(email, lang, message, page);
    _sendAutoReply(email, lang);
    _notify(email, lang, message, page);

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

/** Lightweight health check when the URL is opened in a browser. */
function doGet() {
  return _json({ ok: true, service: 'simple-auto lead capture' });
}

function _appendLead(email, lang, message, page) {
  var ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['timestamp', 'email', 'lang', 'page', 'message']);
  }
  sheet.appendRow([new Date(), email, lang, page, message]);
}

function _sendAutoReply(email, lang) {
  var subject = (lang === 'es')
    ? 'simpleauto · hemos recibido tu mensaje'
    : 'simpleauto · we got your message';

  var body = (lang === 'es')
    ? 'Gracias por escribirnos.\n\n' +
      'Hemos recibido tu mensaje y te respondemos en un día laborable.\n\n' +
      'El siguiente paso es una llamada gratuita de 30 minutos: miramos cómo ' +
      'consigues clientes y cómo entregas tu servicio hoy, y te decimos qué ' +
      'automatizaríamos y qué no.\n\n' +
      'Mientras tanto, aquí está nuestro catálogo:\n' +
      CONFIG.SITE_URL + '\n\n' +
      'El equipo de simpleauto'
    : 'Thanks for writing to us.\n\n' +
      'We got your message and will reply within one working day.\n\n' +
      'The next step is a free 30-minute call: we look at how you win clients ' +
      'and how you deliver today, and tell you what we would automate and what ' +
      'we wouldn\'t.\n\n' +
      'In the meantime, here is our catalog:\n' +
      CONFIG.SITE_URL + '\n\n' +
      'The simpleauto team';

  MailApp.sendEmail(email, subject, body, { name: CONFIG.REPLY_FROM });
}

function _notify(email, lang, message, page) {
  MailApp.sendEmail({
    to: CONFIG.NOTIFY_TO,
    subject: 'New simpleauto lead: ' + email + (page ? ' (' + page + ')' : ''),
    body: 'Email: '   + email +
          '\nLang: '  + lang +
          '\nPage: '  + (page || '(not sent)') +
          '\nTime: '  + new Date() +
          '\n\n'      + (message || '(no message)')
  });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
