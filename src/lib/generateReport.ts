import type { FormState, ReportState } from '../components/IncidentReport/types';

type RawReport = Omit<ReportState, 'meta'>;

export async function generateReport(form: FormState, typeLabel: string): Promise<RawReport> {
  const prompt = `You are a legal documentation assistant for CustodyBuddy, a co-parenting toolkit for self-represented Canadian parents. Generate a professional, court-ready incident report.

INCIDENT DETAILS:
- Type: ${typeLabel}
- Date: ${form.date}
- Time: ${form.time || 'Not specified'}
- Severity: ${form.severity}
- Location: ${form.location || 'Not specified'}
- Witnesses: ${form.witnesses || 'None noted'}
- Province: ${form.province}
- User description: ${form.details}

Respond ONLY with a valid JSON object (no markdown, no fences) with this exact structure:
{
  "reportTitle": "4-8 word title describing this specific incident",
  "professionalSummary": "2-3 paragraphs. Objective, third-person, court-appropriate. Para 1: date/time/type/location. Para 2: respondent behaviour and impact on child/reporter. Para 3: pattern context or escalation language if applicable. Use \\n\\n between paragraphs.",
  "legalClassification": "1-2 sentences classifying the legal nature of this behaviour.",
  "primaryStatutes": [
    { "name": "Divorce Act — Family Violence", "citation": "s. 2(1)", "url": "https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-1.html#h-1172378", "plainLanguage": "plain-language explanation here" },
    { "name": "Divorce Act — Best Interests (Family Violence Factors)", "citation": "s. 16(4)", "url": "https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-3.html#h-1172571", "plainLanguage": "plain-language explanation here" }
  ],
  "additionalStatutes": [
    { "name": "Ontario Children's Law Reform Act — Best Interests", "citation": "s. 24", "url": "https://www.ontario.ca/laws/statute/90c12#BK9", "plainLanguage": "plain-language explanation here" }
  ],
  "keyFlags": ["flag1", "flag2", "flag3"]
}

For EVERY statute in primaryStatutes and additionalStatutes, include a "plainLanguage" field: 1-2 sentences in plain English (no legalese) explaining what this law does and why it matters for a self-represented parent in a custody dispute. For additionalStatutes, include 1-2 relevant ${form.province} statutes and any applicable Criminal Code section if warranted. keyFlags: 2-4 short legally significant phrases.`;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '/api';
  const res = await fetch(`${apiUrl}/generate-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error(`Report generation failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<RawReport>;
}
