# PRD: Mitti × ParcelPath Shared Operations Platform (Prototype)

**Document 1 of 3** · PRD → Technical Spec Sheet → UI/UX Document
**Context:** Razorpay GTM Campus Build-a-thon, Case 2 ("The Festive Rush: ParcelPath and Mitti Foods")
**Author role:** Associate Manager, ParcelPath (account owner for Mitti Foods)
**Status:** Draft v1.0 for prototype build · 22 Nov 2026

**Tagging convention used throughout**
- **[Case]** = stated in the case PDF (page 4).
- **[Inferred]** = our proposal or a standard industry practice. Not in the case.
- **[Sample]** = simulated data used in the prototype only.

---

## 1. Summary

ParcelPath runs Mitti Foods' three warehouses and delivers its orders in six cities [Case]. Service is slipping month on month, Mitti's operations team is escalating over WhatsApp every night, a ₹11 lakh parcel-size billing error went unanswered, and Mitti's CEO wants 8 new cities before Diwali [Case].

This product is a **shared operations platform** used by both companies. It replaces WhatsApp threads, spreadsheets and unanswered emails with four structured "syncs" between Mitti and ParcelPath, plus a customer-level view:

| Sync | Flow | Window |
|---|---|---|
| 1. Orders | Mitti website → ParcelPath (order feed) | Orders |
| 2. Live Ops | ParcelPath → Imran's team (status, failures, damage, tickets) | Live Ops & Tickets |
| 3. Billing | ParcelPath packing → billing → Mitti Finance | Billing |
| 4. Planning | Mitti ↔ ParcelPath (sales calendar, expansion gates) | Planning |
| Cross-cutting | Per-order and per-customer view across both companies | Customer 360 |

A **Home** window summarises all of it. An **AI assistant (Gemini 2.5 Flash, with 2.5 Pro for the heaviest analysis)** sits inside every window, answers only from that window's data, shows its sources, and only drafts. People approve anything that is sent, promised, charged or decided.

The prototype is a clickable web app with simulated data. It shows how opportunities **B (cut failed deliveries)** and **D (live tracking dashboard and faster order feed)** look in use. It also shows how the platform supports a gated **4-city** expansion (not 8) and builds toward a growth partnership.

---

## 2. Problem statement

### 2.1 What the case tells us [Case]

| Metric | Jul | Aug | Sep | Oct |
|---|---|---|---|---|
| Orders delivered (lakh) | 1.3 | 1.4 | 1.5 | 1.6 |
| On-time delivery | 94% | 91% | 88% | 86% |
| Failed deliveries returned to warehouse | 7.0% | 8.0% | 9.0% | 9.5% |
| Damage complaints per 10,000 orders | 12 | 15 | 21 | 26 |
| Avg order-feed delay on sale days (hours) | 0.5 | 1.0 | 2.5 | 3.0 |
| Escalations from Mitti's operations team | 8 | 14 | 25 | 31 |

- Imran (Head of Operations) is "on WhatsApp with your people every night" and his team is exhausted. His team tracks everything on spreadsheets.
- Mitti Finance says ParcelPath overcharged about **₹11 lakh over three months** because of a **billing error on parcel sizes**. They emailed twice and nobody replied.
- A failed delivery comes back to the warehouse undelivered (customer not home, wrong address, refused). Mitti pays shipping both ways, and snacks may spoil. Each failed delivery costs Mitti about **₹120**.
- The order feed sends each **website** order to ParcelPath's system for packing. Delays mean late packing.
- Mitti's Head of Technology owns the website and the order feed, and is rarely spoken to.
- ParcelPath's capacity before Diwali: operations can set up at most **4 new cities** safely in 10 weeks, the solutions team can give **2 days** this month, and tech has **one two-week sprint**.

