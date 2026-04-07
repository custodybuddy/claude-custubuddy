import { INCIDENT_TYPES, PROVINCES } from '../constants';

describe('INCIDENT_TYPES', () => {
  it('has 18 entries', () => {
    expect(INCIDENT_TYPES).toHaveLength(18);
  });

  it('every entry has a non-empty value and label', () => {
    for (const t of INCIDENT_TYPES) {
      expect(t.value).toBeTruthy();
      expect(t.label).toBeTruthy();
    }
  });

  it('values are unique', () => {
    const values = INCIDENT_TYPES.map(t => t.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it('includes BreachOfCourtOrder', () => {
    expect(INCIDENT_TYPES.find(t => t.value === 'BreachOfCourtOrder')).toBeDefined();
  });
});

describe('PROVINCES', () => {
  it('has 13 entries', () => {
    expect(PROVINCES).toHaveLength(13);
  });

  it('includes Ontario as the first entry (default)', () => {
    expect(PROVINCES[0]).toBe('Ontario');
  });

  it('includes all major provinces', () => {
    expect(PROVINCES).toContain('British Columbia');
    expect(PROVINCES).toContain('Alberta');
    expect(PROVINCES).toContain('Quebec');
  });
});
