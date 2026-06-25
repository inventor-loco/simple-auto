/**
 * simple-auto — lead capture web app
 * ----------------------------------
 * Receives the landing-page email form, logs the lead to a Google Sheet,
 * auto-replies to the visitor with the details + a link to the sales page,
 * and notifies us.
 *
 * This file lives in the repo for version control, but it runs inside Google
 * Apps Script (script.google.com), bound to (or standalone with) a Sheet.
 *
 * ── Deploy ───────────────────────────────────────────────────────────────
 * 1. Create a Google Sheet (the lead log). Note its ID from the URL.
 * 2. Extensions → Apps Script (or a standalone script). Paste this file.
 * 3. Set the CONFIG values below (SHEET_ID, NOTIFY_TO, DETAILS_URL).
 * 4. Deploy → New deployment → type "Web app":
 *      - Execute as: Me (vmat.icaza@gmail.com)
 *      - Who has access: Anyone
 * 5. Copy the /exec URL and paste it into index.html as
 *      window.SA_LEAD_ENDPOINT = '...'.
 *
 * Notes:
 *  - The landing form posts with mode:'no-cors' (fire-and-forget), so the
 *    response body is never read by the browser — we don't need CORS headers.
 *  - MailApp sends from the deploying account (your Gmail) for now.
 */

var CONFIG = {
  SHEET_ID:    'PASTE_SHEET_ID_HERE',
  SHEET_NAME:  'Leads',
  NOTIFY_TO:   'vmat.icaza@gmail.com',          // internal notification
  REPLY_FROM:  'simple-auto',                    // display name on the auto-reply
  DETAILS_URL: 'https://REPLACE_WITH_SITE/details.html'
};

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};
    var email = String(p.email || '').trim();
    var lang  = (String(p.lang || 'en').toLowerCase() === 'es') ? 'es' : 'en';

    if (!email || email.indexOf('@') === -1) {
      return _json({ ok: false, error: 'invalid email' });
    }

    _appendLead(email, lang);
    _sendAutoReply(email, lang);
    _notify(email, lang);

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

/** Lightweight health check when the URL is opened in a browser. */
function doGet() {
  return _json({ ok: true, service: 'simple-auto lead capture' });
}

function _appendLead(email, lang) {
  var ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['timestamp', 'email', 'lang']);
  }
  sheet.appendRow([new Date(), email, lang]);
}

function _sendAutoReply(email, lang) {
  var subject = (lang === 'es')
    ? 'simple-auto — los detalles de tu sitio web'
    : 'simple-auto — the details for your website';

  var body = (lang === 'es')
    ? 'Gracias por tu interés en simple-auto.\n\n' +
      'Construimos tu sitio web contigo en una sesión, y queda publicado el mismo día. ' +
      'Un solo pago, sin suscripciones obligatorias.\n\n' +
      'Aquí tienes todos los detalles y cómo reservar tu plaza:\n' +
      CONFIG.DETAILS_URL + '\n\n' +
      '— simple-auto'
    : 'Thanks for your interest in simple-auto.\n\n' +
      'We build your website together in one session, and it goes live the same day. ' +
      'One payment, no mandatory subscriptions.\n\n' +
      'Here are all the details and how to book your spot:\n' +
      CONFIG.DETAILS_URL + '\n\n' +
      '— simple-auto';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body,
    name: CONFIG.REPLY_FROM
  });
}

function _notify(email, lang) {
  MailApp.sendEmail({
    to: CONFIG.NOTIFY_TO,
    subject: 'New simple-auto lead: ' + email,
    body: 'Email: ' + email + '\nLang: ' + lang + '\nTime: ' + new Date()
  });
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
