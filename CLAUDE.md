# CLAUDE.md — CustodyBuddy Incident Report Generator

> AI context file for the CustodyBuddy Incident Report Generator.  
> Read this before making any changes to this component.

---

## Project Overview

**Product:** CustodyBuddy.com — AI-powered legal toolkit for self-represented parents navigating high-conflict co-parenting and custody disputes.  
**Component:** Incident Report Generator — a multi-step form that collects incident details, calls the Claude API, and produces a professional court-ready report with legal classification and Canadian statute references.  
**Owner:** Danielle Pike  
**Contact / Donations:** custodybuddyai@gmail.com  
**Deployment:** Hostinger (custodybuddy.com)

---

## Architecture

### Component Flow

```
Step 1 (Form)  →  Step 2 (Loading)  →  Step 3 (Report)
     ↓                   ↓                    ↓
User fills in       API call to         Renders structured
incident details    Claude Sonnet       report card + Print PDF
```

### State Shape

```js
// Form state
{
  incidentType: string,   // one of IncidentType values (see taxonomy below)
  date: string,           // ISO date YYYY-MM-DD
  time: string,           // HH:MM or empty
  severity: 'High' | 'Medium' | 'Low',
  location: string,
  witnesses: string,
  details: string,        // free-text user description — most important field
  province: string,       // Canadian province for statute targeting
}

// Report state (after API response)
{
  reportTitle: string,
  professionalSummary: string,   // \n\n-separated paragraphs
  legalClassification: string,
  primaryStatutes: Statute[],
  additionalStatutes: Statute[],
  keyFlags: string[],
  meta: { ...form, typeLabel, generated }
}

// Statute shape
{ name: string, citation: string, url: string, plainLanguage: string }
```

### Step variable
- `1` = form
- `2` = loading/generating
- `3` = report display

---

## Design System

**Do not deviate from these values without explicit instruction.**

| Token | Value | Usage |
|---|---|---|
| `navy950` | `#020716` | Page background |
| `navy900` | `#0A192F` | Card / input background |
| `navy850` | `#0F182A` | Hover states, nested cards |
| `gold500` | `#F6BA21` | Primary CTA, labels, accents |
| `slate300` | `#cbd5e1` | Body text |
| `slate400` | `#94a3b8` | Secondary / muted text |
| `slate500` | `#64748b` | Placeholder / footer text |

**Typography**
- Headings: `Georgia, serif` (Playfair Display in production builds)
- Body / UI: `Inter, sans-serif`

**Severity colours**
- High → `#f87171` (red)
- Medium → `#fbbf24` (amber)
- Low → `#34d399` (green)

**Key UI patterns**
- Eyebrow badges: `border: 1px solid rgba(246,186,33,0.3)`, `background: rgba(246,186,33,0.07)`
- Cards: `border: 1px solid #F6BA21`, `borderRadius: 20px`, `boxShadow: 0 0 40px rgba(246,186,33,0.12)`
- Input fields: `background: #0A192F`, `border: 1px solid rgba(246,186,33,0.2)`, `borderRadius: 8px`
- Labels: 10px, uppercase, `letterSpacing: 0.1em`, gold500

---

## IncidentType Taxonomy

Canonical list. Do not add, rename, or remove values without updating both the UI dropdown and any downstream AI prompts.

```ts
export type IncidentType =
  | 'BreachOfCourtOrder'
  | 'CancelledVisitations'
  | 'ChallengesDuringVisits'
  | 'ChildInvolvedInAdultDisputes'
  | 'CommunicationChallenges'
  | 'ConcernsOfSubstanceAbuse'
  | 'EmotionalHarm'
  | 'ImplementationOfCourtOrder'
  | 'IssuesInCoparenting'
  | 'PhysicalHarmConcerns'
  | 'UnsafeBehavior'
  | 'PostSeparationAbuse'
  | 'RequestForRestrainingOrder'
  | 'SuccessfulCoparentingMoments'
  | 'ScheduledMeeting'
  | 'OtherConcernsOrIssues'
  | 'InstancesOfPoorJudgment'
  | 'OngoingLitigation';
```

---

## AI Integration

