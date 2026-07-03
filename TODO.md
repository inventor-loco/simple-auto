# TODO

Full plan: see `ROADMAP.md`. This file tracks the concrete placeholders that must
be filled before the funnel goes live.

## Funnel config to fill in

Code is built; these are the values to paste once the external accounts exist.

- [ ] **Lead form** — deploy `apps-script/Code.gs` (set `SHEET_ID`, `NOTIFY_TO`,
      `DETAILS_URL` inside it), then paste the `/exec` URL into `index.html`
      `window.SA_LEAD_ENDPOINT`. Until then the form works via the Formspree fallback.
- [ ] **PayPal** — in `details.html` set `window.SA_PAYPAL_BUSINESS` (PayPal email)
      and `window.SA_SITE_BASE` (deployed origin). Enable **Auto Return** in PayPal
      settings so checkout returns to `booking.html`.
- [x] **Booking** — `window.SA_BOOKING_URL` set in `booking.html`.
- [ ] **Intake form** — create the Google Form (idea questions + Drive upload) and set
      `window.SA_INTAKE_FORM_URL` in `booking.html`.
- [ ] Branded sender email (replacing `vmat.icaza@gmail.com`) — TBD.

## Social-proof screenshots

The review carousel in `index.html` loads a bundled local screenshot first
(`img/reviews/<name>.png`) and only falls back to a live Microlink render if the
local file is missing.

Two of the four sites are **live but cannot be captured by any server-side
screenshot service** (Microlink, thum.io, mShots) — Vercel/their host returns a
404 to datacenter IPs, and Damanna's animated dark hero renders as a black frame.
They display fine in a real browser.

- [x] **Damanna** — `img/reviews/damanna.png` done.
- [x] **Luce d'Estate** — `img/reviews/lucedestate.png` done.

Captured and bundled already: `psicologiabajocoste.png`, `excelqkd.png`.

## CTA — Email & Privacy Policy

Lead capture flow that emails details on privacy policy acceptance.

- [ ] **Privacy policy acceptance** — users must accept privacy policy in form before
      receiving details. Add checkbox validation to lead form.
- [ ] **Zoho email integration** — configure Zoho-hosted email account (app key
      stored in Apps Script env) as primary sender for details email. Handle rate
      limits gracefully.
- [ ] **Gmail fallback** — if Zoho hits rate limit, fall back to sending via Gmail
      account (`vmat.icaza@gmail.com`).
- [ ] **Details email template** — create email formatter in `apps-script/Code.gs`
      that:
  - Extracts details content from website HTML (`details.html`), so email
        automatically updates when page changes
  - Respects user's language selection from form (format in ES or EN)
  - Includes thank-you message + "here are your details" messaging
  - Links to booking page (`booking.html`)
  - Matches the visual design/layout of details page
- [ ] **Email trigger** — Apps Script sends details email immediately after form
      submission + privacy policy acceptance.

Suggested size: ~800×480, PNG. The thumbnail crops to the top of the image.