### 2.2 Root problems the product addresses [Inferred]
1. **No shared source of truth.** Each side sees a different picture, so problems surface as escalations instead of alerts.
2. **Every problem sits at a handoff.** Feed (website → ParcelPath), packing size (warehouse → billing), delivery outcome (ParcelPath → Mitti) and plans (Mitti → ParcelPath) have no owner, no timer and no record.
3. **No closed loop.** Issues raised on WhatsApp have no owner, deadline or closure, and emails go unanswered.
4. **No early warning.** Feed delay turns into late packing and late delivery hours later, and nobody sees the chain until the customer complains.
5. **Billing is unchecked.** Recorded parcel size goes straight to the invoice with no check against the items packed.

---

## 3. Goals and non-goals

### 3.1 Prototype goals
- G1. Show Kavya, Imran and Mitti Finance one shared, trustworthy view of service, billing and plans.
- G2. Demonstrate fixes **B** and **D** working: address checks and delivery slots, feed monitoring, and live tracking.
- G3. Replace WhatsApp escalations with tickets that have an owner, a timer and a confirmed closure.
- G4. Catch parcel-size billing mismatches **before** the invoice reaches Mitti.
- G5. Make the expansion decision evidence-based through city gates (4 cities in 2 waves).
- G6. Show AI that speeds people up without taking human-only decisions away from them.

