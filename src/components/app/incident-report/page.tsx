import { type CSSProperties, useState } from "react";

const INCIDENT_TYPES = [
  { value: 'BreachOfCourtOrder', label: 'Breach of Court Order' },
  { value: 'CancelledVisitations', label: 'Cancelled Visitations' },
  { value: 'ChallengesDuringVisits', label: 'Challenges During Visits' },
  { value: 'ChildInvolvedInAdultDisputes', label: 'Child Involved in Adult Disputes' },
  { value: 'CommunicationChallenges', label: 'Communication Challenges' },
  { value: 'ConcernsOfSubstanceAbuse', label: 'Concerns of Substance Abuse' },
  { value: 'EmotionalHarm', label: 'Emotional Harm' },
  { value: 'ImplementationOfCourtOrder', label: 'Implementation of Court Order' },
  { value: 'IssuesInCoparenting', label: 'Issues in Co-Parenting' },
  { value: 'PhysicalHarmConcerns', label: 'Physical Harm Concerns' },
  { value: 'UnsafeBehavior', label: 'Unsafe Behavior' },
  { value: 'PostSeparationAbuse', label: 'Post-Separation Abuse' },
  { value: 'RequestForRestrainingOrder', label: 'Request for Restraining Order' },
  { value: 'SuccessfulCoparentingMoments', label: 'Successful Co-Parenting Moments' },
  { value: 'ScheduledMeeting', label: 'Scheduled Meeting' },
  { value: 'OtherConcernsOrIssues', label: 'Other Concerns or Issues' },
  { value: 'InstancesOfPoorJudgment', label: 'Instances of Poor Judgment' },
  { value: 'OngoingLitigation', label: 'Ongoing Litigation' },
];

const PROVINCES = [
  'Ontario','British Columbia','Alberta','Quebec','Manitoba',
  'Saskatchewan','Nova Scotia','New Brunswick','PEI',
  'Newfoundland & Labrador','Northwest Territories','Yukon','Nunavut'
];

const C = {
  navy950: '#020716', navy900: '#0A192F', navy850: '#0F182A',
  gold500: '#F6BA21', slate300: '#cbd5e1', slate400: '#94a3b8', slate500: '#64748b',
};

const lbl: CSSProperties = {
  display:'block', fontSize:'10px', fontWeight:700, color:C.gold500,
  textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'6px',
};
const inp: CSSProperties = {
  width:'100%', background:C.navy900, border:'1px solid rgba(246,186,33,0.2)',
  borderRadius:'8px', color:'#fff', padding:'10px 14px', fontSize:'13px',
  fontFamily:'Inter,sans-serif', outline:'none', boxSizing:'border-box',
};

type FormState = {
  incidentType: string;
  date: string;
  time: string;
  severity: string;
  location: string;
  witnesses: string;
  details: string;
  province: string;
};

type AnthropicResponse = {
  content?: Array<{
    type?: string;
    text?: string;
  }>;
};

type Statute = {
  name: string;
  citation: string;
  url: string;
  plainLanguage?: string;
};

type ReportState = {
  reportTitle: string;
  professionalSummary: string;
  legalClassification: string;
  primaryStatutes?: Statute[];
  additionalStatutes?: Statute[];
  keyFlags?: string[];
  meta: FormState & {
    typeLabel: string;
    generated: string;
  };
};

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    incidentType:'', date: new Date().toISOString().split('T')[0],
    time:'', severity:'High', location:'', witnesses:'', details:'', province:'Ontario',
  });
  const [report, setReport] = useState<ReportState | null>(null);
  const [err, setErr] = useState('');
  const [openStatute, setOpenStatute] = useState<Record<number, boolean>>({});

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (!form.incidentType || !form.details.trim()) {
      setErr('Please select an incident type and describe what happened.');
      return;
    }
    setErr(''); setStep(2);
    const typeLabel = INCIDENT_TYPES.find(t => t.value === form.incidentType)?.label || form.incidentType;
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
    { "name": "Divorce Act — Family Violence", "citation": "s. 2(1)", "url": "https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-1.html#h-1172378" },
    { "name": "Divorce Act — Best Interests (Family Violence Factors)", "citation": "s. 16(4)", "url": "https://laws-lois.justice.gc.ca/eng/acts/d-3.4/page-3.html#h-1172571" }
  ],
  "additionalStatutes": [
    { "name": "Ontario Children's Law Reform Act — Best Interests", "citation": "s. 24", "url": "https://www.ontario.ca/laws/statute/90c12#BK9", "plainLanguage": "plain-language explanation here" }
  ],
  "keyFlags": ["flag1", "flag2", "flag3"]
}

