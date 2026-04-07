import { generateReport } from '../generateReport';
import type { FormState } from '../../components/IncidentReport/types';

const mockForm: FormState = {
  incidentType: 'BreachOfCourtOrder',
  date: '2026-04-07',
  time: '14:30',
  severity: 'High',
  location: '123 Oak Street',
  witnesses: 'neighbour',
  details: 'The respondent failed to return the child at the agreed time.',
  province: 'Ontario',
};

const mockReport = {
  reportTitle: 'Breach of Pickup Time Agreement',
  professionalSummary: 'Para one.\n\nPara two.',
  legalClassification: 'This constitutes a breach of a court order.',
  primaryStatutes: [
    { name: 'Divorce Act — Family Violence', citation: 's. 2(1)', url: 'https://laws-lois.justice.gc.ca', plainLanguage: 'Explains family violence.' },
  ],
  additionalStatutes: [
    { name: 'Ontario CLRA', citation: 's. 24', url: 'https://ontario.ca/laws', plainLanguage: 'Best interests of the child.' },
  ],
  keyFlags: ['Missed pickup', 'Court order breach'],
};

const makeResponse = (body: object, ok = true) => ({
  ok,
  status: ok ? 200 : 502,
  statusText: ok ? 'OK' : 'Bad Gateway',
  json: jest.fn().mockResolvedValue(body),
});

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue(makeResponse(mockReport));
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('generateReport', () => {
  it('calls the local API route', async () => {
    await generateReport(mockForm, 'Breach of Court Order');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/generate-report'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('sends the prompt in the request body', async () => {
    await generateReport(mockForm, 'Breach of Court Order');
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.prompt).toContain('Ontario');
    expect(body.prompt).toContain('Breach of Court Order');
  });

  it('returns the parsed report data from the API route', async () => {
    const result = await generateReport(mockForm, 'Breach of Court Order');
    expect(result.reportTitle).toBe('Breach of Pickup Time Agreement');
    expect(result.keyFlags).toEqual(['Missed pickup', 'Court order breach']);
  });

  it('throws when the API route returns an error status', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(makeResponse({ error: 'Upstream API error' }, false));
    await expect(generateReport(mockForm, 'Breach of Court Order')).rejects.toThrow('Report generation failed');
  });
});