### 3.2 Success metrics (targets are proposals [Inferred])
| Metric | Oct baseline [Case] | Target |
|---|---|---|
| On-time delivery | 86% | ≥ 90% (path back to Jul's 94%) |
| Failed deliveries | 9.5% | ≤ 7.0% (Jul level) |
| Damage per 10k | 26 | ≤ 15 |
| Sale-day feed delay | 3.0 h | ≤ 15 min |
| Escalations per month | 31 | ≤ 8, with 100% tracked as tickets |
| Ticket acknowledgement | n/a | ≤ 2 h standard, ≤ 30 min for C1 |
| Billing mismatches reaching Mitti | ₹11L over 3 months | ₹0 unreviewed lines sent |
| Billing dispute reply | 2 emails unanswered | ≤ 48 h |

**Prototype success** (for the Build-a-thon demo): a judge can follow one sale-day order from website to invoice, see the feed delay cause a missed cut-off, raise a ticket from the stuck stage, see a billing flag caught before sending, and see a gate decision held because service targets are not met.

### 3.3 Non-goals
- **No quick-delivery or dark-store operations.** ParcelPath does not do this today; it is opportunity C, shown only as a "Not yet" item in the Planning pipeline [Case].
- **No courier or third-party carrier integration.** The case mentions none. ParcelPath delivers.
- **No marketplace or quick-delivery-app orders in the feed.** Mitti sells on those channels [Case], but only website orders come through the order feed [Case].
- No real payments, real customer data or production integrations in the prototype.
- No autonomous AI actions: no auto-sending, auto-refunds, auto-crediting or auto-approving gates.

---

## 4. Users and personas

| Persona | Company | Role in case | What they need from the platform | Access |
|---|---|---|---|---|
| **Kavya** | Mitti | Founder & CEO; wants 14 cities by Diwali [Case] | The big picture, expansion status and readiness, the cost of poor service | Home summary, Planning, Customer 360 segment dashboard |
| **Imran & ops team** | Mitti | Head of Ops; 31 escalations, WhatsApp every night [Case]. User, influencer and gatekeeper | Live status, tickets with owners, root causes, less manual tracking | Everything Mitti-side; raise/reopen/close tickets; co-sign gates |
| **Mitti Head of Technology** | Mitti | Owns website and order feed [Case] | Feed health, alerts with clear ownership | Orders window (full), alert actions |
| **Mitti Finance** | Mitti | Raised ₹11L overcharge [Case] | Line-by-line invoices, dispute with a timer, credit-note tracking | Billing (Mitti view) |
| **ParcelPath ops** (warehouse & delivery) | ParcelPath | Runs 3 warehouses, delivery in 6 cities [Case] | Stuck orders, bottlenecks, tickets, capacity | Orders, Live Ops, Customer 360 (no spend), Planning responses |
| **ParcelPath tech** | ParcelPath | One two-week sprint free [Case] | Feed intake health, alerts | Orders (full) |
| **ParcelPath billing** | ParcelPath | Source of the size error [Case] | Pre-send review, flags, rate card | Billing (full) |
| **Account manager (you)** | ParcelPath | Associate Manager [Case] | Everything, escalations, approval queue for AI drafts, commitments log | Full access |

---

## 5. Scope: windows and requirements

Priority: **P0** = must be in the demo · **P1** = should be in the prototype · **P2** = shown as a static mock or roadmap.
Cities are **City A–F** because the case does not name them. Warehouses are **Warehouse 1–3** [Case: three].

### 5.0 Global (all windows)
| ID | Requirement | Pri |
|---|---|---|
| GL-1 | Top bar: logo "Mitti × ParcelPath", role switcher (6 roles), date picker (default today), tabs for 6 windows with notification badges | P0 |
| GL-2 | Role switcher changes what each window shows (see the role-access matrix in §6) | P0 |
| GL-3 | Time toggle on metrics: Today / 7 days / Month / Sale days only | P0 |
| GL-4 | Every metric tile shows current value, July baseline, target, status colour and a 4-month sparkline | P0 |
| GL-5 | Embedded AI assistant in every window (see §7) | P0 |
| GL-6 | Tags visible in the UI: [Case] figures vs [Sample] data, so judges can tell them apart | P1 |
| GL-7 | Approval queue: every AI draft goes to a queue; only an approver can send it | P0 |
| GL-8 | Audit log of approvals, ticket state changes, billing edits and gate decisions | P1 |

### 5.1 Window 0: Home (Overview)
| ID | Requirement | Pri |
|---|---|---|
| HM-1 | Headline tiles: On-time (86% vs 94%), Failed (9.5% vs 7.0%), Damage per 10k (26 vs 12), Escalations (31 vs 8), Orders (1.6L vs 1.3L), Sale-day feed delay (3.0h vs 0.5h) [Case]. Click a tile to open the window behind it | P0 |
| HM-2 | Sync health strip: 4 lights (Orders, Live Ops, Billing, Planning) with a one-line reason each | P0 |
| HM-3 | ₹ impact strip: failed-delivery cost to Mitti (failures × ₹120) [Case rate]; ₹11L refund status [Case]; expansion revenue vs plan (orders × ₹50 for ParcelPath, × ₹450 AOV for Mitti) [Case rates] | P0 |
| HM-4 | AI Daily Brief: 4–5 lines, each linked to source rows; buttons Regenerate / Ask about today / Draft update to Imran (to approval queue) | P0 |
| HM-5 | City snapshot table A–F: orders, on-time, failed, damage, open tickets; RAG coloured, sortable | P0 |
| HM-6 | "What needs you today" action list: overdue tickets, unacknowledged feed alerts, billing disputes, gate decisions due | P0 |
| HM-7 | Fix progress cards for B (address checks and slots) and D (feed and tracking) with before/after trend | P1 |
| HM-8 | Next sale event countdown (generic, from the Planning calendar) with readiness status | P1 |
| HM-9 | Shared expansion tracker (same data as Planning Tab B) | P1 |

### 5.2 Window 1: Orders (Sync 1, website → ParcelPath)
Scope: Mitti **website** orders sent through the order feed [Case].

| ID | Requirement | Pri |
|---|---|---|
| OR-1 | Feed status light: green < 15 min, amber 15–60 min, red > 60 min or no orders for 10 min on a sale day [Inferred thresholds] | P0 |
| OR-2 | Feed delay gauge: current average, today's peak, 30-day trend, target ≤ 15 min vs Oct 3.0h [Case] | P0 |
| OR-3 | Orders today: placed on website / received by ParcelPath / queued for packing, with backlog gap | P0 |
| OR-4 | Sale mode badge, auto-on from the Planning calendar; tightens alert thresholds | P1 |
| OR-5 | Live order stream table (Order ID, City, placed, received, delay, address check, slot, status ticks). Highlights delay > 15 min; filters; row click opens order detail | P0 |
| OR-6 | Delay split by stage: Mitti website queue / transit / ParcelPath intake | P0 |
| OR-7 | Hourly arrivals vs packing capacity chart with dispatch cut-off line | P0 |
| OR-8 | Daily feed delay vs on-time % chart (live causal check) | P1 |
| OR-9 | Address quality panel: valid/corrected/flagged %, top flag reasons, slot vs no-slot failure rate, feedback from Live Ops failures | P0 |
| OR-10 | Feed alerts log: Acknowledge / Assign (Mitti tech or ParcelPath tech) / Resolve; unacknowledged > 15 min escalates to account manager | P0 |
| OR-11 | Before/after D sprint comparison; past sale events comparison | P1 |
| OR-12 | Impact counter (orders at risk of missing cut-off → late deliveries → escalation risk); cost of bad addresses (flagged × failure rate × ₹120); tech scorecard by side | P1 |
| OR-AI | Delay explainer, cut-off risk forecast, address insight (rule change needs human approval), draft alert note to Mitti Head of Technology (approval) | P0 |

### 5.3 Window 2: Live Ops & Tickets (Sync 2, ParcelPath → Imran's team)
**Tab A: Tracker**
| ID | Requirement | Pri |
|---|---|---|
| LO-1 | Service scorecard: on-time, failed, damage, open tickets with target, baseline, trend | P0 |
| LO-2 | Pipeline funnel: Queued → Packed → Out for delivery → Delivered / Failed, with stuck counts | P0 |
| LO-3 | City table A–F with RAG | P0 |
| LO-4 | Failed-delivery breakdown by reason (not home / wrong address / refused) [Case], city, slot vs no slot; return-to-warehouse count; spoilage write-offs; cost to Mitti (× ₹120) | P0 |
| LO-5 | Damage breakdown by warehouse, packing shift, city, sale day vs normal day | P1 |
| LO-6 | Order lookup with full scan timeline | P0 |
| LO-7 | Second attempt / reschedule step before return to warehouse [Inferred, part of B] | P1 |
| LO-8 | Spoilage timer on returns (time since dispatch for perishable items) | P1 |
| LO-9 | New-city cohort scorecard (feeds Planning gates) | P1 |
| LO-10 | Shift handover notes (per warehouse, per shift) | P2 |

**Tab B: Tickets** (replaces WhatsApp)
| ID | Requirement | Pri |
|---|---|---|
| TK-1 | Kanban board: Open → Acknowledged → In progress → Resolved → Confirmed closed | P0 |
| TK-2 | Ticket card: ID, order(s), city, issue category, stage, raised by, named owner, countdown timer, priority | P0 |
| TK-3 | Actions by side: Mitti raises / reopens / confirms closed; ParcelPath acknowledges / updates / resolves. Overdue auto-escalates to account manager | P0 |
| TK-4 | Ticket health: open vs overdue, avg time to acknowledge/resolve, tickets per 1,000 orders | P1 |
| TK-5 | Bulk ticket covering many orders | P1 |
| TK-6 | Imran team workload-saved metric (e.g. hours no longer spent on WhatsApp and spreadsheets) [Sample] | P2 |

**Tab C: Root causes**
| ID | Requirement | Pri |
|---|---|---|
| RC-1 | Paste/upload box for WhatsApp exports or emails; AI extracts order ID, city, date, issue and tags a cause | P0 |
| RC-2 | Ranked cause chart with % and trend; click through to tickets/orders | P0 |
| RC-3 | Cause → fix → owner mapping (feed → D/tech; address → B/Mitti tech; damage → packing/ParcelPath ops; billing → Billing window) | P0 |
| RC-4 | Human check: "Verify sample" of 5 tagged messages before the chart is shared | P0 |
| RC-5 | Escalation → cause → fix progress; repeat issues; route view; sale vs normal split; workload per ops staff-hour | P1 |
| LO-AI | Ticket assist (suggested cause and draft reply), anomaly alerts, daily brief (feeds Home), draft update to Imran (only the account manager sends it) | P0 |

### 5.4 Window 3: Billing (Sync 3, packing → billing → Mitti Finance)
The case does not give the rate card or size categories, so **S / M / L sizes and rates are [Sample]**.

| ID | Requirement | Pri |
|---|---|---|
| BL-1 | Header: invoice value, orders billed, avg charge/order; flagged ₹ and lines; disputes open/resolved with avg reply time vs 48h | P0 |
| BL-2 | ₹11L overcharge tracker [Case]: amount, 3 months affected, status (Verified → Credit note issued → Closed), goodwill gesture status | P0 |
| BL-3 | Invoice lines table: order, date, city, items, expected size (from items), recorded size (at packing), billed size, rate, charge, flag with one-line AI reason | P0 |
| BL-4 | Pre-send review: every flag accepted / corrected / justified, rate card version confirmed, totals reconciled. **Send is locked until all flags are cleared** | P0 |
| BL-5 | Mitti Finance view: download line file; Confirm or Dispute each line; a dispute creates a billing ticket with a 48h timer; credit-notes log | P0 |
| BL-6 | Rate card panel with version history; changes need approval from both sides | P1 |
| BL-7 | Mismatch source breakdown (warehouse, station, shift, size); overcharge vs undercharge; cost-to-serve vs ~₹50/order [Case]; return-leg shipping on failed deliveries [Case: Mitti pays both ways]; audit trail export | P1 |
| BL-AI | Mismatch detection, pattern spotting, dispute reply draft (approval), invoice summary for Mitti Finance | P0 |

### 5.5 Window 4: Planning (Sync 4, Mitti ↔ ParcelPath)
| ID | Requirement | Pri |
|---|---|---|
| PL-1 | Shared sale and campaign calendar; Mitti adds events with expected uplift; ParcelPath responds Can support / At risk / Cannot support | P0 |
| PL-2 | Lead-time rule: events entered 6–8 weeks ahead; late entries flagged "short notice" [Inferred] | P1 |
| PL-3 | Event checklist (feed sale mode tested, extra packing shifts, address checks on, cut-off agreed) and post-event review | P1 |
| PL-4 | Expansion tracker: city, wave, status (Prep / Live / Gate passed / On hold), target go-live | P0 |
| PL-5 | Gate scorecard per new city: on-time ≥ 90%, failed and damage trending down, no overdue tickets, in both the new city and the existing 6. Pass / Hold | P0 |
| PL-6 | Gate decision log; **both Imran and ParcelPath must sign off** before a wave goes live | P0 |
| PL-7 | Opportunities pipeline: A (4 cities Yes, 8 No), B Yes, D Yes, C Not yet (pilot after the sale), each with value, resource need, owner, next step [Case figures] | P0 |
| PL-8 | ParcelPath capacity tracker [Case]: city set-ups used vs 4, solutions days used vs 2, tech sprint used vs 1 | P0 |
| PL-9 | What-if simulator: cities, launch week, expected orders → orders, ParcelPath revenue (× ₹50), Mitti sales (× ₹450), risk level | P1 |
| PL-10 | Demand by area, monthly review pack, commitments log | P1 |
| PL-AI | Capacity check, gate advisor (recommends only), post-event summary, draft monthly plan for Kavya (approval) | P0 |

**Case figures used in Planning:** ~60,000 extra orders/month in festive season for 8 cities; ₹50/order to ParcelPath; ₹450 Mitti AOV; C = ~₹6 lakh/month fees, quick-delivery sales growing ~25%/month, small local vendor with frequent stock-outs [Case].
**Derived, labelled [Inferred]:** 4 cities ≈ 30,000 extra orders/month (half of 60k, assuming even split) ≈ ₹15 lakh/month for ParcelPath and ≈ ₹1.35 crore/month of Mitti sales.

### 5.6 Window 5: Customer 360 (per order, per customer)
The case has no customer-level data. Apart from the ₹450 AOV [Case], **all customer data is [Sample]** and all models are [Inferred].

| ID | Requirement | Pri |
|---|---|---|
| CX-1 | Search by order ID, masked phone or email | P0 |
| CX-2 | Order view: how placed, items, value, payment mode, address check, slot, delay flags | P0 |
| CX-3 | **Micro-stage swimlane** (two lanes, with handshakes): M1–M8 Mitti, H1–H3 handshakes, P1–P15 ParcelPath, B1–B2 billing, C1 feedback. Each stage shows owner, start/end, time spent vs standard, status (done / in progress / stuck / failed), blocker note | P0 |
| CX-4 | Stuck-order alerts to the stage owner; bottleneck view across orders; handshake pass/fail (H1 feed received, H2 stock issue back to Mitti, H3 packed size → billing) | P0 |
| CX-5 | Customer profile: order history, service experience, CLV to date, predicted CLV (6–12 months, RFM-style), churn risk, segment tag | P0 |
| CX-6 | Customer Priority Score 0–100 (predicted CLV, churn risk, current order risk, repeat-issue flag) | P0 |
| CX-7 | **Order criticality C1–C4**, live-updating, with input chips | P0 |
| CX-8 | **Raise issue** from a stage: issue category list (raised by Mitti vs raised by ParcelPath), priority = issue severity × order criticality, routed to the stage owner on the other side | P0 |
| CX-9 | Fairness floor: every order still gets the standard response time; priority never pushes any order below it | P0 |
| CX-10 | Segment dashboard, delay impact on repeat orders, city-level CLV, issue heatmap (category × stage × side), C1/C2 queue, fairness check | P1 |
| CX-11 | **Privacy (DPDP Act):** customer data belongs to Mitti. ParcelPath roles see only masked phone, address and order status; CLV and spend are Mitti-only | P0 |
| CX-AI | Customer summary, next best action (approval), CLV explainer, criticality reason, issue category auto-suggest, daily issues summary | P0 |

**Micro-stage list** (stage names [Inferred], anchors [Case]: feed, 3 warehouses, packing size → billing, failure reasons, return, spoilage):
- **Mitti lane:** M1 Checkout started · M2 Address check · M3 Delivery slot chosen · M4 Payment / COD confirmed · M5 Order confirmed · M6 Order verification · M7 Queued in order feed · M8 Sent to ParcelPath
- **Handshakes:** H1 Received by ParcelPath (feed delay = M5 → H1) · H2 Stock issue back to Mitti · H3 Packed size → billing line
- **ParcelPath lane:** P1 Validated · P2 Warehouse assigned (1 of 3) · P3 Stock reserved · P4 Pick list · P5 Picked · P6 Quality check · P7 Packed (size and weight) · P8 Labelled · P9 Sorted to route · P10 Dispatch cut-off made/missed · P11 Out for delivery · P12 Delivery attempt (delivered / not home / wrong address / refused) · P13 Re-attempt or address correction · P14 Returned to warehouse · P15 Restock or write off
- **Close-out:** B1 Billing line created · B2 Invoiced → confirmed / disputed · C1 Customer feedback or ticket

**Order criticality** [Inferred thresholds]
| Category | Rule | Response |
|---|---|---|
| C1 Critical | Any 2 of: priority score ≥ 75; perishable near shelf-life limit; past promised delivery; repeat issue; failed attempt already | Owner alerted instantly, act within 30 min, red |
| C2 High | Any 1 of the above, or sale-day order at risk of missing cut-off, or new-city order | Act within 1 h, amber |
| C3 Standard | On track, normal customer | 2 h acknowledgement |
| C4 Low | On track, low value, not time-sensitive | Standard floor, never below it |

**Issue categories**
- **Raised by Mitti:** Late delivery (P10–P12) · Failed delivery dispute (P12) · Damage complaint (P6–P7, P12) · Wrong or missing items (P5–P6) · Tracking not updating (any P) · Billing dispute (P7 → B1–B2) · Return not processed or restocked (P14–P15)
- **Raised by ParcelPath:** Feed delay or missing order (M7–M8 → H1) · Invalid or incomplete address (M2) · Stock mismatch (P3, H2) · Customer unreachable or refused (P12) · Packaging or labelling spec issue (if Mitti supplies specs) [Inferred] · Sale-day volume not forecast (Planning) · Payment / COD verification pending (M4–M6)

---

## 6. Role-access matrix

| Window | Kavya | Imran's team | Mitti tech | Mitti Finance | ParcelPath ops | ParcelPath tech | ParcelPath billing | Account manager |
|---|---|---|---|---|---|---|---|---|
| Home | Tiles, brief, planning status | Full + Raise ticket | Orders health | Billing light, disputes | Own syncs + actions | Own syncs + actions | Billing + actions | Full + approval queue |
| Orders | Hidden | View only | Full + alert actions | Hidden | Full + cut-off forecast | Full + alert actions | Hidden | Full |
| Live Ops & Tickets | Scorecard only | All tabs; raise/reopen/close | Hidden | Billing tickets only | All tabs; ack/resolve | Feed tickets | Hidden | Full + escalation queue |
| Billing | Hidden (₹ on Home) | Hidden (₹ on Home) | Hidden | Mitti view | Hidden | Hidden | Full | Full |
| Planning | Calendar, expansion, opportunities, simulator, review pack; add plans | Full; co-sign gates | Event checklist (feed items) | Hidden | Respond to plans; capacity; co-sign gates | Event checklist | Hidden | Full + commitments log |
| Customer 360 | Segment dashboard | Full profile, CLV, priority | Order view | Hidden | Order view, priority, delivery history (no spend; masked PII) | Order view | Hidden | Priority, urgency, everything |

"Mitti tech" and "ParcelPath tech" sit under the existing role switcher entries; the switcher in the prototype carries the 6 roles agreed (Kavya / Imran's team / Mitti Finance / ParcelPath ops / ParcelPath billing / Account manager). Tech views are reachable through a sub-toggle in the Orders window [Inferred, keeps the switcher simple].

---

## 7. AI requirements (Gemini)

The AI is **embedded in each window next to the data**. There is no separate AI page.

| ID | Requirement | Pri |
|---|---|---|
| AI-1 | Each window has its own assistant panel and inline AI cards (brief, explainer, flags) | P0 |
| AI-2 | **Grounded:** the assistant answers only from the current window's data (plus the current role's permitted fields). If the data does not contain the answer, it says so | P0 |
| AI-3 | **Cites sources:** every answer lists the rows or records it used (e.g. order IDs, ticket IDs, invoice lines), clickable | P0 |
| AI-4 | **Drafts only:** messages, replies, rule changes, credit notes and plans go to the approval queue | P0 |
| AI-5 | **Role-aware:** the AI never receives data the current role cannot see (e.g. ParcelPath roles: no spend or CLV, masked PII) | P0 |
| AI-6 | Labels every AI output "AI draft" or "AI suggestion", with confidence where relevant | P0 |
| AI-7 | Fallback: if Gemini Pro is rate-limited it falls back to Flash automatically; if Flash fails or quota runs out, the window still works and shows a pre-saved answer tagged "Saved answer" | P0 |
| AI-8 | API key is never in the browser, code or docs; it lives only in a `.env` file / host environment variable, and calls go through a backend proxy | P0 |
| AI-9 | Model routing: `gemini-2.5-flash` for all AI boxes; `gemini-2.5-pro` for escalation root-cause analysis, the expansion gate check and (optional) the Planning capacity check | P0 |
| AI-10 | Hosted online (Vercel or Render) with a per-visitor limit of about 10–20 AI requests per hour (default 15), an optional access code for the AI panel, and a daily cap | P0 |

**Never handed to AI (human-only)** [from our Q7 answer]
- Sending anything to Kavya, Imran, Mitti Finance or the Head of Technology
- Commitments on dates, refunds, credit notes, goodwill gestures or prices
- Apologies and relationship conversations (e.g. the first message to Imran)
- Gate go/no-go decisions for new cities (Imran and ParcelPath co-sign)
- Saying no or "not yet" to Kavya
- Changing check rules, rate cards or criticality thresholds

---

## 8. Data (prototype)

- Simulated, seeded data so the demo is repeatable. Monthly aggregates match the case exactly (Jul–Oct table in §2.1). Daily and order-level data is generated to sum to those monthly figures [Sample].
- 6 cities (A–F), 3 warehouses (1–3), around 120 days (Jul–Oct) plus a "today" in November with a sale event.
- Order-level sample: about 2,000 orders for "today" with micro-stage timestamps, plus a sample of about 500 customers with order history.
- Sale days show feed delays peaking near 3h (Oct); 5–8% of addresses are flagged.
- Billing: around 1,500 invoice lines with a concentrated mismatch pattern (e.g. Warehouse 2, evening shift, since 12 Oct) [Sample].
- Escalations: 31 sample WhatsApp-style messages for October, so Root causes can tag them.

---

## 9. Key user journeys (demo script)

1. **Kavya's morning (Home → Planning):** sees red tiles and the ₹ impact, opens Planning, runs the simulator for 8 vs 4 cities, sees the gate scorecard is on Hold for Wave 1 until on-time ≥ 90%.
2. **Sale-day feed delay (Orders → Customer 360 → Tickets):** feed light turns red at 7 PM; the AI explains "120 orders queued on the website side; 35 likely to miss cut-off"; Mitti tech acknowledges; an order shows stuck at P10 in the swimlane; ParcelPath ops raises a "Feed delay" issue to the M7–M8 owner.
3. **Imran's WhatsApp replaced (Live Ops → Root causes):** pastes last month's WhatsApp export, AI tags causes, human verifies 5 samples, the ranked chart shows feed delay and wrong address on top, each linked to fix D or B.
4. **Billing caught before sending (Billing):** ParcelPath billing opens the draft invoice; 42 lines flagged "Billed L; items normally pack as M"; send is locked; they correct them; the AI summary for Mitti Finance is drafted and approved.
5. **High-value customer protected (Customer 360):** a C1 order (priority 82, perishable, failed attempt) gets a 30-minute timer, a re-attempt instead of a return, and a drafted proactive message the account manager approves.

---

## 10. Assumptions, risks and open questions

| Type | Item |
|---|---|
| Assumption [Inferred] | ParcelPath can expose packing records (size, weight, station, shift) and delivery scans to the platform |
| Assumption [Inferred] | Mitti's Head of Technology can add timestamps at M5, M7 and M8 so feed delay can be split by side |
| Assumption [Inferred] | Size categories S/M/L and a rate card exist; actual values unknown |
| Risk | Prototype data looks "real". Mitigation: [Sample] labels and a banner |
| Risk | AI hallucination. Mitigation: grounding, source citations, drafts-only, verify sample |
| Risk | Customer data privacy (DPDP Act). Mitigation: Mitti owns data; masked PII for ParcelPath; role-filtered AI context |
| Risk | Scope vs capacity: real build must fit 2 solutions days (B) and 1 tech sprint (D) [Case]. The prototype shows the target; a phased real build is in §11 |
| Decided | Gemini 2.5 Flash default, 2.5 Pro for 2–3 heavy tasks with fallback to Flash; key in env only; hosted with rate limit, optional access code and saved answers (Tech Spec §7) |
| Risk | Gemini free-tier quota runs out during a demo. Mitigation: per-visitor limit, daily cap, Pro → Flash fallback, pre-saved answers |

---

## 11. Phasing (real build, after the prototype) [Inferred]

| Phase | Fits capacity [Case] | Delivers |
|---|---|---|
| Now (this month) | Solutions team 2 days | B: address checks and delivery-slot options (Orders address panel, slot vs failure) |
| Next 2 weeks | Tech: one two-week sprint | D: feed monitoring and live tracking (Orders, Live Ops Tracker, Tickets) |
| Before Wave 1 | Ops (no extra tech) | Tickets process live, gate scorecard, billing pre-send check (process + spreadsheet first if no tech time is left) |
| After Diwali | New sprint | Customer 360, AI root causes at scale, billing AI, C pilot evaluation |

---

## 12. Linked documents
- `02_Tech_Spec_Mitti_ParcelPath_Ops_Platform.md`: architecture, data model, APIs, Gemini integration
- `03_UIUX_Mitti_ParcelPath_Ops_Platform.md`: layout, components, screens, interaction and accessibility
