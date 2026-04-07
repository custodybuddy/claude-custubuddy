export type IncidentType =
  | 'BreachOfCourtOrder'
  | 'CancelledVisitations'
  | 'ChallengesDuringVisits'
  | 'ChildInvolvedInAdultDisputes'
  | 'CommunicationChallenges'
  | 'ConcernsOfSubstanceAbuse'
  | 'EmotionalHarm'
  | 'ImplementationOfCourtOrder'
  | 'IssuesInCoparenting'
  | 'PhysicalHarmConcerns'
  | 'UnsafeBehavior'
  | 'PostSeparationAbuse'
  | 'RequestForRestrainingOrder'
  | 'SuccessfulCoparentingMoments'
  | 'ScheduledMeeting'
  | 'OtherConcernsOrIssues'
  | 'InstancesOfPoorJudgment'
  | 'OngoingLitigation';

export interface Statute {
  name: string;
  citation: string;
  url: string;
  plainLanguage?: string;
}

export interface FormState {
  incidentType: string;
  date: string;
  time: string;
  severity: 'High' | 'Medium' | 'Low';
  location: string;
  witnesses: string;
  details: string;
  province: string;
}

export interface ReportState {
  reportTitle: string;
  professionalSummary: string;
  legalClassification: string;
  primaryStatutes: Statute[];
  additionalStatutes: Statute[];
  keyFlags: string[];
  meta: FormState & { typeLabel: string; generated: string };
}
