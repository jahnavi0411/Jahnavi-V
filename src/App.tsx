/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { NavigationTabs, ActiveScreen } from './components/NavigationTabs';
import { AuditRail } from './components/AuditRail';
import { CurriculumWorkbench } from './components/screens/CurriculumWorkbench';
import { CompetencyMatrixScreen } from './components/screens/CompetencyMatrixScreen';
import { PrerequisitePathwayScreen } from './components/screens/PrerequisitePathwayScreen';
import { CreditHourLedgerScreen } from './components/screens/CreditHourLedgerScreen';
import { AccreditationAuditScreen } from './components/screens/AccreditationAuditScreen';
import { SignOffModal } from './components/modals/SignOffModal';
import { CourseDetailModal } from './components/modals/CourseDetailModal';
import { EditOutcomeModal } from './components/modals/EditOutcomeModal';
import { AddCourseModal } from './components/modals/AddCourseModal';
import { ExportDossierModal } from './components/modals/ExportDossierModal';

import { 
  INITIAL_COURSES, 
  ABET_CRITERIA_LIST, 
  INITIAL_SIGNOFFS 
} from './data/mockCurriculumData';
import { CourseModule, LearningOutcome, AbetCriterionCheck, DigitalSignOff } from './types/curriculum';
import { CheckCircle2, AlertCircle, Info, ShieldCheck } from 'lucide-react';

