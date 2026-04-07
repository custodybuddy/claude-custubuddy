import { NextRequest, NextResponse } from 'next/server';

const MODEL = 'claude-sonnet-4-20250514';
const FENCE_RE = /```json|```/g;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[generate-report] Anthropic error:', res.status, text);
    return NextResponse.json({ error: 'Upstream API error' }, { status: 502 });
  }

  const data = await res.json();
  const raw = data.content?.find((b: { type: string; text?: string }) => b.type === 'text')?.text ?? '';

  try {
    const report = JSON.parse(raw.replace(FENCE_RE, '').trim());
    return NextResponse.json(report);
  } catch {
    console.error('[generate-report] Failed to parse Claude response:', raw);
    return NextResponse.json({ error: 'Invalid response from AI' }, { status: 502 });
  }
}
