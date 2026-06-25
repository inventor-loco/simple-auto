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
- [ ] **Booking** — in `booking.html` set `window.SA_BOOKING_URL` to the Google
      Appointment Schedule link (shows a setup placeholder until then).
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

- [ ] **Damanna** — save a screenshot as `img/reviews/damanna.png`
      (site: https://www.damanna.co). Until then the card uses the Microlink
      loader fallback, which currently shows "preview unavailable".
- [ ] **Luce d'Estate** — save a screenshot as `img/reviews/lucedestate.png`
      (site: https://luce-destate.vercel.app). Same fallback behaviour.

Captured and bundled already: `psicologiabajocoste.png`, `excelqkd.png`.

Suggested size: ~800×480, PNG. The thumbnail crops to the top of the image.