### Model
`claude-sonnet-4-20250514` — do not downgrade to Haiku; legal accuracy requires Sonnet.

### API Call
```js
POST https://api.anthropic.com/v1/messages
{
  model: "claude-sonnet-4-20250514",
  max_tokens: 1200,
  messages: [{ role: "user", content: prompt }]
}
```

### Prompt Contract
The prompt instructs the model to return **only a JSON object** (no markdown fences). The shape must match the report state above. Key prompt rules:
- Every statute object must include a `plainLanguage` field: 1-2 sentences in plain English (no legalese) explaining what the law does and why it matters to a self-represented parent
- `primaryStatutes` always includes Divorce Act s.2(1) and s.16(4)
- `additionalStatutes` must include 1-2 province-specific statutes + Criminal Code if warranted
- `professionalSummary` paragraphs separated by `\n\n`
- `keyFlags`: 2–4 short legally significant phrases
- All statute URLs must point to `laws-lois.justice.gc.ca` or `ontario.ca/laws` (real URLs only)

### Response Parsing
```js
const raw = data.content?.find(b => b.type === 'text')?.text || '';
const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
```

### Error Handling
- Wrap in try/catch; on failure: set `err` message, return to step 1
- Do not expose raw API errors to the user

---

## Legal / Disclaimer Rules

**These rules are non-negotiable and must never be removed.**

1. Every generated report must end with: *"Statutory references provided for context only. Not legal advice."*
2. The footer disclaimer on every report card must read: *"Generated via CustodyBuddy · [date] · Statutory references provided for context only. Not legal advice."*
3. AI prompts must never claim to provide legal advice.
4. Statute URLs must link to official government sources only (`laws-lois.justice.gc.ca`, `ontario.ca/laws`, equivalent provincial sources).

---

## PDF Export

Current implementation uses `window.print()` with a `@media print` stylesheet that hides `.no-print` elements (buttons, nav). The rendered report card becomes the PDF content.

**Production upgrade path:** Replace with Puppeteer/Playwright server-side PDF generation or use the `pandoc` approach:
```bash
pandoc incident.md -o incident.pdf --standalone --pdf-engine=wkhtmltopdf
```

---

## Known Constraints & Gotchas

- **No `<form>` tags** — all interactions use React `onClick`/`onChange` handlers
- **No localStorage/sessionStorage** — all state lives in React `useState`
- **No external font loading** — use `Georgia, serif` as fallback in artifact context; Playfair Display loads via Google Fonts in the production app
- **Province selector defaults to Ontario** — most users are Canadian; the AI targets statutes to the selected province
- **Report numbering** — the artifact does not implement sequential report IDs; production should assign these from the Supabase `incident_reports` table
- **No auth** — this tool is intentionally public/no-login per the "free to use, no account needed" value prop

---

## Planned / Future Features

- [ ] Pattern detection: cross-reference previous reports from Supabase, surface "4th missed pickup in 90 days" type flags
- [ ] Email export: send report to lawyer or save to user's account
- [ ] Photo/evidence attachment: accept image uploads, embed in report
- [ ] Report history dashboard: list all past reports per user session
- [ ] Severity auto-suggestion based on incident type + details analysis
- [ ] French language support (Québec)

---

## File Map (Production App)

```
/src
  /components
    /IncidentReport
      IncidentReportForm.tsx       ← Step 1 form
      IncidentReportLoading.tsx    ← Step 2 spinner
      IncidentReportCard.tsx       ← Step 3 report display
      IncidentReportPage.tsx       ← Orchestrates steps + state
      types.ts                     ← IncidentType, Statute, ReportState
      constants.ts                 ← INCIDENT_TYPES array, PROVINCES array
  /lib
    generateReport.ts              ← API call + prompt construction
  /styles
    designSystem.ts                ← Color tokens, shared style objects
```

---

## Related Docs

- **CustodyBuddy PRD** — full product requirements (Google Drive)
- **Design System** — navy/gold token definitions, component patterns
- **CLAUDE.md (root)** — top-level project context
- **Incident Report Template** — `incident_report_template.md` (Google Drive) — the report format and legal classification structure this generator is based on