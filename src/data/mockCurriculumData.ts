/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CourseModule, AbetCriterionCheck, DigitalSignOff } from '../types/curriculum';

export const INITIAL_COURSES: CourseModule[] = [
  {
    id: 'cs-101',
    code: 'CS 101',
    title: 'Foundations of Computer Systems & Algorithmic Thinking',
    department: 'Computer Science & Software Engineering',
    termOffered: 'Both',
    recommendedSemester: 1,
    credits: 4.0,
    status: 'validated',
    leadFaculty: 'Dr. Arthur Sterling',
    facultyEmail: 'asterling@institute.edu',
    syllabusVersion: 'v4.2 (2026)',
    lastAuditDate: '2026-09-14',
    catalogDescription: 'Rigorous introduction to algorithmic problem solving, imperative logic, data representations, memory hierarchies, and structured programming paradigms with unit-tested implementation.',
    prerequisites: ['MATH 101'],
    corequisites: ['CS 101L'],
    creditHours: {
      lectureHoursWeekly: 3.0,
      labHoursWeekly: 2.0,
      outsideStudyHoursWeekly: 7.0,
      semesterWeeks: 15,
      totalContactHours: 75,
      totalStudentEffortHours: 180,
      accreditedCredits: 4.0,
      federalFormulaCompliant: true,
    },
    abetCriteriaMapped: ['Criterion 3 (SO-1)', 'Criterion 5 (Curriculum)'],
    learningOutcomes: [
      {
        id: 'lo-101-1',
        code: 'CS-LO-101.1',
        description: 'Formulate algorithmic solutions decomposing non-trivial computational problems using structured control flow and modular procedural abstraction.',
        bloomsLevel: 'Applying (L3)',
        abetStudentOutcomes: ['SO-1'],
        wascCompetencies: ['Critical Thinking', 'Quantitative Reasoning'],
        targetAttainmentRate: 80,
        measuredAttainmentRate: 88.4,
        status: 'compliant',
        assessments: [
          { id: 'as-1', name: 'Midterm Algorithmic Examination', weightPercentage: 40, type: 'Exam', thresholdCriteria: 'Score ≥ 70%', currentCohortAttainment: 86.2 },
          { id: 'as-2', name: 'Modular Programming Project 2', weightPercentage: 60, type: 'Project', thresholdCriteria: 'Test suite pass rate ≥ 85%', currentCohortAttainment: 89.8 }
        ]
      },
      {
        id: 'lo-101-2',
        code: 'CS-LO-101.2',
        description: 'Analyze temporal complexity of fundamental iterative algorithms using asymptotic Big-O notation.',
        bloomsLevel: 'Analyzing (L4)',
        abetStudentOutcomes: ['SO-1', 'SO-6'],
        wascCompetencies: ['Critical Thinking'],
        targetAttainmentRate: 75,
        measuredAttainmentRate: 82.1,
        status: 'compliant',
        assessments: [
          { id: 'as-3', name: 'Asymptotic Analysis Practicum', weightPercentage: 50, type: 'Problem Set', thresholdCriteria: 'Score ≥ 75%', currentCohortAttainment: 81.0 },
          { id: 'as-4', name: 'Final Comprehensive Exam', weightPercentage: 50, type: 'Exam', thresholdCriteria: 'Score ≥ 70%', currentCohortAttainment: 83.2 }
        ]
      }
    ]
  },
  {
    id: 'cs-201',
    code: 'CS 201',
    title: 'Data Structures & Abstract Data Types',
    department: 'Computer Science & Software Engineering',
    termOffered: 'Both',
    recommendedSemester: 2,
    credits: 4.0,
    status: 'validated',
    leadFaculty: 'Dr. Helena Rostova',
    facultyEmail: 'hrostova@institute.edu',
    syllabusVersion: 'v5.1 (2026)',
    lastAuditDate: '2026-09-28',
    catalogDescription: 'Design, empirical analysis, and formal verification of fundamental data structures: balanced search trees, hash tables, heaps, disjoint-sets, and graph representations with strict memory contracts.',
    prerequisites: ['CS 101', 'MATH 120'],
    creditHours: {
      lectureHoursWeekly: 3.0,
      labHoursWeekly: 2.0,
      outsideStudyHoursWeekly: 7.0,
      semesterWeeks: 15,
      totalContactHours: 75,
      totalStudentEffortHours: 180,
      accreditedCredits: 4.0,
      federalFormulaCompliant: true,
    },
    abetCriteriaMapped: ['Criterion 3 (SO-1, SO-2)', 'Criterion 5 (Curriculum)'],
    learningOutcomes: [
      {
        id: 'lo-201-1',
        code: 'CS-LO-201.1',
        description: 'Synthesize optimal abstract data type choices given stringent constraints on query throughput, insertion latency, and cache spatial locality.',
        bloomsLevel: 'Evaluating (L5)',
        abetStudentOutcomes: ['SO-1', 'SO-2'],
        wascCompetencies: ['Critical Thinking', 'Quantitative Reasoning'],
        targetAttainmentRate: 80,
        measuredAttainmentRate: 84.7,
        status: 'compliant',
        assessments: [
          { id: 'as-5', name: 'Self-Balancing Tree Benchmark Project', weightPercentage: 50, type: 'Project', thresholdCriteria: 'Correctness & Benchmark Pass ≥ 80%', currentCohortAttainment: 85.0 },
          { id: 'as-6', name: 'Final Architectural Defense', weightPercentage: 50, type: 'Exam', thresholdCriteria: 'Score ≥ 75%', currentCohortAttainment: 84.4 }
        ]
      },
      {
        id: 'lo-201-2',
        code: 'CS-LO-201.2',
        description: 'Implement memory-safe, leak-free generic collection containers enforcing explicit invariants and resource cleanup contracts.',
        bloomsLevel: 'Creating (L6)',
        abetStudentOutcomes: ['SO-2'],
        wascCompetencies: ['Critical Thinking'],
        targetAttainmentRate: 75,
        measuredAttainmentRate: 79.5,
        status: 'compliant',
        assessments: [
          { id: 'as-7', name: 'Custom Allocator & Hash Map Lab', weightPercentage: 100, type: 'Lab Practicum', thresholdCriteria: 'Valgrind zero-leak validation', currentCohortAttainment: 79.5 }
        ]
      }
    ]
  },
  {
    id: 'cs-250',
    code: 'CS 250',
    title: 'Computer Architecture & Assembly Interfaces',
    department: 'Computer Science & Software Engineering',
    termOffered: 'Fall',
    recommendedSemester: 3,
    credits: 4.0,
    status: 'validated',
    leadFaculty: 'Prof. Marcus Vance',
    facultyEmail: 'mvance@institute.edu',
    syllabusVersion: 'v3.9 (2026)',
    lastAuditDate: '2026-10-02',
    catalogDescription: 'Processor datapath, pipelining, hazards, memory caching hierarchies, virtual memory translations, instruction set architectures (RISC-V), and hardware-software hardware interface boundaries.',
    prerequisites: ['CS 201'],
    creditHours: {
      lectureHoursWeekly: 3.0,
      labHoursWeekly: 3.0,
      outsideStudyHoursWeekly: 6.0,
      semesterWeeks: 15,
      totalContactHours: 90,
      totalStudentEffortHours: 180,
      accreditedCredits: 4.0,
      federalFormulaCompliant: true,
    },
    abetCriteriaMapped: ['Criterion 3 (SO-1, SO-6)', 'Criterion 5 (Curriculum)'],
    learningOutcomes: [
      {
        id: 'lo-250-1',
        code: 'CS-LO-250.1',
        description: 'Trace instruction execution through multi-stage pipelined datapaths identifying data, control, and structural hazard stalls and mitigation bypass paths.',
        bloomsLevel: 'Analyzing (L4)',
        abetStudentOutcomes: ['SO-1'],
        wascCompetencies: ['Quantitative Reasoning'],
        targetAttainmentRate: 80,
        measuredAttainmentRate: 83.0,
        status: 'compliant',
        assessments: [
          { id: 'as-8', name: 'Pipeline Simulation Lab', weightPercentage: 45, type: 'Lab Practicum', thresholdCriteria: 'Hazard detection logic pass', currentCohortAttainment: 85.0 },
          { id: 'as-9', name: 'Architecture Midterm Examination', weightPercentage: 55, type: 'Exam', thresholdCriteria: 'Score ≥ 70%', currentCohortAttainment: 81.4 }
        ]
      }
    ]
  },
  {
    id: 'cs-301',
    code: 'CS 301',
    title: 'Advanced Algorithm Design & Complexity Analysis',
    department: 'Computer Science & Software Engineering',
    termOffered: 'Spring',
    recommendedSemester: 4,
    credits: 4.0,
    status: 'under_revision',
    leadFaculty: 'Dr. Eleanor Vance (Dept Chair)',
    facultyEmail: 'evance@institute.edu',
    syllabusVersion: 'v6.0-REV',
    lastAuditDate: '2026-10-18',
    catalogDescription: 'Advanced algorithmic paradigms: dynamic programming, greedy strategies, network flows, linear programming duality, NP-completeness reductions, approximation bounds, and randomized algorithms.',
    prerequisites: ['CS 201', 'MATH 220'],
    creditHours: {
      lectureHoursWeekly: 3.5,
      labHoursWeekly: 1.0,
      outsideStudyHoursWeekly: 7.5,
      semesterWeeks: 15,
      totalContactHours: 67.5,
      totalStudentEffortHours: 180,
      accreditedCredits: 4.0,
      federalFormulaCompliant: true,
    },
    abetCriteriaMapped: ['Criterion 3 (SO-1)', 'Criterion 5 (Curriculum)'],
    learningOutcomes: [
      {
        id: 'lo-301-1',
        code: 'CS-LO-301.1',
        description: 'Prove polynomial-time reducibility of novel intractable problems from canonical NP-complete decision problems (3-SAT, Vertex Cover, Hamiltonian Cycle).',
        bloomsLevel: 'Evaluating (L5)',
        abetStudentOutcomes: ['SO-1'],
        wascCompetencies: ['Critical Thinking', 'Quantitative Reasoning'],
        targetAttainmentRate: 75,
        measuredAttainmentRate: 71.8,
        status: 'review_required',
        assessments: [
          { id: 'as-10', name: 'NP-Completeness Formal Reductions Portfolio', weightPercentage: 40, type: 'Problem Set', thresholdCriteria: 'Rigorous proof verification ≥ 75%', currentCohortAttainment: 69.4 },
          { id: 'as-11', name: 'Comprehensive Final Exam', weightPercentage: 60, type: 'Exam', thresholdCriteria: 'Score ≥ 70%', currentCohortAttainment: 73.4 }
        ]
      },
      {
        id: 'lo-301-2',
        code: 'CS-LO-301.2',
        description: 'Design and empirically benchmark polynomial-time approximation algorithms with bounded worst-case approximation ratios for NP-hard optimization targets.',
        bloomsLevel: 'Creating (L6)',
        abetStudentOutcomes: ['SO-1', 'SO-6'],
        wascCompetencies: ['Critical Thinking'],
        targetAttainmentRate: 80,
        measuredAttainmentRate: 87.2,
        status: 'compliant',
        assessments: [
          { id: 'as-12', name: 'Approximation Algorithm Implementation Lab', weightPercentage: 100, type: 'Project', thresholdCriteria: 'Approximation ratio guarantee met', currentCohortAttainment: 87.2 }
        ]
      }
    ]
  },
  {
    id: 'cs-340',
    code: 'CS 340',
    title: 'Operating Systems & Distributed Concurrency',
    department: 'Computer Science & Software Engineering',
    termOffered: 'Fall',
    recommendedSemester: 5,
    credits: 4.0,
    status: 'validated',
    leadFaculty: 'Dr. Rajiv Menon',
    facultyEmail: 'rmenon@institute.edu',
    syllabusVersion: 'v4.0 (2026)',
    lastAuditDate: '2026-08-30',
    catalogDescription: 'Process scheduling, POSIX threads, synchronization primitives, deadlock detection, page replacement algorithms, file system journal consistency, and distributed consensus primitives.',
    prerequisites: ['CS 201', 'CS 250'],
    creditHours: {
      lectureHoursWeekly: 3.0,
      labHoursWeekly: 3.0,
      outsideStudyHoursWeekly: 6.0,
      semesterWeeks: 15,
      totalContactHours: 90,
      totalStudentEffortHours: 180,
      accreditedCredits: 4.0,
      federalFormulaCompliant: true,
    },
    abetCriteriaMapped: ['Criterion 3 (SO-1, SO-2)', 'Criterion 5 (Curriculum)'],
    learningOutcomes: [
      {
        id: 'lo-340-1',
        code: 'CS-LO-340.1',
        description: 'Construct thread-safe concurrency primitives using atomic instructions and condition variables eliminating race hazards, deadlocks, and priority inversions.',
        bloomsLevel: 'Creating (L6)',
        abetStudentOutcomes: ['SO-2'],
        wascCompetencies: ['Critical Thinking'],
        targetAttainmentRate: 80,
        measuredAttainmentRate: 85.6,
        status: 'compliant',
        assessments: [
          { id: 'as-13', name: 'Kernel Synchronization Barrier Project', weightPercentage: 60, type: 'Project', thresholdCriteria: 'Stress test 1000 threads pass', currentCohortAttainment: 86.8 },
          { id: 'as-14', name: 'OS Midterm Examination', weightPercentage: 40, type: 'Exam', thresholdCriteria: 'Score ≥ 70%', currentCohortAttainment: 83.8 }
        ]
      }
    ]
  },
  {
    id: 'cs-380',
    code: 'CS 380',
    title: 'Software Engineering & Verification Methodologies',
    department: 'Computer Science & Software Engineering',
    termOffered: 'Spring',
    recommendedSemester: 6,
    credits: 3.0,
    status: 'validated',
    leadFaculty: 'Prof. Sarah Jenkins',
    facultyEmail: 'sjenkins@institute.edu',
    syllabusVersion: 'v3.5 (2026)',
    lastAuditDate: '2026-09-19',
    catalogDescription: 'Formal specification, CI/CD automated test generation, property-based testing, static code analysis, agile architectural governance, and team project dynamics under real-world constraints.',
    prerequisites: ['CS 201'],
    creditHours: {
      lectureHoursWeekly: 2.0,
      labHoursWeekly: 2.0,
      outsideStudyHoursWeekly: 5.0,
      semesterWeeks: 15,
      totalContactHours: 60,
      totalStudentEffortHours: 135,
      accreditedCredits: 3.0,
      federalFormulaCompliant: true,
    },
    abetCriteriaMapped: ['Criterion 3 (SO-3, SO-5)', 'Criterion 5 (Curriculum)'],
    learningOutcomes: [
      {
        id: 'lo-380-1',
        code: 'CS-LO-380.1',
        description: 'Collaborate effectively in cross-functional technical teams producing verified software artifacts with code reviews, continuous integration pipelines, and branch governance.',
        bloomsLevel: 'Applying (L3)',
        abetStudentOutcomes: ['SO-3', 'SO-5'],
        wascCompetencies: ['Written/Oral Communication', 'Critical Thinking'],
        targetAttainmentRate: 85,
        measuredAttainmentRate: 91.0,
        status: 'compliant',
        assessments: [
          { id: 'as-15', name: 'Team Milestone Sprint 3 Review', weightPercentage: 50, type: 'Peer Review', thresholdCriteria: 'Peer & rubric score ≥ 85%', currentCohortAttainment: 92.5 },
          { id: 'as-16', name: 'Automated Test Suite Coverage Audit', weightPercentage: 50, type: 'Project', thresholdCriteria: 'Branch coverage ≥ 90%', currentCohortAttainment: 89.5 }
        ]
      }
    ]
  },
  {
    id: 'cs-420',
    code: 'CS 420',
    title: 'Database Systems Internals & Distributed Storage',
    department: 'Computer Science & Software Engineering',
    termOffered: 'Fall',
    recommendedSemester: 7,
    credits: 3.0,
    status: 'draft',
    leadFaculty: 'Dr. Helena Rostova',
    facultyEmail: 'hrostova@institute.edu',
    syllabusVersion: 'v2.1-DRAFT',
    lastAuditDate: '2026-10-10',
    catalogDescription: 'Relational calculus, query plan execution and optimizer cost heuristics, B+ Tree buffer management, write-ahead logging (ARIES), distributed 2PC/Raft consensus, and ACID isolation anomalies.',
    prerequisites: ['CS 201', 'CS 340'],
    creditHours: {
      lectureHoursWeekly: 2.0,
      labHoursWeekly: 2.0,
      outsideStudyHoursWeekly: 5.0,
      semesterWeeks: 15,
      totalContactHours: 60,
      totalStudentEffortHours: 135,
      accreditedCredits: 3.0,
      federalFormulaCompliant: true,
    },
    abetCriteriaMapped: ['Criterion 3 (SO-1, SO-2)', 'Criterion 5 (Curriculum)'],
    learningOutcomes: [
      {
        id: 'lo-420-1',
        code: 'CS-LO-420.1',
        description: 'Implement a write-ahead log recovery manager enforcing atomicity and durability under simulated hard crash events using the ARIES protocol.',
        bloomsLevel: 'Creating (L6)',
        abetStudentOutcomes: ['SO-1', 'SO-2'],
        wascCompetencies: ['Critical Thinking'],
        targetAttainmentRate: 80,
        measuredAttainmentRate: 78.4,
        status: 'compliant',
        assessments: [
          { id: 'as-17', name: 'ARIES Recovery Engine Implementation', weightPercentage: 70, type: 'Project', thresholdCriteria: 'Zero data corruption under crash tests', currentCohortAttainment: 78.4 },
          { id: 'as-18', name: 'Distributed Consensus Midterm Exam', weightPercentage: 30, type: 'Exam', thresholdCriteria: 'Score ≥ 70%', currentCohortAttainment: 78.4 }
        ]
      }
    ]
  },
  {
    id: 'cs-490',
    code: 'CS 490',
    title: 'Senior Capstone Design & Engineering Practicum',
    department: 'Computer Science & Software Engineering',
    termOffered: 'Spring',
    recommendedSemester: 8,
    credits: 4.0,
    status: 'validated',
    leadFaculty: 'Dr. Arthur Sterling & Industry Board',
    facultyEmail: 'asterling@institute.edu',
    syllabusVersion: 'v5.0 (2026)',
    lastAuditDate: '2026-09-01',
    catalogDescription: 'Major culminating design experience incorporating realistic engineering standards, safety, ethical liability, economic viability, sustainability, and formal oral and written defense before external evaluators.',
    prerequisites: ['CS 301', 'CS 340', 'CS 380'],
    creditHours: {
      lectureHoursWeekly: 1.0,
      labHoursWeekly: 6.0,
      outsideStudyHoursWeekly: 5.0,
      semesterWeeks: 15,
      totalContactHours: 105,
      totalStudentEffortHours: 180,
      accreditedCredits: 4.0,
      federalFormulaCompliant: true,
    },
    abetCriteriaMapped: ['Criterion 3 (SO-2, SO-3, SO-4, SO-5, SO-7)', 'Criterion 5 (Major Design)'],
    learningOutcomes: [
      {
        id: 'lo-490-1',
        code: 'CS-LO-490.1',
        description: 'Synthesize a complex computing system meeting documented client specifications with rigorous validation across security, safety, accessibility, and architectural maintainability.',
        bloomsLevel: 'Creating (L6)',
        abetStudentOutcomes: ['SO-2', 'SO-4'],
        wascCompetencies: ['Critical Thinking', 'Information Literacy'],
        targetAttainmentRate: 85,
        measuredAttainmentRate: 94.2,
        status: 'compliant',
        assessments: [
          { id: 'as-19', name: 'External Industry Advisory Panel Defense', weightPercentage: 50, type: 'Oral Defense', thresholdCriteria: 'Panel consensus rating ≥ 85%', currentCohortAttainment: 95.0 },
          { id: 'as-20', name: 'Engineering Final Capstone Report & Repository', weightPercentage: 50, type: 'Project', thresholdCriteria: 'Full rubric specification met', currentCohortAttainment: 93.4 }
        ]
      },
      {
        id: 'lo-490-2',
        code: 'CS-LO-490.2',
        description: 'Evaluate ethical dilemmas, legal liabilities, privacy implications, and socioeconomic impacts in computing system deployment with professional codes of conduct.',
        bloomsLevel: 'Evaluating (L5)',
        abetStudentOutcomes: ['SO-4'],
        wascCompetencies: ['Written/Oral Communication', 'Critical Thinking'],
        targetAttainmentRate: 85,
        measuredAttainmentRate: 89.0,
        status: 'compliant',
        assessments: [
          { id: 'as-21', name: 'Societal & Ethical Impact Assessment Brief', weightPercentage: 100, type: 'Problem Set', thresholdCriteria: 'Score ≥ 80%', currentCohortAttainment: 89.0 }
        ]
      }
    ]
  }
];

