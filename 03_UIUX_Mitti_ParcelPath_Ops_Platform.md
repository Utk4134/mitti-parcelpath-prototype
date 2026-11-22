# UI/UX Document: Mitti × ParcelPath Shared Operations Platform (Prototype)

**Document 3 of 3** · Follows the PRD (`01_…`) and Tech Spec (`02_…`). Requirement IDs in brackets.
**Status:** Draft v1.0 · 22 Nov 2026
Tags: **[Case]** case PDF · **[Inferred]** proposal · **[Sample]** simulated data.

---

## 1. Design principles

1. **One truth, two companies.** Both sides look at the same numbers. Colour and labels show *whose* stage or action it is (Mitti vs ParcelPath), never two different versions of a number.
2. **Problems at handoffs are visible.** Handshakes (H1 feed, H2 stock, H3 size → billing) get their own visual element, because every problem in the case sits at a handoff.
3. **Every red has a next step.** Any red tile, light or row has a click-through and an action (acknowledge, raise, assign, review). No dead-end alarms.
4. **Owner and clock on everything.** Tickets, alerts and stuck stages always show a named owner and a countdown. This replaces "nobody replied" [Case].
5. **AI next to the data, humans at the controls.** AI appears inline where the data is, always labelled, always with sources, and anything outward-facing goes through an Approve button.
6. **Calm by default.** Imran's team is exhausted [Case]. Show what needs attention first, hide the rest behind filters, and avoid alert noise (thresholds tighten only in sale mode).
7. **Honest data.** Case figures and sample data are labelled so nobody mistakes the demo for real numbers.

---

## 2. Information architecture

```
Top bar ─ Logo · Role switcher · Date · Time toggle · Approval queue (n) · Reset demo
│
├─ 0 Home
├─ 1 Orders ............... [sub-toggle: Ops view | Mitti tech | ParcelPath tech]
├─ 2 Live Ops & Tickets ... Tracker | Tickets | Root causes
├─ 3 Billing .............. ParcelPath view | Mitti Finance view (by role)
├─ 4 Planning ............. Calendar | Expansion & gates | Opportunities
└─ 5 Customer 360 ......... Search → Order (swimlane) | Customer profile | Segments & queues
```
Navigation is one level of tabs plus in-window sub-tabs. Any entity (order, ticket, invoice line, city, event) opens in a **right-side drawer** so the user never loses their place.

---

## 3. Layout system

