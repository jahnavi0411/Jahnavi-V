/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  BookOpen, 
  ArrowRight, 
  Edit3, 
  GraduationCap,
  Sparkles,
  ChevronDown,
  Layers,
  ListPlus
} from 'lucide-react';
import { CourseModule, ModuleStatus } from '../../types/curriculum';

interface CurriculumWorkbenchProps {
  courses: CourseModule[];
  onSelectCourse: (course: CourseModule) => void;
  onEditCourse: (course: CourseModule) => void;
  onAddCourse: () => void;
  onAddOutcome: (course: CourseModule) => void;
}

export const CurriculumWorkbench: React.FC<CurriculumWorkbenchProps> = ({
  courses,
  onSelectCourse,
  onEditCourse,
  onAddCourse,
  onAddOutcome
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ModuleStatus | 'all'>('all');

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    const matchesSearch = 
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.leadFaculty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSemester = selectedSemester === 'all' || c.recommendedSemester === selectedSemester;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;

    return matchesSearch && matchesSemester && matchesStatus;
  });

  const totalCredits = filteredCourses.reduce((sum, c) => sum + c.credits, 0);
  const validatedCount = filteredCourses.filter(c => c.status === 'validated').length;

  return (
    <div className="space-y-6">
      {/* Workbench Header & Metrics Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#0F172A] flex items-center gap-2">
            <span>Curriculum & Syllabus Workbench</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Department Architecture
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Authoritative module management, contact-hour verification, and structural syllabus mapping for university governance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onAddCourse}
            className="h-9 px-4 bg-[#4F46E5] text-white text-xs font-semibold rounded hover:bg-[#4338CA] active:scale-[0.99] transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course Module</span>
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-3 flex flex-wrap items-center justify-between gap-3 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)]">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search course code, title, or faculty lead (e.g. CS 301, Vance)..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all"
          />
        </div>

        {/* Semester Filter */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-500 hidden sm:inline">Semester:</span>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="h-9 px-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
          >
            <option value="all">All Semesters (1–8)</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-500 hidden sm:inline">Audit Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ModuleStatus | 'all')}
            className="h-9 px-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
          >
            <option value="all">All Statuses</option>
            <option value="validated">Validated</option>
            <option value="under_revision">Under Revision</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Filter Count Counter */}
        <div className="text-xs font-mono text-slate-500 tabular-nums">
          Showing <span className="font-semibold text-slate-900">{filteredCourses.length}</span> of {courses.length} courses
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCourses.map((course) => {
          // Status left border accent
          const borderAccent = 
            course.status === 'validated'
              ? 'border-l-[4px] border-l-[#059669]'
              : course.status === 'under_revision'
              ? 'border-l-[4px] border-l-[#4F46E5]'
              : 'border-l-[4px] border-l-[#64748B]';

          return (
            <div
              key={course.id}
              className={`bg-[#FFFFFF] border border-[#E2E8F0] ${borderAccent} rounded shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] hover:shadow-md transition-shadow p-5`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Course Main Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Course Code with JetBrains Mono */}
                    <span className="font-mono font-bold text-sm text-[#0F172A] px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {course.code}
                    </span>

                    {/* Course Title */}
                    <h2 className="text-base font-bold text-[#0F172A]">
                      {course.title}
                    </h2>

                    {/* Status Badge with design system precision */}
                    {course.status === 'validated' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#ECFDF5] border border-[#059669] text-[#059669] text-[11px] font-semibold rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
                        Accredited & Validated
                      </span>
                    )}
                    {course.status === 'under_revision' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 border border-[#4F46E5] text-[#4F46E5] text-[11px] font-semibold rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
                        Under Senate Revision
                      </span>
                    )}
                    {course.status === 'draft' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 border border-[#64748B] text-[#64748B] text-[11px] font-semibold rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#64748B]"></span>
                        Draft Specification
                      </span>
                    )}

                    {/* Credits Chip */}
                    <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 border border-slate-200 rounded tabular-nums">
                      {course.credits.toFixed(1)} Credit Hours
                    </span>
                  </div>

                  {/* Catalog Description */}
                  <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
                    {course.catalogDescription}
                  </p>

                  {/* Metadata Row: Prerequisites, Term, Faculty */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-slate-700">Prerequisites:</span>
                      {course.prerequisites.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {course.prerequisites.map((prereq) => (
                            <span
                              key={prereq}
                              className="px-1.5 py-0.2 bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] rounded text-[11px] font-mono"
                            >
                              {prereq}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">None (Direct Matriculation)</span>
                      )}
                    </div>

                    <span className="text-slate-300">•</span>

                    <div>
                      <span className="font-medium text-slate-700">Sequence:</span>{' '}
                      <span className="font-mono font-medium">Semester {course.recommendedSemester} ({course.termOffered})</span>
                    </div>

                    <span className="text-slate-300">•</span>

                    <div>
                      <span className="font-medium text-slate-700">Faculty Lead:</span>{' '}
                      <span className="text-slate-800">{course.leadFaculty}</span>
                    </div>

                    <span className="text-slate-300">•</span>

                    <div>
                      <span className="font-medium text-slate-700">Syllabus:</span>{' '}
                      <span className="font-mono text-slate-800">{course.syllabusVersion}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Quick Actions & Outcomes Count */}
                <div className="flex flex-row lg:flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEditCourse(course)}
                      className="h-8 px-3 bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold rounded hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#4F46E5]" />
                      <span>Edit Course</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectCourse(course)}
                      className="h-8 px-3 bg-[#4F46E5] text-white text-xs font-semibold rounded hover:bg-[#4338CA] transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Syllabus</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddOutcome(course)}
                    className="text-[11px] font-medium text-[#4F46E5] hover:underline flex items-center gap-1 mt-1"
                  >
                    <ListPlus className="w-3 h-3" />
                    <span>Map Learning Outcome ({course.learningOutcomes.length})</span>
                  </button>
                </div>
              </div>

              {/* Bottom Ledger: Contact Hours Breakdown & Learning Outcomes Teaser */}
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] grid grid-cols-1 md:grid-cols-4 gap-3 bg-[#F8FAFC] p-3 rounded text-xs">
                {/* Contact Hours breakdown */}
                <div className="space-y-0.5">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Weekly Contact Hours</div>
                  <div className="font-mono text-slate-800 tabular-nums">
                    {course.creditHours.lectureHoursWeekly}h Lec + {course.creditHours.labHoursWeekly}h Lab
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Semester Total Hours</div>
                  <div className="font-mono text-slate-800 tabular-nums">
                    {course.creditHours.totalContactHours}h Contact / {course.creditHours.totalStudentEffortHours}h Total Work
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Federal 34 CFR 600.2</div>
                  <div className="flex items-center gap-1 text-[#059669] font-semibold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Formula Compliant</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">ABET Criteria Mapped</div>
                  <div className="font-mono text-xs text-slate-700 truncate">
                    {course.abetCriteriaMapped.join(' • ')}
                  </div>
                </div>
              </div>

              {/* Learning Outcomes Summary Bar */}
              {course.learningOutcomes.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Accredited Learning Outcomes ({course.learningOutcomes.length}):
                  </div>
                  <div className="space-y-1.5">
                    {course.learningOutcomes.map((lo) => (
                      <div
                        key={lo.id}
                        className="bg-white border border-[#E2E8F0] p-2 rounded flex flex-wrap items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
                          <span className="font-mono font-bold text-xs text-[#0F172A] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            {lo.code}
                          </span>
                          <span className="text-slate-700 truncate max-w-xl">
                            {lo.description}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
                            {lo.bloomsLevel.split(' ')[0]}
                          </span>
                          <span className="font-mono text-xs tabular-nums text-slate-600">
                            Attainment: <span className="font-semibold text-slate-900">{lo.measuredAttainmentRate}%</span> (target: {lo.targetAttainmentRate}%)
                          </span>
                          {lo.measuredAttainmentRate >= lo.targetAttainmentRate ? (
                            <span className="w-2 h-2 rounded-full bg-[#059669]" title="Target Met"></span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-amber-500" title="Review Needed"></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
