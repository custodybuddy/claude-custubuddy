import type { CSSProperties } from 'react';

export const C = {
  navy950: '#020716',
  navy900: '#0A192F',
  navy850: '#0F182A',
  gold500: '#F6BA21',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
};

export const lbl: CSSProperties = {
  display: 'block',
  fontSize: '10px',
  fontWeight: 700,
  color: C.gold500,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '6px',
};

export const pageBackground = `linear-gradient(135deg,${C.navy950},${C.navy850})`;

export const inp: CSSProperties = {
  width: '100%',
  background: C.navy900,
  border: '1px solid rgba(246,186,33,0.2)',
  borderRadius: '8px',
  color: '#fff',
  padding: '10px 14px',
  fontSize: '13px',
  fontFamily: 'Inter,sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
};