For EVERY statute in primaryStatutes and additionalStatutes, include a "plainLanguage" field: 1-2 sentences in plain English (no legalese) explaining what this law does and why it matters for a self-represented parent in a custody dispute. For additionalStatutes, include 1-2 relevant ${form.province} statutes and any applicable Criminal Code section if warranted. keyFlags: 2-4 short legally significant phrases.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1200,
          messages:[{ role:"user", content:prompt }] })
      });
      const data: AnthropicResponse = await res.json();
      const raw = data.content?.find(b => b.type==='text')?.text || '';
      const parsed = JSON.parse(raw.replace(/```json|```/g,'').trim());
      setReport({ ...parsed, meta: { ...form, typeLabel, generated: new Date().toLocaleDateString('en-CA') } });
      setStep(3);
    } catch(e) {
      setErr('Something went wrong generating the report. Please try again.');
      setStep(1);
    }
  };

  // ── LOADING ──────────────────────────────────────────────────────
  if (step === 2) return (
    <div style={{ minHeight:'100vh', background:`linear-gradient(135deg,${C.navy950},${C.navy850})`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'20px', padding:'24px' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}`}</style>
      <div style={{ width:52, height:52, border:`3px solid ${C.gold500}`, borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.9s linear infinite' }} />
      <div style={{ textAlign:'center' }}>
        <h2 style={{ fontFamily:'Georgia,serif', color:'#fff', fontSize:'20px', margin:'0 0 8px' }}>Generating Your Report</h2>
        <p style={{ color:C.slate400, fontSize:'13px', margin:0, animation:'pulse 2s ease infinite' }}>Analyzing incident · Applying legal classification · Cross-referencing statutes…</p>
      </div>
    </div>
  );

  // ── REPORT ───────────────────────────────────────────────────────
  if (step === 3 && report) {
    const sevCol = report.meta.severity==='High' ? '#f87171' : report.meta.severity==='Medium' ? '#fbbf24' : '#34d399';
    const keyFlags = report.keyFlags ?? [];
    const allStatutes = [...(report.primaryStatutes||[]), ...(report.additionalStatutes||[])];
    return (
      <div style={{ minHeight:'100vh', background:`linear-gradient(135deg,${C.navy950},${C.navy850})`, padding:'24px', fontFamily:'Inter,sans-serif' }}>
        <style>{`@media print { .no-print{display:none!important} body{background:#fff} }`}</style>
        <div style={{ maxWidth:740, margin:'0 auto' }}>

          {/* Top bar */}
          <div className="no-print" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
            <div>
              <div style={{ fontSize:'10px', color:C.gold500, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'4px' }}>CUSTODYBUDDY.COM</div>
              <h1 style={{ fontFamily:'Georgia,serif', color:'#fff', fontSize:'20px', margin:0 }}>Incident Report Ready</h1>
            </div>
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={()=>{setStep(1);setReport(null);}} style={{ background:'transparent', border:`1px solid rgba(246,186,33,0.3)`, color:C.gold500, padding:'8px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'12px', fontWeight:600 }}>← New Report</button>
              <button onClick={()=>window.print()} style={{ background:C.gold500, color:C.navy950, padding:'8px 18px', borderRadius:'8px', cursor:'pointer', fontSize:'12px', fontWeight:700, border:'none' }}>⬇ Save PDF</button>
            </div>
          </div>

          {/* Card */}
          <div style={{ background:'rgba(10,25,47,0.7)', border:`1px solid ${C.gold500}`, borderRadius:'20px', overflow:'hidden', boxShadow:'0 0 40px rgba(246,186,33,0.12)' }}>

            {/* Card chrome bar */}
            <div style={{ background:'rgba(0,0,0,0.35)', borderBottom:'1px solid rgba(246,186,33,0.1)', padding:'11px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'8px' }}>
              <div style={{ display:'flex', gap:'6px' }}>{[0,1,2].map(i=><div key={i} style={{ width:10, height:10, borderRadius:'50%', background:C.slate500 }}/>)}</div>
              <span style={{ fontSize:'10px', color:C.slate500, fontFamily:'monospace' }}>incident_report_{report.meta.date}.pdf</span>
              <div style={{ display:'flex', alignItems:'center', gap:'5px', background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.3)', padding:'4px 10px', borderRadius:'20px' }}>
                <div style={{ width:6, height:6, background:'#4ade80', borderRadius:'50%' }}/>
                <span style={{ fontSize:'9px', fontWeight:700, color:'#4ade80', textTransform:'uppercase', letterSpacing:'0.08em' }}>Court Ready</span>
              </div>
            </div>

            <div style={{ padding:'24px' }}>

              {/* Title row */}
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'16px', marginBottom:'18px', flexWrap:'wrap' }}>
                <div>
                  <p style={{ fontSize:'10px', color:'rgba(246,186,33,0.55)', fontFamily:'monospace', textTransform:'uppercase', letterSpacing:'0.08em', margin:'0 0 4px' }}>{report.meta.typeLabel}</p>
                  <h2 style={{ fontFamily:'Georgia,serif', color:'#fff', fontSize:'20px', margin:'0 0 4px' }}>{report.reportTitle}</h2>
                  <p style={{ color:C.slate400, fontSize:'12px', margin:0 }}>
                    {report.meta.date}{report.meta.time ? ` · ${report.meta.time}` : ''}{report.meta.location ? ` · ${report.meta.location}` : ''}
                  </p>
                </div>
                <span style={{ background:`${sevCol}22`, border:`1px solid ${sevCol}55`, color:sevCol, fontSize:'9px', fontWeight:700, padding:'5px 12px', borderRadius:'20px', textTransform:'uppercase', letterSpacing:'0.08em', flexShrink:0 }}>{report.meta.severity} Priority</span>
              </div>

              <div style={{ height:1, background:'rgba(246,186,33,0.1)', marginBottom:'18px' }}/>

              {/* Flags */}
              {keyFlags.length > 0 && (
                <div style={{ marginBottom:'18px' }}>
                  <p style={lbl}>Key Legal Flags</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                    {keyFlags.map((f,i)=>(
                      <span key={i} style={{ background:'rgba(246,186,33,0.07)', border:'1px solid rgba(246,186,33,0.2)', color:C.slate300, fontSize:'11px', padding:'5px 12px', borderRadius:'20px' }}>{f}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Detail pills */}
              {(report.meta.location || report.meta.witnesses) && (
                <div style={{ display:'flex', gap:'16px', flexWrap:'wrap', marginBottom:'18px' }}>
                  {report.meta.location && <div style={{ display:'flex', gap:'10px' }}><span style={{ fontSize:'9px', color:C.slate500, textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:700, paddingTop:2 }}>Location</span><span style={{ color:C.slate300, fontSize:'12px' }}>{report.meta.location}</span></div>}
                  {report.meta.witnesses && <div style={{ display:'flex', gap:'10px' }}><span style={{ fontSize:'9px', color:C.slate500, textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:700, paddingTop:2 }}>Witnesses</span><span style={{ color:C.slate300, fontSize:'12px' }}>{report.meta.witnesses}</span></div>}
                </div>
              )}

              <div style={{ height:1, background:'rgba(246,186,33,0.1)', marginBottom:'18px' }}/>

              {/* Summary */}
              <div style={{ marginBottom:'18px' }}>
                <p style={lbl}>Professional Summary</p>
                <div style={{ background:'rgba(246,186,33,0.03)', border:'1px solid rgba(246,186,33,0.08)', borderRadius:'12px', padding:'16px' }}>
                  {report.professionalSummary.split('\n\n').filter(Boolean).map((para,i)=>(
                    <p key={i} style={{ color:C.slate300, fontSize:'13px', lineHeight:1.75, margin: i>0 ? '12px 0 0' : 0 }}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Legal Classification */}
              <div style={{ marginBottom:'18px', background:'rgba(246,186,33,0.05)', border:'1px solid rgba(246,186,33,0.15)', borderRadius:'12px', padding:'16px', display:'flex', gap:'14px', alignItems:'flex-start' }}>
                <div style={{ width:34, height:34, background:'rgba(246,186,33,0.1)', border:'1px solid rgba(246,186,33,0.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="16" height="16" fill="none" stroke={C.gold500} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <div>
                  <p style={{ ...lbl, marginBottom:'6px' }}>AI Legal Classification</p>
                  <p style={{ color:C.slate300, fontSize:'13px', lineHeight:1.65, margin:0 }}>{report.legalClassification}</p>
                </div>
              </div>

              {/* Statutes */}
              <div>
                <p style={lbl}>Applicable Statutes</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                  {allStatutes.map((s,i)=>{
                    const isOpen = !!openStatute[i];
                    return (
                      <div key={i} style={{ background:'rgba(10,25,47,0.7)', border:`1px solid ${isOpen ? 'rgba(246,186,33,0.35)' : 'rgba(246,186,33,0.1)'}`, borderRadius:'10px', overflow:'hidden', transition:'border-color 0.2s' }}>
                        {/* Row */}
                        <div style={{ padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', flexWrap:'wrap' }}>
                          <div style={{ flex:1, minWidth:180 }}>
                            <p style={{ color:'#fff', fontSize:'13px', fontWeight:600, margin:'0 0 2px' }}>{s.name}</p>
                            <p style={{ color:C.slate400, fontSize:'11px', margin:0 }}>{s.citation}</p>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>
                            {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color:C.gold500, fontSize:'11px', fontWeight:700, textDecoration:'none' }}>View →</a>}
                            {s.plainLanguage && (
                              <button onClick={()=>setOpenStatute(p=>({...p,[i]:!p[i]}))}
                                style={{ display:'flex', alignItems:'center', gap:'5px', background:'rgba(246,186,33,0.08)', border:'1px solid rgba(246,186,33,0.25)', color:C.gold500, padding:'5px 10px', borderRadius:'20px', cursor:'pointer', fontSize:'11px', fontWeight:700, transition:'background 0.2s' }}>
                                <span>{isOpen ? 'Hide' : 'What is this?'}</span>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.2s' }}>
                                  <path d="M2 3.5L5 6.5L8 3.5" stroke="#F6BA21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                        {/* Expandable plain-language panel */}
                        {isOpen && s.plainLanguage && (
                          <div style={{ padding:'12px 16px 14px', borderTop:'1px solid rgba(246,186,33,0.1)', background:'rgba(246,186,33,0.04)', display:'flex', gap:'12px', alignItems:'flex-start' }}>
                            <div style={{ width:22, height:22, borderRadius:'50%', background:'rgba(246,186,33,0.12)', border:'1px solid rgba(246,186,33,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#F6BA21" strokeWidth="1.2"/><path d="M6 5.5V8.5M6 3.5V4.5" stroke="#F6BA21" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            </div>
                            <p style={{ color:C.slate300, fontSize:'12px', lineHeight:1.7, margin:0 }}>{s.plainLanguage}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding:'12px 24px', background:'rgba(0,0,0,0.25)', borderTop:'1px solid rgba(246,186,33,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'8px' }}>
              <span style={{ color:C.slate500, fontSize:'11px' }}>Generated via CustodyBuddy · {report.meta.generated}</span>
              <span style={{ color:C.slate500, fontSize:'11px', fontStyle:'italic' }}>Statutory references provided for context only. Not legal advice.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM ─────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', background:`linear-gradient(135deg,${C.navy950},${C.navy850})`, padding:'24px', fontFamily:'Inter,sans-serif' }}>
      <div style={{ maxWidth:620, margin:'0 auto' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'28px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'5px 14px', borderRadius:'20px', border:'1px solid rgba(246,186,33,0.3)', background:'rgba(246,186,33,0.07)', marginBottom:'14px' }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:C.gold500 }}/>
            <span style={{ fontSize:'10px', fontWeight:700, color:C.gold500, textTransform:'uppercase', letterSpacing:'0.12em' }}>AI-Powered Documentation</span>
          </div>
          <h1 style={{ fontFamily:'Georgia,serif', color:'#fff', fontSize:'26px', margin:'0 0 8px' }}>Create Incident Report</h1>
          <p style={{ color:C.slate400, fontSize:'13px', margin:0, lineHeight:1.6 }}>Describe what happened. CustodyBuddy will generate a court-ready<br/>report with legal classification and statute references.</p>
        </div>

        {/* Form card */}
        <div style={{ background:'rgba(10,25,47,0.65)', border:'1px solid rgba(246,186,33,0.2)', borderRadius:'20px', padding:'28px', boxShadow:'0 0 30px rgba(246,186,33,0.05)' }}>
          {err && <div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#f87171', padding:'10px 14px', borderRadius:'8px', fontSize:'12px', marginBottom:'18px' }}>{err}</div>}

          {/* Incident type — full width */}
          <div style={{ marginBottom:'16px' }}>
            <label style={lbl}>Incident Type *</label>
            <select value={form.incidentType} onChange={e=>set('incidentType',e.target.value)} style={{ ...inp, cursor:'pointer' }}>
              <option value="">Select incident type…</option>
              {INCIDENT_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          {/* Row: date + time */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'16px' }}>
            <div>
              <label style={lbl}>Date *</label>
              <input type="date" value={form.date} onChange={e=>set('date',e.target.value)} style={inp}/>
            </div>
            <div>
              <label style={lbl}>Time</label>
              <input type="time" value={form.time} onChange={e=>set('time',e.target.value)} style={inp}/>
            </div>
          </div>

          {/* Row: severity + province */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'16px' }}>
            <div>
              <label style={lbl}>Severity</label>
              <select value={form.severity} onChange={e=>set('severity',e.target.value)} style={{ ...inp, cursor:'pointer' }}>
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Province</label>
              <select value={form.province} onChange={e=>set('province',e.target.value)} style={{ ...inp, cursor:'pointer' }}>
                {PROVINCES.map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Row: location + witnesses */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'16px' }}>
            <div>
              <label style={lbl}>Location</label>
              <input type="text" value={form.location} onChange={e=>set('location',e.target.value)} placeholder="e.g. 123 Oak Street" style={inp}/>
            </div>
            <div>
              <label style={lbl}>Witnesses</label>
              <input type="text" value={form.witnesses} onChange={e=>set('witnesses',e.target.value)} placeholder="e.g. neighbour, dashcam" style={inp}/>
            </div>
          </div>

          {/* Details */}
          <div style={{ marginBottom:'22px' }}>
            <label style={lbl}>What Happened? *</label>
            <textarea value={form.details} onChange={e=>set('details',e.target.value)}
              placeholder="Describe the incident in your own words. What was said or done? How were you or your child affected? Be as specific as possible — dates, times, direct quotes, and observable behaviours are most useful."
              rows={6} style={{ ...inp, resize:'vertical', lineHeight:1.65 }}/>
          </div>

          <button onClick={generate}
            style={{ width:'100%', background:C.gold500, color:C.navy950, padding:'14px', borderRadius:'10px', fontWeight:700, fontSize:'14px', border:'none', cursor:'pointer', letterSpacing:'0.03em' }}>
            Generate Court-Ready Report →
          </button>

          <p style={{ textAlign:'center', color:C.slate500, fontSize:'11px', marginTop:'12px', lineHeight:1.6 }}>
            Free to use · No account needed · Not legal advice
          </p>
        </div>
      </div>
    </div>
  );
}