export const ABET_CRITERIA_LIST: AbetCriterionCheck[] = [
  {
    id: 'crit-1',
    criterionNumber: 'Criterion 1',
    title: 'Students & Institutional Advising',
    standardBody: 'ABET EAC',
    description: 'Student performance evaluation, academic advising, prerequisite enforcement, and graduation credit audits.',
    status: 'compliant',
    evidenceCount: 14,
    mappedCoursesCount: 8,
    leadAuditor: 'Dean of Academic Affairs',
    notes: 'Prerequisite enforcement automated through registrar degree audit portal.'
  },
  {
    id: 'crit-2',
    criterionNumber: 'Criterion 2',
    title: 'Program Educational Objectives (PEOs)',
    standardBody: 'ABET EAC',
    description: 'Published statements that describe what graduates are expected to attain within a few years after graduation, periodically reviewed by constituencies.',
    status: 'compliant',
    evidenceCount: 9,
    mappedCoursesCount: 8,
    leadAuditor: 'Dr. Arthur Sterling',
    notes: 'Biennial Industry Advisory Board feedback minutes incorporated into catalog.'
  },
  {
    id: 'crit-3',
    criterionNumber: 'Criterion 3',
    title: 'Student Outcomes (SOs 1 through 7)',
    standardBody: 'ABET EAC',
    description: 'Documented student outcomes covering engineering problem solving, design, communication, ethics, team dynamics, experimentation, and continuous acquisition of knowledge.',
    status: 'compliant',
    evidenceCount: 38,
    mappedCoursesCount: 8,
    leadAuditor: 'Dr. Eleanor Vance',
    notes: '100% of required courses mapped to primary and secondary SO indices.'
  },
  {
    id: 'crit-4',
    criterionNumber: 'Criterion 4',
    title: 'Continuous Improvement (Closing the Loop)',
    standardBody: 'ABET EAC',
    description: 'Systematic assessment and evaluation processes documenting that outcome results are used for continuous program improvement.',
    status: 'compliant',
    evidenceCount: 22,
    mappedCoursesCount: 6,
    leadAuditor: 'Curriculum Quality Committee',
    notes: 'CS 301 NP-reduction attainment remediation action plan scheduled for Spring 2027.'
  },
  {
    id: 'crit-5',
    criterionNumber: 'Criterion 5',
    title: 'Curriculum & Credit Hours Requirements',
    standardBody: 'ABET EAC',
    description: 'Minimum 30 semester credit hours of college-level math and basic sciences; minimum 45 credit hours of engineering topics; culminating major design experience.',
    status: 'compliant',
    evidenceCount: 18,
    mappedCoursesCount: 8,
    leadAuditor: 'Dr. Marcus Vance',
    notes: 'Math/Science: 34 credits. Engineering Topics: 48 credits. Capstone CS 490 approved.'
  },
  {
    id: 'crit-6',
    criterionNumber: 'Criterion 6',
    title: 'Faculty Qualifications & Competence',
    standardBody: 'ABET EAC',
    description: 'Faculty size, instructional competence, terminal degrees, industrial experience, and professional licensure.',
    status: 'compliant',
    evidenceCount: 27,
    mappedCoursesCount: 8,
    leadAuditor: 'Faculty Senate Chair',
    notes: '14 full-time tenured/tenure-track faculty; 100% hold terminal Ph.D. in computing disciplines.'
  },
  {
    id: 'crit-7',
    criterionNumber: 'Criterion 7',
    title: 'Facilities, Laboratory Spaces & Computing Infrastructure',
    standardBody: 'ABET EAC',
    description: 'Adequate computing hardware, licensed developer software, instructional laboratories, and safety guidance.',
    status: 'compliant',
    evidenceCount: 12,
    mappedCoursesCount: 8,
    leadAuditor: 'Director of Instructional Labs',
    notes: 'High-performance computing cluster and 4 instructional lab suites fully certified.'
  },
  {
    id: 'crit-8',
    criterionNumber: 'Criterion 8',
    title: 'Institutional Support & Leadership Resources',
    standardBody: 'ABET EAC',
    description: 'Institutional leadership, program budgeting, professional development funding, and laboratory staff support.',
    status: 'compliant',
    evidenceCount: 16,
    mappedCoursesCount: 8,
    leadAuditor: 'Vice Provost for Academic Resource Planning',
    notes: 'Multi-year budget allocation reaffirmed through 2030 academic cycle.'
  }
];

