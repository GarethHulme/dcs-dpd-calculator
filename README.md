# DCS Logistics × DPD Calculator

Static, single-file calculator that compares **DCS site stop-rate earnings** against the **DPD sliding-scale rate**, with weekly projections, NMW driver-pay checks, and a live UK diesel **fuel cost / PPM** calculation.

## Running it

Open `index.html` in any modern browser. No server, no build step, no dependencies.

## Live diesel price

On every page load the calculator fetches the current UK average diesel pump price from a single fixed source:

- Source page: <https://www.globalpetrolprices.com/United-Kingdom/diesel_prices/>
- Fetched via a CORS-friendly read-through proxy (`r.jina.ai`) because the source page does not send CORS headers, so a direct browser fetch would be blocked.

The pill next to the **Diesel price** field shows status:

| Pill | Meaning |
| --- | --- |
| `live · DD/MM/YYYY` (green) | Successfully fetched; date is the source's last-update date |
| `cached · DD/MM/YYYY` (amber) | Fetch failed this load; using the last successful live value |
| `default` (amber) | First load and fetch failed; using the built-in fallback of 188.26p/L |
| `manual override` | User edited the field; auto-fetch suppressed. Click the pill to clear and re-enable live updates |

## Inputs

- **Date / data set** — informational label, also used in the CSV export
- **Baked NMW / NLW hourly rate** — fixed at £12.71 (UK NMW reference)
- **DPD matrix lookup** — how to map non-exact stops/miles values to the DPD bands (round up / nearest / round down / exact only)
- **Operating days / week** — multiplier for the weekly projection (default 5)
- **Diesel price (p/L)** — auto-populated from the live source; manually editable
- **Average MPG** — default 38

Per site row: `No. routes`, `Stops / route`, `Miles / route`, `DCS current static stop rate`, `Driver duty time (hrs)`.

## Formulae

- DCS static earnings = `routes × stops/route × DCS static stop rate`
- DPD sliding earnings = `routes × stops/route × DPD matrix rate`
- NMW required pay / route = `duty hours × NMW hourly rate`
- Driver rate from NMW = `NMW required pay per route ÷ stops/route`
- Fuel cost / route = `miles ÷ MPG × 4.546 × (diesel price ÷ 100)`
- PPM (pence / mile) = `(fuel cost / route) ÷ miles × 100`

## Persistence

All inputs (and the diesel price/source status) are saved to `localStorage` between sessions. In environments where `localStorage` is blocked (e.g. inside the Perplexity Computer preview iframe), the calculator falls back to in-memory state for that session.

## Files

- `index.html` — the entire application (HTML, CSS, JS, embedded DCS logo as base64)
- `README.md` — this file
- `README.txt` — original short README
