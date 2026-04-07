import { useState } from 'react';
import { C, lbl, pageBackground } from '../../styles/designSystem';
import type { ReportState } from './types';

interface Props {
  report: ReportState;
  onNewReport: () => void;
}

export default function IncidentReportCard({ report, onNewReport }: Props) {
  const [openStatute, setOpenStatute] = useState<Record<number, boolean>>({});

  const sevCol = report.meta.severity === 'High' ? '#f87171' : report.meta.severity === 'Medium' ? '#fbbf24' : '#34d399';
  const allStatutes = [...(report.primaryStatutes || []), ...(report.additionalStatutes || [])];

  return (
    <div style={{ minHeight: '100vh', background: pageBackground, padding: '24px', fontFamily: 'Inter,sans-serif' }}>
      <style>{`@media print { .no-print{display:none!important} body{background:#fff} }`}</style>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>

        {/* Top bar */}
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '10px', color: C.gold500, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>CUSTODYBUDDY.COM</div>
            <h1 style={{ fontFamily: 'Georgia,serif', color: '#fff', fontSize: '20px', margin: 0 }}>Incident Report Ready</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onNewReport} style={{ background: 'transparent', border: '1px solid rgba(246,186,33,0.3)', color: C.gold500, padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>← New Report</button>
            <button onClick={() => window.print()} style={{ background: C.gold500, color: C.navy950, padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, border: 'none' }}>⬇ Save PDF</button>
          </div>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(10,25,47,0.7)', border: `1px solid ${C.gold500}`, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 40px rgba(246,186,33,0.12)' }}>

          {/* Card chrome bar */}
          <div style={{ background: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(246,186,33,0.1)', padding: '11px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: C.slate500 }} />)}
            </div>
            <span style={{ fontSize: '10px', color: C.slate500, fontFamily: 'monospace' }}>incident_report_{report.meta.date}.pdf</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', padding: '4px 10px', borderRadius: '20px' }}>
              <div style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%' }} />
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Court Ready</span>
            </div>
          </div>

          <div style={{ padding: '24px' }}>

            {/* Title row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '10px', color: 'rgba(246,186,33,0.55)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>{report.meta.typeLabel}</p>
                <h2 style={{ fontFamily: 'Georgia,serif', color: '#fff', fontSize: '20px', margin: '0 0 4px' }}>{report.reportTitle}</h2>
                <p style={{ color: C.slate400, fontSize: '12px', margin: 0 }}>
                  {report.meta.date}{report.meta.time ? ` · ${report.meta.time}` : ''}{report.meta.location ? ` · ${report.meta.location}` : ''}
                </p>
              </div>
              <span style={{ background: `${sevCol}22`, border: `1px solid ${sevCol}55`, color: sevCol, fontSize: '9px', fontWeight: 700, padding: '5px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>{report.meta.severity} Priority</span>
            </div>

            <div style={{ height: 1, background: 'rgba(246,186,33,0.1)', marginBottom: '18px' }} />

            {/* Flags */}
            {report.keyFlags?.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <p style={lbl}>Key Legal Flags</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {report.keyFlags.map((f, i) => (
                    <span key={i} style={{ background: 'rgba(246,186,33,0.07)', border: '1px solid rgba(246,186,33,0.2)', color: C.slate300, fontSize: '11px', padding: '5px 12px', borderRadius: '20px' }}>{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Detail pills */}
            {(report.meta.location || report.meta.witnesses) && (
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {report.meta.location && <div style={{ display: 'flex', gap: '10px' }}><span style={{ fontSize: '9px', color: C.slate500, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, paddingTop: 2 }}>Location</span><span style={{ color: C.slate300, fontSize: '12px' }}>{report.meta.location}</span></div>}
                {report.meta.witnesses && <div style={{ display: 'flex', gap: '10px' }}><span style={{ fontSize: '9px', color: C.slate500, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, paddingTop: 2 }}>Witnesses</span><span style={{ color: C.slate300, fontSize: '12px' }}>{report.meta.witnesses}</span></div>}
              </div>
            )}

            <div style={{ height: 1, background: 'rgba(246,186,33,0.1)', marginBottom: '18px' }} />

            {/* Summary */}
            <div style={{ marginBottom: '18px' }}>
              <p style={lbl}>Professional Summary</p>
              <div style={{ background: 'rgba(246,186,33,0.03)', border: '1px solid rgba(246,186,33,0.08)', borderRadius: '12px', padding: '16px' }}>
                {report.professionalSummary.split('\n\n').filter(Boolean).map((para, i) => (
                  <p key={i} style={{ color: C.slate300, fontSize: '13px', lineHeight: 1.75, margin: i > 0 ? '12px 0 0' : 0 }}>{para}</p>
                ))}
              </div>
            </div>

            {/* Legal Classification */}
            <div style={{ marginBottom: '18px', background: 'rgba(246,186,33,0.05)', border: '1px solid rgba(246,186,33,0.15)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: 34, height: 34, background: 'rgba(246,186,33,0.1)', border: '1px solid rgba(246,186,33,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" fill="none" stroke={C.gold500} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <div>
                <p style={{ ...lbl, marginBottom: '6px' }}>AI Legal Classification</p>
                <p style={{ color: C.slate300, fontSize: '13px', lineHeight: 1.65, margin: 0 }}>{report.legalClassification}</p>
              </div>
            </div>

            {/* Statutes */}
            <div>
              <p style={lbl}>Applicable Statutes</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {allStatutes.map((s, i) => {
                  const isOpen = !!openStatute[i];
                  return (
                    <div key={i} style={{ background: 'rgba(10,25,47,0.7)', border: `1px solid ${isOpen ? 'rgba(246,186,33,0.35)' : 'rgba(246,186,33,0.1)'}`, borderRadius: '10px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 180 }}>
                          <p style={{ color: '#fff', fontSize: '13px', fontWeight: 600, margin: '0 0 2px' }}>{s.name}</p>
                          <p style={{ color: C.slate400, fontSize: '11px', margin: 0 }}>{s.citation}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                          {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: C.gold500, fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}>View →</a>}
                          {s.plainLanguage && (
                            <button
                              onClick={() => setOpenStatute(p => ({ ...p, [i]: !p[i] }))}
                              style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(246,186,33,0.08)', border: '1px solid rgba(246,186,33,0.25)', color: C.gold500, padding: '5px 10px', borderRadius: '20px', cursor: 'pointer', fontSize: '11px', fontWeight: 700, transition: 'background 0.2s' }}
                            >
                              <span>{isOpen ? 'Hide' : 'What is this?'}</span>
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                                <path d="M2 3.5L5 6.5L8 3.5" stroke="#F6BA21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                      {isOpen && s.plainLanguage && (
                        <div style={{ padding: '12px 16px 14px', borderTop: '1px solid rgba(246,186,33,0.1)', background: 'rgba(246,186,33,0.04)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(246,186,33,0.12)', border: '1px solid rgba(246,186,33,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#F6BA21" strokeWidth="1.2" /><path d="M6 5.5V8.5M6 3.5V4.5" stroke="#F6BA21" strokeWidth="1.2" strokeLinecap="round" /></svg>
                          </div>
                          <p style={{ color: C.slate300, fontSize: '12px', lineHeight: 1.7, margin: 0 }}>{s.plainLanguage}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: '12px 24px', background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(246,186,33,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: C.slate500, fontSize: '11px' }}>Generated via CustodyBuddy · {report.meta.generated}</span>
            <span style={{ color: C.slate500, fontSize: '11px', fontStyle: 'italic' }}>Statutory references provided for context only. Not legal advice.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