export const INITIAL_SIGNOFFS: DigitalSignOff[] = [
  {
    role: 'Department Head & Professor of Computing',
    name: 'Dr. Eleanor Vance, Ph.D.',
    title: 'Chair, Department of Computer Science & Software Engineering',
    timestamp: '2026-10-15T14:32:00Z',
    status: 'signed',
    hashSignature: 'SHA256:8f4a13e9a061c028a6f44d180ce2775a6c117b9b18d2',
    comments: 'Curriculum matrix approved for the 2026-2027 ABET Comprehensive Review.'
  },
  {
    role: 'Chair of University Curriculum Committee',
    name: 'Dr. Julian Thorne, Ph.D.',
    title: 'Associate Dean of Undergraduate Academic Programs',
    timestamp: '2026-10-18T09:15:00Z',
    status: 'signed',
    hashSignature: 'SHA256:3e91b5c0071da518ff64ad29910c2285e6b014a92c44',
    comments: 'All federal credit hour ratios and prerequisite graphs verified.'
  },
  {
    role: 'ABET Accreditation Lead Evaluator',
    name: 'Dr. Margaret Chen, PE, F.IEEE',
    title: 'Chair, Engineering Accreditation Review Panel',
    timestamp: '2026-10-22T16:45:00Z',
    status: 'signed',
    hashSignature: 'SHA256:7c82a4d9e034b125fa098cd317a58402a11b659c0012',
    comments: 'Compliance with Criterion 3 (Student Outcomes) and Criterion 5 (Major Design Experience) confirmed.'
  }
];

