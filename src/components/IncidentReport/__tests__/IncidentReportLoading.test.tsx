import { render, screen } from '@testing-library/react';
import IncidentReportLoading from '../IncidentReportLoading';

describe('IncidentReportLoading', () => {
  it('renders the heading', () => {
    render(<IncidentReportLoading />);
    expect(screen.getByText('Generating Your Report')).toBeInTheDocument();
  });

  it('renders the status message', () => {
    render(<IncidentReportLoading />);
    expect(screen.getByText(/Analyzing incident/)).toBeInTheDocument();
  });
});