### 3.1 Desktop (primary, ≥ 1280 px)
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR (56px)  Mitti × ParcelPath | Role ▾ | 22 Nov ▾ | Today 7d Month Sale │
├──────────────────────────────────────────────────────────────────────────────┤
│ WINDOW TABS (44px)  Home  Orders•2  Live Ops•3  Billing•1  Planning  C360    │
├───────────────────────────────────────────────────────┬──────────────────────┤
│ MAIN CONTENT (12-col grid, 24px gutter)               │ AI ASSISTANT (360px) │
│  KPI row → primary chart/table → secondary panels      │ collapsible rail     │
│                                                        │                      │
├───────────────────────────────────────────────────────┴──────────────────────┤
│ (Entity drawer slides over from right, 520px)                                │
└──────────────────────────────────────────────────────────────────────────────┘
```
- Max content width 1440 px; 12-column grid; 8 px spacing scale (4, 8, 12, 16, 24, 32, 48).
- AI rail is open by default on Home, collapsed to a 48 px icon strip elsewhere (remembers per user).

### 3.2 Tablet (768–1279 px)
AI rail becomes a bottom sheet (button "Ask AI"). KPI tiles wrap to 3 per row. Tables keep first 4 columns; others in row expand.

### 3.3 Phone (< 768 px) [P2, view only]
Single column, 16 px side gutters, tiles 2 per row, tabs become a bottom nav with 5 icons + "More". Swimlane turns vertical (Mitti stages then ParcelPath stages). No horizontal page scroll; wide tables scroll inside their card.

---

## 4. Visual design

### 4.1 Colour tokens (light / dark)
| Token | Use | Light | Dark |
|---|---|---|---|
| `--bg` | page | #F7F7F5 | #111315 |
| `--surface` | cards | #FFFFFF | #1A1D21 |
| `--text` | primary text | #1C1F23 | #E8EAED |
| `--text-muted` | labels | #5F6670 | #A0A6AE |
| `--border` | dividers | #E3E5E8 | #2C3036 |
| `--mitti` | Mitti lane, Mitti actions | #B5562B (terracotta, "mitti" = soil) | #E08A5F |
| `--parcelpath` | ParcelPath lane, actions | #2F5BBA (blue) | #7FA2EE |
| `--handshake` | H1–H3 nodes | #6B4FBB (purple) | #A994EA |
| `--good` | green status | #1E8E4E | #4CC47F |
| `--warn` | amber status | #B7791F | #E5B454 |
| `--bad` | red status | #C62828 | #F07070 |
| `--ai` | AI accents, AI labels | #0F766E (teal) | #4FD1C5 |

Rules: status colours are always paired with an icon and text (✓ / ! / ✕ and "On track / At risk / Off track") so meaning never relies on colour alone. Mitti/ParcelPath colours are never used for status.

### 4.2 Typography
- Font: Inter (UI) and JetBrains Mono (IDs, timestamps).
- Scale: 12 (caption) · 14 (body, tables) · 16 (emphasis) · 20 (section title) · 28 (tile value) · 36 (hero number on Home).
- Numbers: tabular figures; Indian format (1.6 lakh, ₹11 lakh, ₹1.35 crore).

### 4.3 Iconography
Simple line icons (Lucide). Fixed meanings: ⏱ timer, 👤 owner, 🔗 source, ⚠ flag, 🤝 handshake, ✦ AI.

---

## 5. Core components

| Component | Anatomy | States / behaviour |
|---|---|---|
| **KPI Tile** | label · big value · target ("Target ≥ 90%") · baseline ("Jul 94%") · delta · 4-month sparkline · status badge · [Case]/[Sample] tag | Hover: tooltip with monthly values. Click: deep link to the window behind it |
| **Sync light** | dot + sync name + one-line reason | green / amber / red / grey (no data); click opens sync window |
| **RAG badge** | icon + word + colour | On track / At risk / Off track |
| **Data table** | sticky header, sortable columns, filter chips, row highlight, row actions on hover | Virtualised > 500 rows; empty state "No orders match these filters" + Clear |
| **Countdown timer** | ⏱ + time left + bar | > 50% green, 25–50% amber, < 25% red pulse (1×, no loop), overdue = red "Overdue 12m" + escalated chip |
| **Owner chip** | avatar initials + name + side colour edge | Click: owner's queue |
| **Ticket card** | ID · category · stage chip · city · criticality chip (C1–C4) · priority number · owner · timer · order count | Drag between kanban columns only if role allowed; otherwise action buttons |
| **Stage cell** (swimlane) | code + name · owner · time spent / standard · status icon · blocker note | done ✓ / in progress ● / stuck ⏸ (red border) / failed ✕ / not started ○ |
| **Handshake node** | 🤝 diamond between lanes · pass/fail · measured delay | Click: shows both sides' timestamps |
| **Criticality chip** | C1 Critical / C2 High / C3 Standard / C4 Low + reason chips on hover | Animates once when category changes, with a toast "Order moved C3 → C1: delivery failed, priority 82" |
| **AI card (inline)** | ✦ "AI suggestion" label · text · source chips · confidence · actions (Use / Edit / Dismiss / Regenerate) | Loading skeleton; model tag (Flash / Pro / Saved answer); error → "Saved answer" tag |
| **AI assistant rail** | header (window name + "Answers from this window's data only") · suggested prompts · chat thread · input · source chips under each answer | Drafts show "Send for approval" not "Send" |
| **Approval drawer** | list of pending drafts · recipient · body (editable) · sources · Approve / Edit & approve / Reject | Only approver roles see buttons; others see "Waiting for account manager" |
| **Entity drawer** | header (ID, status) · tabs (Timeline / Details / Tickets / AI) · actions footer | Esc closes; URL updates for sharing |
| **Lock card** | 🔒 "Not available for {role}" + reason (e.g. "Customer spend is Mitti-only under DPDP") | Shown instead of hidden content |
| **Data tag** | small pill [Case] / [Sample] / [Inferred] | Toggle "Show data tags" in top bar for demo |

---

## 6. Screen specifications

### 6.0 Home [HM-1…9]
```
┌ KPI ROW (6 tiles) ─────────────────────────────────────────────────────────┐
│ On-time 86% │ Failed 9.5% │ Damage 26 │ Escalations 31 │ Orders 1.6L │ Feed 3.0h │
├ SYNC HEALTH ───────────────────────────┬ ₹ IMPACT ─────────────────────────┤
│ ● Orders  amber  Avg sale-day delay 3.0h│ Failed-delivery cost  ₹X (×₹120)  │
│ ● Live Ops red   31 escalations, 3 late │ ₹11L refund: Verified → CN pending│
│ ● Billing red    ₹11L disputed          │ Expansion: ₹ plan vs actual       │
│ ● Planning amber Next sale: 2/4 at risk │                                   │
├ AI DAILY BRIEF ✦ ──────────────────────┴───────────┬ WHAT NEEDS YOU TODAY ─┤
│ • Yesterday on-time 87% (+1)  🔗                     │ ⏱ 3 tickets overdue    │
│ • Failed highest in City C (11%), wrong address 🔗   │ ⚠ 1 feed alert unacked │
│ [Regenerate] [Ask about today] [Draft update to Imran]│ ₹ 1 dispute due 6h     │
├ CITY SNAPSHOT A–F (sortable) ───────────────────────┤ ✔ Gate W1 decision Fri │
├ FIX PROGRESS: B | D ─────┬ NEXT SALE COUNTDOWN ─────┼ EXPANSION TRACKER ─────┤
└──────────────────────────┴──────────────────────────┴────────────────────────┘
```
- Hierarchy: tiles → health → brief/actions → detail. The action list is sticky on scroll.
- Role views per PRD §6. Kavya sees a simplified Home: tiles, brief, ₹ impact, next sale, expansion. No ticket rows.

### 6.1 Orders [OR-1…12]
- **Header band:** feed status light (large), delay gauge (semi-circle, target marker at 15 min, today's peak marker), placed / received / queued counters with the backlog shown as a gap bar, Sale mode badge.
- **Main:** live order stream table (left 8 cols) + delay split stacked bar (website queue / transit / ParcelPath intake) and hourly arrivals vs packing capacity chart with a dashed cut-off line (right 4 cols).
- **Below:** Address quality panel, feed alerts log (rows with Acknowledge / Assign / Resolve), before/after D sprint, past sale events, impact counter and cost of bad addresses.
- **Inline AI:** delay explainer card sits *under the gauge*; cut-off risk forecast sits *on the capacity chart* ("35 orders likely to miss 6 PM cut-off, range 28–42"); address insight card in the address panel with a "Propose rule change" button (goes to approval).
- **Sub-toggle** (Ops / Mitti tech / ParcelPath tech) filters alerts to "my side".
- **Key interaction:** alert unacknowledged for 15 min → row turns red, chip "Escalated to account manager", Home badge increments.

### 6.2 Live Ops & Tickets
**Tracker [LO-1…10]:** scorecard row → pipeline funnel (horizontal, with "stuck" counts in red under each stage) → city table → two-column breakdowns (failed by reason with ₹ cost; damage by warehouse/shift with sale vs normal toggle) → order lookup bar (pinned at top right) → new-city cohort card → shift handover notes (collapsible).
**Tickets [TK-1…6]:**
```
Open (5) │ Acknowledged (4) │ In progress (6) │ Resolved (3) │ Confirmed closed (12)
[C1 card]│ [card]           │ [card]          │ [card]       │ (collapsed by default)
```
- Sort inside columns by priority, then time left. C1 cards have a red left edge.
- "Raise ticket" button top right opens a 3-step form: pick order(s) → stage auto-filled → category (filtered by raiser's side) → severity shown → owner and timer auto-set (read-only, with explanation).
- Ticket drawer: timeline, linked orders (mini swimlane), AI ticket assist (suggested cause + draft reply), actions by role.
- Ticket health strip above the board.
**Root causes [RC-1…5]:**
1. Paste box ("Paste WhatsApp export or email text") + upload .txt.
2. "Extract" → AI table of rows (message, order ID, city, date, issue, cause, confidence). Low-confidence rows highlighted.
3. **"Verify sample"** modal: 5 random rows, each Confirm / Correct. The chart's "Share" button stays disabled until verification is done.
4. Ranked horizontal bar chart of causes with % and trend arrows; each bar links to tickets and to its fix card (cause → fix → owner).
5. Fix progress small multiples: escalations per cause before/after fix go-live.

### 6.3 Billing [BL-1…7]
- **ParcelPath billing view:** header metrics → ₹11L tracker (stepper: Verified → Credit note issued → Closed, plus goodwill status) → invoice lines table with flagged rows tinted amber and an inline AI reason → **Pre-send checklist** panel pinned on the right:
  ```
  ☐ 42 flags reviewed (0/42)
  ☐ Rate card v3 confirmed
  ☐ Totals reconciled
  [ Send invoice ]  ← disabled, tooltip "Review 42 flagged lines first"
  ```
- Each flagged row: Accept / Correct (size dropdown) / Justify (note required).
- **Mitti Finance view:** invoice summary card (AI-drafted, approved), Download lines (CSV), per-line Confirm / Dispute, disputes list with 48 h timers, credit notes log, ₹11L tracker.
- **Patterns panel:** heatmap of flags by warehouse × shift × week; AI pattern statement above it.
- Rate card panel: current version, history, "Propose change" requiring both approvals (two signature slots).

### 6.4 Planning
**Calendar [PL-1…3]:** month view with event bars coloured by ParcelPath response (green can support, amber at risk, red cannot). "Short notice" stripe pattern on late entries. Event drawer: details, AI capacity check, response buttons (ParcelPath ops), checklist, post-event review.
**Expansion & gates [PL-4…6, PL-8]:**
```
Capacity:  City set-ups ■■□□ 2/4 · Solutions days ■□ 1/2 · Tech sprint ■ 1/1   [Case limits]
Wave 1: City G (Prep) · City H (Prep)       Wave 2: City I · City J (Not started)
Gate scorecard  City G ─ On-time 88% ✕ | Failed ↓ ✓ | Damage → ! | Overdue 0 ✓ | Existing 6: 87% ✕ → HOLD
Sign-off:  Imran [ Sign ]   ParcelPath [ Sign ]     (disabled until PASS)
AI gate advisor ✦ "Hold. Blockers: existing cities' on-time 87% (< 90%)." 🔗
Decision log ▸
```
New cities are labelled City G–J [Inferred]; the case does not name them.
**Opportunities [PL-7, PL-9]:** 4 cards (A, B, C, D) with status pill (Yes / Yes, 4 cities / Not yet / No for 8 cities), value, resource need, owner, next step. What-if simulator: city count slider (0–8), launch week, orders per city; outputs ParcelPath revenue (×₹50), Mitti sales (×₹450), risk meter that turns red above 4 cities.

### 6.5 Customer 360 [CX-1…11]
```
┌ Search: order ID / phone / email ────────────────────────────────────────────┐
├ ORDER MF-24-118403 · City C · ₹620 · COD · C1 Critical (priority 82) ───────┤
│ MITTI     M1✓ M2✓ M3✓ M4✓ M5✓ M6✓ M7● M8✓                                    │
│ HANDSHAKE            🤝H1 +2h10m ✕                 🤝H3 ✓                    │
│ PARCELPATH  P1✓ P2✓ P3✓ P4✓ P5✓ P6✓ P7✓(95m⏸) P8✓ P9✓ P10✕ missed 6 PM …     │
│ CLOSE-OUT   B1○ B2○ C1○                                                       │
│ AI ✦ "Stuck at P10. Missed 6 PM cut-off because P7 took 2h. Recommend        │
│      priority dispatch tomorrow first wave + proactive message." [Send for approval] │
├ CUSTOMER PROFILE ────────────────────┬ PRIORITY & CRITICALITY ───────────────┤
│ 14 orders since Mar · CLV ₹6,800     │ Score 82 ▮▮▮▮▮▮▮▮□□  [Why?]           │
│ Predicted 12m ₹7,900 · Churn HIGH    │ Chips: High value · Perishable · Late │
│ Segment: At risk · 2 of last 3 late  │ Timer: ack 30 min                     │
│                                      │ [Raise issue at P10]                  │
└──────────────────────────────────────┴───────────────────────────────────────┘
```
- Swimlane scrolls horizontally inside its card; current stage auto-scrolls into view. Stage cell hover shows owner, start/end, time vs standard, blocker.
- ParcelPath roles: profile card shows a lock card for spend/CLV ("Mitti-only data, DPDP"); phone/email masked; Mitti lane shows status only.
- **Raise issue** from any stage cell: category list filtered by the raiser's side and that stage; severity × criticality shown as "Priority 12 of 16"; routed owner shown before submit.
- **Segments & queues sub-tab:** segment dashboard, delay → repeat-order chart, city-level CLV, issue heatmap (category × stage × side), C1/C2 live queue, fairness check gauge ("98% of C3/C4 within standard time").

---

## 7. AI experience (all windows)

### 7.1 Where AI appears
| Pattern | Example | Placement |
|---|---|---|
| Inline insight card | Delay explainer, gate advisor, criticality reason | Directly beside the chart/record it explains |
| Inline row annotation | Billing flag reason, root-cause tag | Inside the table row |
| Assistant rail | "Ask about this window" | Right rail (desktop), bottom sheet (tablet/phone) |
| Draft | Update to Imran, dispute reply, rule change | Opens in approval drawer |

### 7.2 Assistant rail behaviour
- Header: "✦ Assistant · Orders · answers from this window's data only".
- 3–4 suggested prompts per window, e.g. Orders: "Why is the feed red?", "How many orders will miss cut-off?", "Which cities have the most flagged addresses?"; Billing: "Which lines are flagged and why?", "Where are mismatches coming from?"
- Each answer shows source chips (e.g. `ALERT-0712`, `MF-24-118403`); click opens the drawer.
- Out-of-scope question → "That's not in this window's data. Try the Billing window." with a link.
- Draft answers end with **[Send for approval]**, never [Send].
- Visible disclaimer under the input: "AI can be wrong. Check sources. Nothing is sent without approval."
- Footer of the rail shows the model tag of the last answer (Flash / Pro / Saved) and remaining questions this hour (e.g. "12 of 15 left").

### 7.3 AI states
| State | UI |
|---|---|
| Loading (Flash) | Skeleton lines + "Reading 1,248 orders…" |
| Loading (Pro tasks: root causes, gate check, capacity check) | Step text that updates: "Reading 31 escalations… Grouping causes… Checking against tickets…" + note "Deep analysis, about 15 s" |
| Success | Text + sources + confidence pill |
| Low confidence | Amber pill "Low confidence: check sources" |
| Pro busy → Flash | Small grey tag "Answered by Flash: deep model busy" |
| Visitor limit reached | Card shows the saved answer + "You've used this hour's 15 AI questions. Live answers resume in 23 min." |
| Quota / error | Grey card "Saved answer" with pre-written text and reason; retry button |
| Access code needed | First AI use opens a small modal: "Enter access code to use the AI assistant" + field + Unlock; the dashboard stays usable without it |
| Pending approval | Draft card with "Waiting for account manager" |
| Approved | Green check, approver name and time; read-only |

### 7.4 Human-only actions (UI rules)
Buttons for sending messages, issuing credit notes, goodwill gestures, rule changes, rate changes and gate sign-offs **are never triggered by AI**. They exist only as human controls, and AI drafts link to them. [PRD §7]

---

## 8. Key user flows

**F1. Sale-day feed spike (Orders → Customer 360 → Tickets)**
1. 7:05 PM: feed light turns red; toast "Feed delay 72 min, sale mode". Orders tab badge +1.
2. Mitti tech opens Orders → alert row → AI explainer: "Website-side queue, 120 orders, 35 at risk of missing cut-off."
3. Clicks Acknowledge (name and time logged) → Assign to self → timer starts.
4. ParcelPath ops opens an affected order in Customer 360 → sees H1 ✕ +2h10m and P10 missed → Raise issue "Feed delay" at M7–M8 → routed to Mitti tech, priority shown.
5. Resolved with note; Mitti side confirms; Home light returns to amber/green.

**F2. Replace WhatsApp (Live Ops → Root causes → Home)**
Paste export → Extract → Verify sample (5) → chart → Share to Imran's team → AI draft update → account manager approves.

**F3. Invoice caught before sending (Billing)**
Open draft invoice → 42 flags → AI pattern "W2 evening shift since 12 Oct" → review flags (bulk Correct for the cluster with a note) → checklist complete → Send unlocks → AI summary for Mitti Finance → approve → Mitti Finance confirms lines.

**F4. Gate decision (Planning)**
Kavya opens Expansion → City G shows HOLD (existing cities 87%) → AI advisor lists blockers → simulator shows 8 cities = High risk → decision log records "Hold Wave 1 one week" with Imran and ParcelPath names.

**F5. Protect a high-value customer (Customer 360)**
P12 fails → toast "Order moved C3 → C1" → owner alerted, 30 min timer → AI next best action "Re-attempt tomorrow 9–11 AM + proactive message" → approve → P13 shows scheduled.

---

## 9. Notifications and badges
- Tab badges = items needing the current role's action (not totals).
- Toasts only for: new C1, overdue ticket, feed red, billing dispute received, approval needed. Max 1 toast at a time; others stack in a bell menu.
- Quiet mode outside sale mode: amber items don't toast.

---

## 10. Empty, loading and error states
| Situation | Message |
|---|---|
| No tickets | "No open tickets. Nice." + link to Confirmed closed |
| No flags | "All lines match expected sizes. Ready to send." |
| Window locked by role | Lock card with reason |
| Data loading | Skeleton tiles/rows (no spinners over 300 ms without text) |
| Data error | "Couldn't load orders. Retry" + last updated time |
| Storage blocked | Small banner "Demo changes won't be saved in this browser" |

---

## 11. Accessibility (WCAG 2.1 AA)
- Contrast ≥ 4.5:1 for text, ≥ 3:1 for chart marks and UI controls in both themes.
- Status never by colour alone (icon + word).
- Full keyboard use: Tab order follows layout; `g h / g o / g l / g b / g p / g c` jump to windows; `/` focuses search; `a` opens AI rail; Esc closes drawers.
- Charts have a "View as table" toggle and aria descriptions ("On-time fell from 94% in July to 86% in October").
- Timers announce via `aria-live="polite"` only at 25% left and overdue.
- Motion: one-time transitions ≤ 200 ms; respects `prefers-reduced-motion`.

---

## 12. Content and microcopy
- Plain words, short sentences; name the owner and the deadline ("Ravi, ParcelPath W2, ack in 42 min").
- Use case vocabulary: "failed delivery", "order feed", "escalation", "parcel size".
- Never say "courier", "dark store" or "quick delivery" except in the Opportunities card for C.
- Money in Indian format; always show the rate used ("× ₹120 per failed delivery [Case]").
- Buttons are verbs: Acknowledge, Assign, Resolve, Confirm closed, Send for approval, Sign gate.

---

## 13. Demo mode extras (for judges)
- **Data tags toggle** to show [Case]/[Sample]/[Inferred].
- **Simulated clock** (play / pause / ×10) to run the 7 PM spike live.
- **Guided tour** (5 steps matching flows F1–F5), skippable.
- **Reset demo** restores seeded state.
