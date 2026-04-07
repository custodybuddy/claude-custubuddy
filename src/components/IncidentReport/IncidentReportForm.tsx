import { C, lbl, inp, pageBackground } from '../../styles/designSystem';
import { INCIDENT_TYPES, PROVINCES } from './constants';
import type { FormState } from './types';

interface Props {
  form: FormState;
  err: string;
  onChange: (key: keyof FormState, value: string) => void;
  onGenerate: () => void;
}

export default function IncidentReportForm({ form, err, onChange, onGenerate }: Props) {
  return (
    <div style={{ minHeight: '100vh', background: pageBackground, padding: '24px', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(246,186,33,0.3)', background: 'rgba(246,186,33,0.07)', marginBottom: '14px' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.gold500 }} />
            <span style={{ fontSize: '10px', fontWeight: 700, color: C.gold500, textTransform: 'uppercase', letterSpacing: '0.12em' }}>AI-Powered Documentation</span>
          </div>
          <h1 style={{ fontFamily: 'Georgia,serif', color: '#fff', fontSize: '26px', margin: '0 0 8px' }}>Create Incident Report</h1>
          <p style={{ color: C.slate400, fontSize: '13px', margin: 0, lineHeight: 1.6 }}>Describe what happened. CustodyBuddy will generate a court-ready<br />report with legal classification and statute references.</p>
        </div>

        {/* Form card */}
        <div style={{ background: 'rgba(10,25,47,0.65)', border: '1px solid rgba(246,186,33,0.2)', borderRadius: '20px', padding: '28px', boxShadow: '0 0 30px rgba(246,186,33,0.05)' }}>
          {err && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', marginBottom: '18px' }}>{err}</div>}

          {/* Incident type */}
          <div style={{ marginBottom: '16px' }}>
            <label style={lbl}>Incident Type *</label>
            <select value={form.incidentType} onChange={e => onChange('incidentType', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
              <option value="">Select incident type…</option>
              {INCIDENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          {/* Row: date + time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={lbl}>Date *</label>
              <input type="date" value={form.date} onChange={e => onChange('date', e.target.value)} style={inp} />
            </div>
            <div>
              <label style={lbl}>Time</label>
              <input type="time" value={form.time} onChange={e => onChange('time', e.target.value)} style={inp} />
            </div>
          </div>

          {/* Row: severity + province */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={lbl}>Severity</label>
              <select value={form.severity} onChange={e => onChange('severity', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Province</label>
              <select value={form.province} onChange={e => onChange('province', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
                {PROVINCES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Row: location + witnesses */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={lbl}>Location</label>
              <input type="text" value={form.location} onChange={e => onChange('location', e.target.value)} placeholder="e.g. 123 Oak Street" style={inp} />
            </div>
            <div>
              <label style={lbl}>Witnesses</label>
              <input type="text" value={form.witnesses} onChange={e => onChange('witnesses', e.target.value)} placeholder="e.g. neighbour, dashcam" style={inp} />
            </div>
          </div>

          {/* Details */}
          <div style={{ marginBottom: '22px' }}>
            <label style={lbl}>What Happened? *</label>
            <textarea
              value={form.details}
              onChange={e => onChange('details', e.target.value)}
              placeholder="Describe the incident in your own words. What was said or done? How were you or your child affected? Be as specific as possible — dates, times, direct quotes, and observable behaviours are most useful."
              rows={6}
              style={{ ...inp, resize: 'vertical', lineHeight: 1.65 }}
            />
          </div>

          <button
            onClick={onGenerate}
            style={{ width: '100%', background: C.gold500, color: C.navy950, padding: '14px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', letterSpacing: '0.03em' }}
          >
            Generate Court-Ready Report →
          </button>

          <p style={{ textAlign: 'center', color: C.slate500, fontSize: '11px', marginTop: '12px', lineHeight: 1.6 }}>
            Free to use · No account needed · Not legal advice
          </p>
        </div>
      </div>
    </div>
  );
}
