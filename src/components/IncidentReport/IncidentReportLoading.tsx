import { C, pageBackground } from '../../styles/designSystem';

export default function IncidentReportLoading() {
  return (
    <div style={{ minHeight: '100vh', background: pageBackground, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '24px' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}`}</style>
      <div style={{ width: 52, height: 52, border: `3px solid ${C.gold500}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia,serif', color: '#fff', fontSize: '20px', margin: '0 0 8px' }}>Generating Your Report</h2>
        <p style={{ color: C.slate400, fontSize: '13px', margin: 0, animation: 'pulse 2s ease infinite' }}>Analyzing incident · Applying legal classification · Cross-referencing statutes…</p>
      </div>
    </div>
  );
}
