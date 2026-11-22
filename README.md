# Mitti × ParcelPath: Shared Operations Platform (prototype)

Clickable prototype built from `01_PRD`, `02_Tech_Spec` and `03_UIUX`. React 18 + Vite + TypeScript + Tailwind + Recharts + Zustand on the front end, and a small Express proxy for Gemini on the back end. All data is seeded and simulated. Jul–Oct monthly figures match the case exactly; the generator throws an error if they don't.

## Run locally

```bash
npm install
# .env already holds GEMINI_API_KEY (never commit it; .env is git-ignored). See .env.example for the other variables.
npm run data        # optional: regenerate public/data/*.json and server/saved_answers.json (seed 2026)
npm run dev         # API on :8787 + Vite on :5173 (Vite proxies /api)
```
Open http://localhost:5173. If your shell can't run `concurrently`, start the two servers in two terminals: `npx tsx watch server/index.ts` and `npx vite`.

Production: `npm run build && npm run check:key && npm start`. The single Node server serves `dist/` and `/api` from the same origin; this works on Render. On Vercel, set the same environment variables in the project settings.

## Deploy: GitHub → Vercel
The repo includes `vercel.json` and a prebuilt serverless API at `api/index.js` (the Express app bundled by `npm run build:api`; rerun it after changing `server/` or `shared/`). Vercel serves `dist/` as static files and sends `/api/*` to the function.

1. Create an empty repo on GitHub (no README), then in this folder:
   ```
   git init
   git add .
   git commit -m "Mitti x ParcelPath shared ops prototype"
   git branch -M main
   git remote add origin https://github.com/<you>/mitti-parcelpath-prototype.git
   git push -u origin main
   ```
   `.env` is git-ignored, so the key never leaves your machine. Check with `git status` before pushing.
2. On vercel.com: **Add New → Project → Import** the repo. Keep the defaults (`vercel.json` sets the build and output).
3. Under **Environment Variables** add `GEMINI_API_KEY` (paste it there yourself), `GEMINI_MODEL_DEFAULT=gemini-3.5-flash,gemini-3.5-flash-lite`, `GEMINI_MODEL_HEAVY=gemini-3.1-pro-preview` and, optionally, `ACCESS_CODE`. Then **Deploy**.
4. Open the URL, ask any AI box a question and check for "Answered by Flash". Rate-limit counts are per function instance on Vercel (approximate), which is fine for a demo.

## Demo script (PRD §9)
The top bar has the **role switcher**, the **time toggle** (Today / 7 days / Month / Sale days) and a **simulated clock** (22 Nov, sale day, starting 18:50). Use ▶ to play at ×1/×10/×60, or ⏭ to jump to a key moment.

1. **Kavya's morning**: role *Kavya* → Home (red tiles, ₹ impact) → Planning › Opportunities (simulator: 8 cities = High risk) → Expansion (Wave 1 **HOLD**, existing cities 87.3% < 90%).
2. **Sale-day feed delay**: role *ParcelPath ops* → Orders. The feed goes red just after 19:00 and the toast fires. Use the AI delay explainer and cut-off forecast, then Acknowledge / Assign the alert. Open MF-24-118403 in Customer 360 (H1 +2h 8m, P10 missed) and raise a "Feed delay" issue, which is routed to Mitti tech.
3. **WhatsApp replaced**: Live Ops › Root causes → load the October export → Extract (Pro, falling back to Flash) → Verify sample (5) → Share → AI draft to Imran → Approvals.
4. **Billing caught before sending**: role *ParcelPath billing* → Billing. 42 flags; Send is locked. Bulk-correct the W2 evening cluster, review the rest, tick the checklist, then Send. Switch to *Mitti Finance* to confirm or dispute lines (a dispute raises a ticket with a 48 h timer).
5. **High-value customer protected**: jump to 19:32. MF-24-118403 moves C2 → **C1** (priority 82) → AI next best action → Send for approval → *Account manager* approves in Approvals → P13 re-attempt is scheduled.

## Added in the completion pass (22 Nov, evening)
- **Guided tour** (UI/UX §13): opens on first visit, reopen with the compass button in the top bar. 5 steps for flows F1–F5; each **Go** button sets the role, the clock and the window for you.
- **Audit log** (GL-8): history button in the top bar. Filter by approvals / tickets / feed alerts / billing / gates, search, export CSV.
- **Billing › Explain flags with AI** (`billing.flag_reasons`): AI reason under each flagged line, shown beside the rule check. A person still reviews every flag.
- **Gate decision modal**: records the decision with both co-signers (Imran + ParcelPath), as in flow F4.
- **In-app dialogs** replace every browser `prompt()`/`confirm()` (resolve notes, disputes, credit note, goodwill, rate proposal, bulk correction, justify, reset), so demo steps work in embedded browsers.
- **"View as table"** toggles and aria descriptions on the main charts (UI/UX §11).
- Checked end to end in a headless browser: all 6 roles × all windows load with no errors; the F1, F3, F4 and F5 demo steps and the audit log pass. Live Gemini was not tested here (no network to Google); saved answers were.

## What's where
| Path | Purpose |
|---|---|
| `shared/` | Types, config (roles, access matrix, stages, thresholds, issue categories), business logic (stage status, priority score, criticality, timers), metrics, role filter. Used by both UI and server |
| `scripts/generate-data.ts` | Seeded generator: 2,000 orders today with micro-stage timestamps, ~1,900 customers, 1,500 invoice lines, tickets, events, 31 escalation messages |
| `scripts/save-answers.ts` | Builds `server/saved_answers.json` (one fallback answer per AI task, computed from the seed) |
| `scripts/check-key-safety.ts` | Fails if the key or `generativelanguage` appears in `dist/`, or `.env` isn't git-ignored |
| `server/` | Proxy: task whitelist, access code, per-visitor + per-IP limit, daily cap, server-side context rebuild + role filter + PII masking, Pro → Flash → saved fallback, source-ID validation |
| `src/windows/` | Home, Orders, LiveOps (Tracker / Tickets / Root causes), Billing, Planning, Customer360 |

## Deviations from the spec (and why)
- **Gemini models.** The spec names `gemini-2.5-flash` / `gemini-2.5-pro`. Google now returns *404 "no longer available to new users"* for both on this key, so the defaults are `GEMINI_MODEL_DEFAULT=gemini-3.5-flash,gemini-3.5-flash-lite` and `GEMINI_MODEL_HEAVY=gemini-3.1-pro-preview`. The default variable accepts a comma list that is tried in order when a model is busy. On the free tier, Pro returns 429 (no quota), so heavy tasks show "Answered by Flash: deep model busy", which is the spec's fallback behaviour. Set both variables back to 2.5 if your key still has access.
- **Pro timeout** is 30 s instead of 20 s, because Pro reasoning is slow. Flash keeps 20 s.
- Front end lives at the repo root (`src/`), not `/app/src`. React Query is not used (plain fetch plus a small session cache). Schemas are in `server/schemas.ts`, not a folder.
- **Cut-offs:** 10:00 / 14:00 / 18:00, plus a sale-day 21:00 late wave [Inferred], so the 7 PM feed stall has a cut-off to miss.
- **Feed light** measures time in the feed after M6 order verification, so COD verification holds don't turn it red. The per-order feed delay stays M5 → H1 as specced.
- Rate-limit counts are in memory (fine for Render or local). Vercel KV is not wired in.