export default function App() {
  const [courses, setCourses] = useState<CourseModule[]>(INITIAL_COURSES);
  const [criteria, setCriteria] = useState<AbetCriterionCheck[]>(ABET_CRITERIA_LIST);
  const [signoffs, setSignoffs] = useState<DigitalSignOff[]>(INITIAL_SIGNOFFS);
  
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('workbench');
  const [activeProgram, setActiveProgram] = useState<string>(
    'B.S. in Computer Science & Software Engineering (ABET EAC)'
  );

  // Modals state
  const [isSignOffModalOpen, setIsSignOffModalOpen] = useState(false);
  const [isExportDossierModalOpen, setIsExportDossierModalOpen] = useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  
  // Selected course for syllabus modal
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<CourseModule | null>(null);

  // Outcome modal state
  const [outcomeModalState, setOutcomeModalState] = useState<{
    isOpen: boolean;
    course?: CourseModule;
    outcome?: LearningOutcome;
  }>({ isOpen: false });

  // Verification simulation state
  const [isValidating, setIsValidating] = useState(false);
  const [auditNotification, setAuditNotification] = useState<string | null>(null);

  // Total outcomes count
  const totalOutcomesCount = courses.reduce((sum, c) => sum + c.learningOutcomes.length, 0);
  const totalProgramCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const auditIssuesCount = criteria.filter(c => c.status !== 'compliant').length;

  // Handlers for Courses
  const handleUpdateCourse = (updatedCourse: CourseModule) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    if (selectedCourseForDetail?.id === updatedCourse.id) {
      setSelectedCourseForDetail(updatedCourse);
    }
    showToast(`Updated course specifications for ${updatedCourse.code}`);
  };

  const handleAddCourse = (newCourse: CourseModule) => {
    setCourses([...courses, newCourse]);
    showToast(`Successfully registered new accredited module: ${newCourse.code}`);
  };

  // Handlers for Outcomes
  const handleSaveOutcome = (courseId: string, outcome: LearningOutcome) => {
    setCourses(courses.map(course => {
      if (course.id !== courseId) return course;

      const existingIndex = course.learningOutcomes.findIndex(lo => lo.id === outcome.id);
      let updatedOutcomes: LearningOutcome[];

      if (existingIndex >= 0) {
        updatedOutcomes = [...course.learningOutcomes];
        updatedOutcomes[existingIndex] = outcome;
      } else {
        updatedOutcomes = [...course.learningOutcomes, outcome];
      }

      return {
        ...course,
        learningOutcomes: updatedOutcomes
      };
    }));

    showToast(`Saved outcome ${outcome.code} for course module.`);
  };

  // Handlers for Signoffs
  const handleAddSignature = (role: string, name: string, title: string, comment: string) => {
    const newSignoff: DigitalSignOff = {
      role,
      name,
      title,
      timestamp: new Date().toISOString(),
      status: 'signed',
      hashSignature: `SHA256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}${Date.now().toString(16)}`,
      comments: comment
    };

    setSignoffs([...signoffs, newSignoff]);
    showToast(`Cryptographic endorsement recorded by ${name}`);
  };

  const showToast = (message: string) => {
    setAuditNotification(message);
    setTimeout(() => {
      setAuditNotification(null);
    }, 4000);
  };

  const handleRunAuditValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      showToast('Completed real-time ABET & Federal Contact Hour validation: 0 Deficiencies, 1 Advisory.');
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#4F46E5] selection:text-white">
      {/* Toast Notification */}
      {auditNotification && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded shadow-lg border border-slate-700 text-xs font-medium flex items-center gap-2 animate-bounce-short">
          <ShieldCheck className="w-4 h-4 text-[#059669]" />
          <span>{auditNotification}</span>
        </div>
      )}

      {/* Main Structural Institutional Header */}
      <Header
        activeProgram={activeProgram}
        setActiveProgram={setActiveProgram}
        onOpenSignOff={() => setIsSignOffModalOpen(true)}
        onExportDossier={() => setIsExportDossierModalOpen(true)}
        coursesCount={courses.length}
        outcomesCount={totalOutcomesCount}
      />

      {/* Sub-navigation Tabs */}
      <NavigationTabs
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        coursesCount={courses.length}
        outcomesCount={totalOutcomesCount}
        auditIssuesCount={auditIssuesCount}
      />

      {/* Primary Application Workspace Layout (Fluid Grid + Fixed 280px Audit Rail) */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1720px] mx-auto">
        {/* Main Workbench Viewport */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0">
          {activeScreen === 'workbench' && (
            <CurriculumWorkbench
              courses={courses}
              onSelectCourse={(course) => setSelectedCourseForDetail(course)}
              onEditCourse={(course) => setSelectedCourseForDetail(course)}
              onAddCourse={() => setIsAddCourseModalOpen(true)}
              onAddOutcome={(course) => setOutcomeModalState({ isOpen: true, course })}
            />
          )}

          {activeScreen === 'matrix' && (
            <CompetencyMatrixScreen
              courses={courses}
              onEditOutcome={(course, outcome) => setOutcomeModalState({ isOpen: true, course, outcome })}
              onAddOutcome={(course) => setOutcomeModalState({ isOpen: true, course })}
            />
          )}

          {activeScreen === 'pathways' && (
            <PrerequisitePathwayScreen
              courses={courses}
              onSelectCourse={(course) => setSelectedCourseForDetail(course)}
            />
          )}

          {activeScreen === 'credit-ledger' && (
            <CreditHourLedgerScreen courses={courses} />
          )}

          {activeScreen === 'audit-ledger' && (
            <AccreditationAuditScreen
              criteria={criteria}
              onOpenSignOff={() => setIsSignOffModalOpen(true)}
              onExportDossier={() => setIsExportDossierModalOpen(true)}
            />
          )}
        </main>

        {/* Desktop Fixed Structural 280px Accreditation Audit Rail */}
        <AuditRail
          criteria={criteria}
          onOpenSignOff={() => setIsSignOffModalOpen(true)}
          onRunAuditValidation={handleRunAuditValidation}
          isValidating={isValidating}
          totalProgramCredits={totalProgramCredits}
          onSelectCriterion={(crit) => {
            setActiveScreen('audit-ledger');
          }}
        />
      </div>

      {/* Modals & Dialogs (Tier 3 Elevation) */}
      <SignOffModal
        isOpen={isSignOffModalOpen}
        onClose={() => setIsSignOffModalOpen(false)}
        signoffs={signoffs}
        onAddSignature={handleAddSignature}
        programTitle={activeProgram}
      />

      <ExportDossierModal
        isOpen={isExportDossierModalOpen}
        onClose={() => setIsExportDossierModalOpen(false)}
        programTitle={activeProgram}
        courses={courses}
        criteria={criteria}
        signoffs={signoffs}
      />

      <CourseDetailModal
        course={selectedCourseForDetail}
        isOpen={!!selectedCourseForDetail}
        onClose={() => setSelectedCourseForDetail(null)}
        onUpdateCourse={handleUpdateCourse}
        allCourses={courses}
      />

      <EditOutcomeModal
        isOpen={outcomeModalState.isOpen}
        onClose={() => setOutcomeModalState({ isOpen: false })}
        courses={courses}
        initialCourse={outcomeModalState.course}
        initialOutcome={outcomeModalState.outcome}
        onSaveOutcome={handleSaveOutcome}
      />

      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onAddCourse={handleAddCourse}
        existingCourses={courses}
      />
    </div>
  );
}
