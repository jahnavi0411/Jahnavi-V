/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ModuleStatus = 'validated' | 'under_revision' | 'draft';

export type BloomsTaxonomyLevel = 
  | 'Remembering (L1)'
  | 'Understanding (L2)'
  | 'Applying (L3)'
  | 'Analyzing (L4)'
  | 'Evaluating (L5)'
  | 'Creating (L6)';

export interface AssessmentLinkage {
  id: string;
  name: string;
  weightPercentage: number; // e.g. 35%
  type: 'Exam' | 'Project' | 'Lab Practicum' | 'Peer Review' | 'Oral Defense' | 'Problem Set';
  thresholdCriteria: string; // e.g. "Score >= 75%"
  currentCohortAttainment: number; // e.g. 84.5%
}

export interface LearningOutcome {
  id: string;
  code: string; // e.g. "CS-LO-301.1"
  description: string;
  bloomsLevel: BloomsTaxonomyLevel;
  abetStudentOutcomes: string[]; // e.g. ["SO-1", "SO-2", "SO-6"]
  wascCompetencies: string[]; // e.g. ["Critical Thinking", "Quantitative Reasoning"]
  assessments: AssessmentLinkage[];
  targetAttainmentRate: number; // e.g. 80%
  measuredAttainmentRate: number; // e.g. 86.2%
  status: 'compliant' | 'review_required' | 'unmapped';
}

export interface CreditHourBreakdown {
  lectureHoursWeekly: number; // e.g. 3.0
  labHoursWeekly: number; // e.g. 2.0
  outsideStudyHoursWeekly: number; // e.g. 7.0
  semesterWeeks: number; // e.g. 15
  totalContactHours: number; // e.g. 75
  totalStudentEffortHours: number; // e.g. 180 (needs 45 hrs per 1 credit)
  accreditedCredits: number; // e.g. 4.0
  federalFormulaCompliant: boolean;
}

export interface CourseModule {
  id: string;
  code: string; // e.g. "CS 301"
  title: string;
  department: string;
  termOffered: 'Fall' | 'Spring' | 'Both';
  recommendedSemester: number; // 1-8
  credits: number;
  status: ModuleStatus;
  leadFaculty: string;
  facultyEmail: string;
  catalogDescription: string;
  prerequisites: string[]; // Course codes e.g. ["CS 201", "MATH 210"]
  corequisites?: string[];
  creditHours: CreditHourBreakdown;
  learningOutcomes: LearningOutcome[];
  abetCriteriaMapped: string[]; // ["Criterion 3", "Criterion 5"]
  lastAuditDate: string;
  syllabusVersion: string;
}

export interface AbetCriterionCheck {
  id: string;
  criterionNumber: string; // e.g. "Criterion 3.1"
  title: string;
  standardBody: 'ABET EAC' | 'ABET CAC' | 'WASC (WSCUC)';
  description: string;
  status: 'compliant' | 'pending_review' | 'action_required';
  evidenceCount: number;
  mappedCoursesCount: number;
  leadAuditor: string;
  notes: string;
}

export interface DigitalSignOff {
  role: string;
  name: string;
  title: string;
  timestamp: string;
  status: 'signed' | 'pending';
  hashSignature?: string;
  comments?: string;
}