export const BLOOMS_LEVELS_METADATA = [
  { level: 'Remembering (L1)', color: 'border-slate-300 bg-slate-50 text-slate-700', description: 'Recall facts and basic concepts' },
  { level: 'Understanding (L2)', color: 'border-blue-300 bg-blue-50 text-blue-700', description: 'Explain ideas or concepts' },
  { level: 'Applying (L3)', color: 'border-cyan-300 bg-cyan-50 text-cyan-800', description: 'Use information in new situations' },
  { level: 'Analyzing (L4)', color: 'border-indigo-300 bg-indigo-50 text-indigo-800', description: 'Draw connections among ideas' },
  { level: 'Evaluating (L5)', color: 'border-purple-300 bg-purple-50 text-purple-800', description: 'Justify a stand or decision' },
  { level: 'Creating (L6)', color: 'border-emerald-300 bg-emerald-50 text-emerald-800', description: 'Produce new or original work' }
];

export const ABET_STUDENT_OUTCOMES_DEF = [
  { code: 'SO-1', title: 'Complex Problem Solving', desc: 'Identify, formulate, and solve complex engineering problems by applying principles of engineering, science, and mathematics.' },
  { code: 'SO-2', title: 'Engineering Design', desc: 'Apply engineering design to produce solutions that meet specified needs with consideration of public health, safety, and welfare.' },
  { code: 'SO-3', title: 'Technical Communication', desc: 'Communicate effectively with a range of audiences.' },
  { code: 'SO-4', title: 'Ethics & Professional Responsibility', desc: 'Recognize ethical and professional responsibilities in engineering situations and make informed judgments.' },
  { code: 'SO-5', title: 'Collaborative Team Dynamics', desc: 'Function effectively on a team whose members together provide leadership, create a collaborative environment, and establish goals.' },
  { code: 'SO-6', title: 'Experimentation & Data Analysis', desc: 'Develop and conduct appropriate experimentation, analyze and interpret data, and use engineering judgment to draw conclusions.' },
  { code: 'SO-7', title: 'Continuous Knowledge Acquisition', desc: 'Acquire and apply new knowledge as needed, using appropriate learning strategies.' }
];
