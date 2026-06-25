# simple-auto — Funnel Roadmap

## Context

The site started as a single themeable, bilingual landing page (`index.html`) with an
email-capture card and a social-proof carousel. We're turning it into a
**lead → sale → booking → intake funnel** for a paid website-building session.

Product scope is deliberately small and *reachable in one session with a free coding
agent* (Codex/Antigravity): a working landing page with good copy and a CTA wired via
**Web3Forms** — no complex workflows. The funnel itself is assembled from low-code SaaS
(PayPal, Google Appointment Schedule, Google Forms, Google Apps Script) plus static
pages in this repo.

**Funnel:** landing email → auto-email with details + redirect to `details.html`
(sales+pay) → PayPal → redirect to `booking.html` (open Google calendar, lock a date) →
confirmation + pre-class intake (idea questions + Drive upload).

**Locked decisions:** Payments = PayPal · Scheduling = Google Appointment Schedule ·
Pass = trust-based MVP (paid email is the key) · Lead form = Apps Script (Sheet +
auto-reply + notify) with Formspree `mkoydwkl` fallback · Sender = vmat.icaza@gmail.com
(until branded) · Details page = separate `details.html`.

## Status

| Phase | Item | State |
|------|------|-------|
| 0 | Theme + language persisted in `localStorage` across pages | ✅ done |
| 0 | Damanna & Luce d'Estate screenshots | ⬜ manual (see `TODO.md`) |
| 1 | `apps-script/Code.gs` lead handler (Sheet + auto-reply + notify) | ✅ built, ⬜ deploy |
| 1 | `index.html` form → Apps Script (no-cors) + Formspree fallback → redirect | ✅ done |
| 2 | `details.html` sales page + PayPal buttons | ✅ built, ⬜ set PayPal email/origin |
| 3 | Pass = PayPal auto-return to `booking.html` (trust-based) | ✅ by design |
| 4 | `booking.html` Google Appointment Schedule embed | ✅ built, ⬜ set booking URL |
| 5 | Google Form intake + Drive upload | ⬜ create + link |
| 6 | `RUNBOOK.md` session ops | ✅ done |

## External setup (outside the repo)
- Google Sheet for leads + Apps Script deployment (`/exec` URL).
- PayPal hosted account; enable **Auto Return** → `booking.html`.
- Google Appointment Schedule event(s) for group + private sessions.
- Google Form (intake) + Drive upload folder.
- Hosting (GitHub Pages or Vercel) + domain.

All the exact placeholders to paste are listed in `TODO.md`.

## Verification (per phase)
- **Phase 1:** submit a test email → row in Sheet, auto-reply received, notify received,
  redirect to `details.html`; disable Apps Script → Formspree fallback still records.
- **Phase 2:** PayPal sandbox purchase → lands on `booking.html`; theme/lang persist.
- **Phase 4:** book a slot → Google Calendar invite + Meet link arrive.
- **Phase 5:** submit intake form with a file → appears in Drive.
- End-to-end: walk the whole funnel once in sandbox before going live.

## Later (not MVP)
- Enforced pass: PayPal IPN/webhook → Apps Script generates a unique code, stored in the
  Sheet; `booking.html` validates it. Only if abuse appears.
- Branded sending address replacing the Gmail.
