/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Grid3X3, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Edit3, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  BarChart2
} from 'lucide-react';
import { CourseModule, LearningOutcome, BloomsTaxonomyLevel } from '../../types/curriculum';
import { BLOOMS_LEVELS_METADATA, ABET_STUDENT_OUTCOMES_DEF } from '../../data/mockCurriculumData';

interface CompetencyMatrixScreenProps {
  courses: CourseModule[];
  onEditOutcome: (course: CourseModule, outcome: LearningOutcome) => void;
  onAddOutcome: (course?: CourseModule) => void;
}

export const CompetencyMatrixScreen: React.FC<CompetencyMatrixScreenProps> = ({
  courses,
  onEditOutcome,
  onAddOutcome
}) => {
  const [selectedBlooms, setSelectedBlooms] = useState<string>('all');
  const [selectedSo, setSelectedSo] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');

  // Flatten all learning outcomes with their parent course
  const allOutcomes = courses.flatMap(course => 
    course.learningOutcomes.map(lo => ({
      course,
      outcome: lo
    }))
  );

  // Filter outcomes
  const filtered = allOutcomes.filter(({ course, outcome }) => {
    const matchesSearch = 
      outcome.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outcome.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBlooms = selectedBlooms === 'all' || outcome.bloomsLevel.startsWith(selectedBlooms);
    const matchesSo = selectedSo === 'all' || outcome.abetStudentOutcomes.includes(selectedSo);
    const matchesCourse = selectedCourseFilter === 'all' || course.code === selectedCourseFilter;

    return matchesSearch && matchesBlooms && matchesSo && matchesCourse;
  });

  // Calculate Bloom's distribution counts
  const bloomsCounts = BLOOMS_LEVELS_METADATA.map(b => {
    const count = allOutcomes.filter(o => o.outcome.bloomsLevel === b.level).length;
    return {
      ...b,
      count,
      pct: allOutcomes.length ? Math.round((count / allOutcomes.length) * 100) : 0
    };
  });

  // Higher order cognitive skills (L4-L6) percentage
  const higherOrderCount = allOutcomes.filter(o => 
    o.outcome.bloomsLevel.includes('L4') || 
    o.outcome.bloomsLevel.includes('L5') || 
    o.outcome.bloomsLevel.includes('L6')
  ).length;
  const higherOrderPct = allOutcomes.length ? Math.round((higherOrderCount / allOutcomes.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#0F172A] flex items-center gap-2">
            <span>Competency Matrix & Bloom's Taxonomy Rubric</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
              Accreditation Rubric
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Institutional mapping of course learning outcomes (CS-LO) against Bloom's cognitive taxonomy, ABET Student Outcomes 1–7, and multi-method assessment instruments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAddOutcome()}
            className="h-9 px-4 bg-[#4F46E5] text-white text-xs font-semibold rounded hover:bg-[#4338CA] active:scale-[0.99] transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Map New Outcome</span>
          </button>
        </div>
      </div>

      {/* Bloom's Taxonomy Cognitive Distribution Banner */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-4 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#4F46E5]" />
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Bloom's Taxonomy Cognitive Level Distribution
            </span>
          </div>
          <span className="text-xs font-mono text-slate-600">
            Higher-Order Synthesis (L4–L6): <strong className="text-[#059669] font-bold">{higherOrderPct}%</strong> of total curriculum outcomes
          </span>
        </div>

        {/* Cognitive Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {bloomsCounts.map((b) => (
            <button
              key={b.level}
              type="button"
              onClick={() => setSelectedBlooms(selectedBlooms === b.level.split(' ')[0] ? 'all' : b.level.split(' ')[0])}
              className={`p-2.5 rounded border text-left transition-all ${
                selectedBlooms === b.level.split(' ')[0]
                  ? 'ring-2 ring-[#4F46E5] ' + b.color
                  : 'hover:bg-slate-50 ' + b.color
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs">{b.level.split(' ')[0]}</span>
                <span className="font-mono text-xs font-bold tabular-nums px-1.5 py-0.2 bg-white/80 rounded border">
                  {b.count}
                </span>
              </div>
              <div className="text-[10px] opacity-75 mt-0.5 line-clamp-1">{b.description}</div>
              <div className="w-full bg-black/10 h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-current h-full" style={{ width: `${b.pct}%` }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Matrix Controls & Filters */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-3 flex flex-wrap items-center justify-between gap-3 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)]">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search outcome index (CS-LO-101), statement, or course..."
            className="w-full h-9 pl-9 pr-3 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
          />
        </div>

        {/* Course Filter */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="font-semibold text-slate-500 hidden sm:inline">Course:</span>
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="h-9 px-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
          >
            <option value="all">All Courses ({courses.length})</option>
            {courses.map((c) => (
              <option key={c.id} value={c.code}>{c.code}: {c.title.slice(0, 28)}...</option>
            ))}
          </select>
        </div>

        {/* ABET Student Outcome Filter */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="font-semibold text-slate-500 hidden sm:inline">ABET SO:</span>
          <select
            value={selectedSo}
            onChange={(e) => setSelectedSo(e.target.value)}
            className="h-9 px-2.5 bg-[#FFFFFF] border border-[#CBD5E1] rounded text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
          >
            <option value="all">All Student Outcomes (SO 1–7)</option>
            {ABET_STUDENT_OUTCOMES_DEF.map((so) => (
              <option key={so.code} value={so.code}>{so.code}: {so.title}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedBlooms('all');
            setSelectedSo('all');
            setSearchQuery('');
            setSelectedCourseFilter('all');
          }}
          className="text-xs text-slate-500 hover:text-[#4F46E5] font-semibold underline px-2 py-1"
        >
          Reset Filters
        </button>
      </div>

      {/* Dense High-Density Competency Table */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-32">Outcome Index</th>
                <th className="py-3 px-3 w-28">Course</th>
                <th className="py-3 px-4 min-w-[280px]">Performance Outcome Statement</th>
                <th className="py-3 px-3 w-36">Bloom's Taxonomy</th>
                <th className="py-3 px-3 w-32">ABET SO Mapping</th>
                <th className="py-3 px-4 min-w-[240px]">Assessment Linkage & Weight</th>
                <th className="py-3 px-3 w-36 text-right">Attainment</th>
                <th className="py-3 px-3 w-24 text-center">Status</th>
                <th className="py-3 px-3 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No learning outcomes match the selected criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(({ course, outcome }) => {
                  const totalAssessmentWeight = outcome.assessments.reduce((sum, a) => sum + a.weightPercentage, 0);
                  const isWeightBalanced = totalAssessmentWeight === 100;

                  return (
                    <tr 
                      key={outcome.id} 
                      className="hover:bg-[#F8FAFC] transition-colors"
                    >
                      {/* Monospaced Outcome Index */}
                      <td className="py-3 px-4 font-mono font-bold text-xs text-[#0F172A] align-top whitespace-nowrap">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                          {outcome.code}
                        </span>
                      </td>

                      {/* Course Reference */}
                      <td className="py-3 px-3 font-mono text-xs text-slate-800 align-top">
                        <span className="font-semibold text-[#4F46E5]">{course.code}</span>
                        <div className="text-[10px] text-slate-400 font-sans truncate max-w-[100px]">
                          Sem {course.recommendedSemester}
                        </div>
                      </td>

                      {/* Outcome Statement */}
                      <td className="py-3 px-4 text-xs text-slate-800 leading-snug align-top">
                        {outcome.description}
                      </td>

                      {/* Bloom's Level Chip */}
                      <td className="py-3 px-3 align-top whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border bg-slate-50 text-slate-800 border-slate-200">
                          {outcome.bloomsLevel}
                        </span>
                      </td>

                      {/* ABET SO Chips */}
                      <td className="py-3 px-3 align-top">
                        <div className="flex flex-wrap gap-1">
                          {outcome.abetStudentOutcomes.map((so) => (
                            <span
                              key={so}
                              className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200"
                              title={ABET_STUDENT_OUTCOMES_DEF.find(d => d.code === so)?.title}
                            >
                              {so}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Assessment Linkage & Weights */}
                      <td className="py-3 px-4 align-top">
                        <div className="space-y-1">
                          {outcome.assessments.map((as) => (
                            <div key={as.id} className="flex items-center justify-between text-[11px] bg-slate-50 px-2 py-1 rounded border border-slate-200">
                              <span className="text-slate-700 truncate max-w-[160px]">{as.name}</span>
                              <span className="font-mono font-semibold tabular-nums text-slate-900 shrink-0 ml-1">
                                {as.weightPercentage}%
                              </span>
                            </div>
                          ))}

                          {/* Weight validation indicator */}
                          <div className="flex items-center justify-between text-[10px] pt-0.5 font-mono">
                            <span className="text-slate-400">Total Weight:</span>
                            <span className={isWeightBalanced ? 'text-[#059669] font-bold' : 'text-[#DC2626] font-bold'}>
                              {totalAssessmentWeight}% {isWeightBalanced ? '✓' : '⚠️ Must = 100%'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Attainment Target vs Measured */}
                      <td className="py-3 px-3 text-right align-top tabular-nums font-mono">
                        <div className="text-xs font-bold text-slate-900">
                          {outcome.measuredAttainmentRate.toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Target: {outcome.targetAttainmentRate}%
                        </div>
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden ml-auto mt-1">
                          <div
                            className={`h-full ${
                              outcome.measuredAttainmentRate >= outcome.targetAttainmentRate
                                ? 'bg-[#059669]'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.min(outcome.measuredAttainmentRate, 100)}%` }}
                          />
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 align-top text-center">
                        {outcome.status === 'compliant' ? (
                          <span className="inline-flex items-center gap-1 text-[#059669] text-[10px] font-semibold bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#059669]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
                            Pass
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-700 text-[10px] font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-300">
                            <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                            Review
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 align-top text-center">
                        <button
                          type="button"
                          onClick={() => onEditOutcome(course, outcome)}
                          className="p-1.5 text-slate-500 hover:text-[#4F46E5] hover:bg-slate-100 rounded transition-colors"
                          title="Edit Competency Outcome & Weights"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
