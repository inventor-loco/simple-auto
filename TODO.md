# TODO

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
