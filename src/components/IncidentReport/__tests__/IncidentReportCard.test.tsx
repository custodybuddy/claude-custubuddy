import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IncidentReportCard from '../IncidentReportCard';
import type { ReportState } from '../types';

const mockReport: ReportState = {
  reportTitle: 'Missed Pickup at School',
  professionalSummary: 'First paragraph.\n\nSecond paragraph.',
  legalClassification: 'This constitutes a breach of a court order under the Divorce Act.',
  primaryStatutes: [
    { name: 'Divorce Act — Family Violence', citation: 's. 2(1)', url: 'https://laws-lois.justice.gc.ca', plainLanguage: 'Defines family violence broadly.' },
  ],
  additionalStatutes: [
    { name: 'Ontario CLRA', citation: 's. 24', url: 'https://ontario.ca/laws', plainLanguage: 'Best interests of the child standard.' },
  ],
  keyFlags: ['Missed pickup', 'Court order breach', 'Child welfare risk'],
  meta: {
    incidentType: 'BreachOfCourtOrder',
    date: '2026-04-07',
    time: '15:00',
    severity: 'High',
    location: '123 Oak Street',
    witnesses: 'neighbour',
    details: 'Respondent failed to pick up child.',
    province: 'Ontario',
    typeLabel: 'Breach of Court Order',
    generated: '2026-04-07',
  },
};

describe('IncidentReportCard', () => {
  it('renders the report title', () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    expect(screen.getByText('Missed Pickup at School')).toBeInTheDocument();
  });

  it('renders both summary paragraphs', () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
  });

  it('renders all key flags', () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    expect(screen.getByText('Missed pickup')).toBeInTheDocument();
    expect(screen.getByText('Court order breach')).toBeInTheDocument();
    expect(screen.getByText('Child welfare risk')).toBeInTheDocument();
  });

  it('renders the legal classification', () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    expect(screen.getByText(/breach of a court order/i)).toBeInTheDocument();
  });

  it('renders statute names', () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    expect(screen.getByText('Divorce Act — Family Violence')).toBeInTheDocument();
    expect(screen.getByText('Ontario CLRA')).toBeInTheDocument();
  });

  it('renders the footer disclaimer', () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    expect(screen.getByText(/Statutory references provided for context only\. Not legal advice\./i)).toBeInTheDocument();
  });

  it('expands plain language explanation on "What is this?" click', async () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    const buttons = screen.getAllByRole('button', { name: /What is this\?/i });
    await userEvent.click(buttons[0]);
    expect(screen.getByText('Defines family violence broadly.')).toBeInTheDocument();
  });

  it('collapses plain language on second click', async () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    const buttons = screen.getAllByRole('button', { name: /What is this\?/i });
    await userEvent.click(buttons[0]);
    await userEvent.click(screen.getByRole('button', { name: /Hide/i }));
    expect(screen.queryByText('Defines family violence broadly.')).not.toBeInTheDocument();
  });

  it('calls onNewReport when "New Report" is clicked', async () => {
    const onNewReport = jest.fn();
    render(<IncidentReportCard report={mockReport} onNewReport={onNewReport} />);
    await userEvent.click(screen.getByRole('button', { name: /New Report/i }));
    expect(onNewReport).toHaveBeenCalledTimes(1);
  });

  it('renders severity badge', () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    expect(screen.getByText(/High Priority/i)).toBeInTheDocument();
  });

  it('renders location and witnesses', () => {
    render(<IncidentReportCard report={mockReport} onNewReport={() => {}} />);
    expect(screen.getByText('123 Oak Street')).toBeInTheDocument();
    expect(screen.getByText('neighbour')).toBeInTheDocument();
  });
});
