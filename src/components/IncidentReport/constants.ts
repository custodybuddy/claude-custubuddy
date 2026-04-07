import type { IncidentType } from './types';

export const INCIDENT_TYPES: { value: IncidentType; label: string }[] = [
  { value: 'BreachOfCourtOrder', label: 'Breach of Court Order' },
  { value: 'CancelledVisitations', label: 'Cancelled Visitations' },
  { value: 'ChallengesDuringVisits', label: 'Challenges During Visits' },
  { value: 'ChildInvolvedInAdultDisputes', label: 'Child Involved in Adult Disputes' },
  { value: 'CommunicationChallenges', label: 'Communication Challenges' },
  { value: 'ConcernsOfSubstanceAbuse', label: 'Concerns of Substance Abuse' },
  { value: 'EmotionalHarm', label: 'Emotional Harm' },
  { value: 'ImplementationOfCourtOrder', label: 'Implementation of Court Order' },
  { value: 'IssuesInCoparenting', label: 'Issues in Co-Parenting' },
  { value: 'PhysicalHarmConcerns', label: 'Physical Harm Concerns' },
  { value: 'UnsafeBehavior', label: 'Unsafe Behavior' },
  { value: 'PostSeparationAbuse', label: 'Post-Separation Abuse' },
  { value: 'RequestForRestrainingOrder', label: 'Request for Restraining Order' },
  { value: 'SuccessfulCoparentingMoments', label: 'Successful Co-Parenting Moments' },
  { value: 'ScheduledMeeting', label: 'Scheduled Meeting' },
  { value: 'OtherConcernsOrIssues', label: 'Other Concerns or Issues' },
  { value: 'InstancesOfPoorJudgment', label: 'Instances of Poor Judgment' },
  { value: 'OngoingLitigation', label: 'Ongoing Litigation' },
];

export const PROVINCES: string[] = [
  'Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Manitoba',
  'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'PEI',
  'Newfoundland & Labrador', 'Northwest Territories', 'Yukon', 'Nunavut',
];
