# Precontrato — simple-auto

Legally-binding pre-contract for the unified **private session** service
(99 € · launch price 49.50 € until 1 Aug 2026). Spanish is the governing version
(Spain / Las Palmas jurisdiction).

## Files
- `precontrato.tex` — source. Edit **only** the `DATOS RELLENABLES` block.
- `precontrato.pdf` — compiled output.

## Fill it
Edit the `\newcommand` block at the top of `precontrato.tex`:

| Variable | Meaning |
|---|---|
| `\provNombre`, `\provNif`, `\provDomicilio` | **Your fiscal data — currently MOCKED.** Replace with real values. |
| `\cliNombre`, `\cliNif`, `\cliDomicilio`, `\cliEmail` | Client data (filled per lead) |
| `\precioBase`, `\precioLanz`, `\lanzHasta` | Pricing + launch-discount deadline |
| `\fechaContrato`, `\fechaSesion` | Acceptance date / agreed session date |

## Compile
```sh
pdflatex precontrato.tex   # run twice for page references
```

## TODO before going live
- [ ] Replace mocked provider fiscal data (`\prov*`).
- [ ] Decide email-delivery mechanism (see chat — static signed PDF vs. per-lead generated).
