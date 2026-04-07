'use client';

import { useState } from 'react';
import { INCIDENT_TYPES } from './constants';
import { generateReport } from '../../lib/generateReport';
import type { FormState, ReportState } from './types';
import IncidentReportForm from './IncidentReportForm';
import IncidentReportLoading from './IncidentReportLoading';
import IncidentReportCard from './IncidentReportCard';

export default function IncidentReportPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    incidentType: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    severity: 'High',
    location: '',
    witnesses: '',
    details: '',
    province: 'Ontario',
  });
  const [report, setReport] = useState<ReportState | null>(null);
  const [err, setErr] = useState('');

  const handleChange = (key: keyof FormState, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  const handleGenerate = async () => {
    if (!form.incidentType || !form.details.trim()) {
      setErr('Please select an incident type and describe what happened.');
      return;
    }
    setErr('');
    setStep(2);
    const typeLabel = INCIDENT_TYPES.find(t => t.value === form.incidentType)?.label || form.incidentType;
    try {
      const parsed = await generateReport(form, typeLabel);
      setReport({ ...parsed, meta: { ...form, typeLabel, generated: new Date().toLocaleDateString('en-CA') } });
      setStep(3);
    } catch (error) {
      console.error('[generateReport]', error);
      setErr('Something went wrong generating the report. Please try again.');
      setStep(1);
    }
  };

  const handleNewReport = () => {
    setStep(1);
    setReport(null);
  };

  if (step === 2) return <IncidentReportLoading />;
  if (step === 3 && report) return <IncidentReportCard report={report} onNewReport={handleNewReport} />;

  return (
    <IncidentReportForm
      form={form}
      err={err}
      onChange={handleChange}
      onGenerate={handleGenerate}
    />
  );
}
