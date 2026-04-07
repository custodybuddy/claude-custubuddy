import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IncidentReportForm from '../IncidentReportForm';
import type { FormState } from '../types';

const defaultForm: FormState = {
  incidentType: '',
  date: '2026-04-07',
  time: '',
  severity: 'High',
  location: '',
  witnesses: '',
  details: '',
  province: 'Ontario',
};

const noop = () => {};

describe('IncidentReportForm', () => {
  it('renders all form fields', () => {
    render(<IncidentReportForm form={defaultForm} err="" onChange={noop} onGenerate={noop} />);
    expect(screen.getAllByRole('combobox')).toHaveLength(3); // incident type, severity, province
    expect(screen.getAllByRole('textbox')).toHaveLength(3); // location, witnesses, details textarea
    expect(screen.getByPlaceholderText(/Describe the incident/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('2026-04-07')).toBeInTheDocument(); // date input
  });

  it('renders the submit button', () => {
    render(<IncidentReportForm form={defaultForm} err="" onChange={noop} onGenerate={noop} />);
    expect(screen.getByRole('button', { name: /Generate Court-Ready Report/i })).toBeInTheDocument();
  });

  it('displays an error message when err is set', () => {
    render(<IncidentReportForm form={defaultForm} err="Please fill in required fields." onChange={noop} onGenerate={noop} />);
    expect(screen.getByText('Please fill in required fields.')).toBeInTheDocument();
  });

  it('does not display error block when err is empty', () => {
    render(<IncidentReportForm form={defaultForm} err="" onChange={noop} onGenerate={noop} />);
    expect(screen.queryByText('Please fill in required fields.')).not.toBeInTheDocument();
  });

  it('calls onChange when incident type is changed', async () => {
    const onChange = jest.fn();
    render(<IncidentReportForm form={defaultForm} err="" onChange={onChange} onGenerate={noop} />);
    await userEvent.selectOptions(screen.getAllByRole('combobox')[0], 'BreachOfCourtOrder');
    expect(onChange).toHaveBeenCalledWith('incidentType', 'BreachOfCourtOrder');
  });

  it('calls onChange when details are typed', async () => {
    const onChange = jest.fn();
    render(<IncidentReportForm form={defaultForm} err="" onChange={onChange} onGenerate={noop} />);
    await userEvent.type(screen.getByPlaceholderText(/Describe the incident/i), 'A');
    expect(onChange).toHaveBeenCalledWith('details', 'A');
  });

  it('calls onGenerate when the submit button is clicked', async () => {
    const onGenerate = jest.fn();
    render(<IncidentReportForm form={defaultForm} err="" onChange={noop} onGenerate={onGenerate} />);
    await userEvent.click(screen.getByRole('button', { name: /Generate Court-Ready Report/i }));
    expect(onGenerate).toHaveBeenCalledTimes(1);
  });

  it('shows disclaimer text', () => {
    render(<IncidentReportForm form={defaultForm} err="" onChange={noop} onGenerate={noop} />);
    expect(screen.getByText(/Not legal advice/i)).toBeInTheDocument();
  });
});
