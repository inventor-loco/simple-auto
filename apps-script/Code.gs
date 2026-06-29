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
  DETAILS_URL: 'https://REPLACE_WITH_SITE/details.html',
  // Drive file ID of the compiled precontract PDF (legal/precontrato.pdf).
  // Upload the PDF to Drive once, then paste its ID here. Leave '' to skip the
  // attachment and fall back to a link-only auto-reply.
  PRECONTRACT_FILE_ID: 'PASTE_PRECONTRACT_PDF_DRIVE_ID_HERE',
  PRECONTRACT_NAME:    'simple-auto-precontrato.pdf'  // filename shown to the lead
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
    ? 'simple-auto — tu precontrato y los detalles de tu sesión'
    : 'simple-auto — your pre-contract and session details';

  var body = (lang === 'es')
    ? 'Gracias por tu interés en simple-auto.\n\n' +
      'En una sesión privada lanzamos tu sitio web contigo y queda publicado el ' +
      'mismo día. Un solo pago de 99 EUR (precio de lanzamiento 49,50 EUR, 50% de ' +
      'descuento hasta el 1 de agosto de 2026). Sin suscripciones obligatorias.\n\n' +
      'Adjuntamos el precontrato con todas las condiciones del servicio para que lo ' +
      'revises con calma.\n\n' +
      'Todos los detalles y cómo reservar tu sesión:\n' +
      CONFIG.DETAILS_URL + '\n\n' +
      '— simple-auto'
    : 'Thanks for your interest in simple-auto.\n\n' +
      'In one private session we launch your website together and it goes live the ' +
      'same day. A single payment of 99 EUR (launch price 49.50 EUR, 50% off until ' +
      '1 August 2026). No mandatory subscriptions.\n\n' +
      'Attached is the pre-contract with the full service terms so you can review ' +
      'them at your own pace.\n\n' +
      'All the details and how to book your session:\n' +
      CONFIG.DETAILS_URL + '\n\n' +
      '— simple-auto';

  var options = { name: CONFIG.REPLY_FROM };

  // Attach the precontract PDF from Drive, if configured.
  var fileId = CONFIG.PRECONTRACT_FILE_ID;
  if (fileId && fileId.indexOf('PASTE_') === -1) {
    try {
      var blob = DriveApp.getFileById(fileId).getBlob().copyBlob();
      blob.setName(CONFIG.PRECONTRACT_NAME);
      options.attachments = [blob];
    } catch (err) {
      // If the file can't be read, fall back to a link-only reply rather than failing.
    }
  }

  MailApp.sendEmail(email, subject, body, options);
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
