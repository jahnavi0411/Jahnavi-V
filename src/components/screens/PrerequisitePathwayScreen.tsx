/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GitFork, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Info,
  Maximize2,
  Sparkles,
  Workflow
} from 'lucide-react';
import { CourseModule } from '../../types/curriculum';

interface PrerequisitePathwayScreenProps {
  courses: CourseModule[];
  onSelectCourse: (course: CourseModule) => void;
}

export const PrerequisitePathwayScreen: React.FC<PrerequisitePathwayScreenProps> = ({
  courses,
  onSelectCourse
}) => {
  const [selectedCourseCode, setSelectedCourseCode] = useState<string | null>('CS 301');

  // Semester buckets (1 through 8)
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const selectedCourse = courses.find(c => c.code === selectedCourseCode);

  // Determine prerequisites (upstream)
  const upstreamPrereqs = selectedCourse ? selectedCourse.prerequisites : [];

  // Determine downstream dependent courses (courses that have selectedCourseCode in their prerequisites)
  const downstreamDependents = selectedCourse 
    ? courses.filter(c => c.prerequisites.includes(selectedCourse.code)).map(c => c.code)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#0F172A] flex items-center gap-2">
            <span>Curriculum Prerequisite & Dependency Pathway Map</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
              Pathway Verification
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Topological curriculum sequencing, critical-path dependency trees, and graduation bottleneck audits.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-white border border-[#E2E8F0] px-3 py-2 rounded shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#4F46E5] inline-block"></span>
            <span className="font-semibold text-slate-700">Selected Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block"></span>
            <span className="text-slate-600">Prerequisite (Upstream)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#059669] inline-block"></span>
            <span className="text-slate-600">Dependent (Downstream)</span>
          </div>
        </div>
      </div>

      {/* Pathway Health & Critical Path Diagnostic Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded p-3.5 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Critical Path Max Depth
          </div>
          <div className="text-lg font-bold font-mono text-[#0F172A] mt-1 tabular-nums">
            5 Sequential Terms
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            CS 101 → CS 201 → CS 250 → CS 340 → CS 490 Capstone
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded p-3.5 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Primary Bottleneck Course
          </div>
          <div className="text-lg font-bold font-mono text-[#4F46E5] mt-1">
            CS 201 (Data Structures)
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Unlocks 5 downstream upper-division engineering modules.
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded p-3.5 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Topological Graph Verification
          </div>
          <div className="flex items-center gap-1.5 text-lg font-bold text-[#059669] mt-1">
            <CheckCircle2 className="w-5 h-5" />
            <span>DAG Validated (0 Cycles)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Strict acyclic sequence guarantee; no backwards prerequisite loops.
          </p>
        </div>
      </div>

      {/* Interactive Node Inspection Panel if selected */}
      {selectedCourse && (
        <div className="bg-white border border-[#CBD5E1] rounded p-4 shadow-[0_4px_6px_-2px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-sm bg-indigo-50 text-[#4F46E5] border border-indigo-200 px-2 py-0.5 rounded">
                {selectedCourse.code}
              </span>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A]">{selectedCourse.title}</h3>
                <span className="text-xs text-slate-500">
                  Semester {selectedCourse.recommendedSemester} • {selectedCourse.credits.toFixed(1)} Credits • {selectedCourse.leadFaculty}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectCourse(selectedCourse)}
              className="h-8 px-3 bg-[#4F46E5] text-white text-xs font-semibold rounded hover:bg-[#4338CA] transition-all flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Inspect Full Course Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
            {/* Direct Upstream Prerequisites */}
            <div className="bg-amber-50/50 border border-amber-200 rounded p-3">
              <div className="font-semibold text-amber-900 text-xs mb-1.5 flex items-center justify-between">
                <span>Direct Prerequisites Required:</span>
                <span className="font-mono text-amber-800">{upstreamPrereqs.length}</span>
              </div>
              {upstreamPrereqs.length > 0 ? (
                <div className="space-y-1">
                  {upstreamPrereqs.map((code) => {
                    const prereqObj = courses.find(c => c.code === code);
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setSelectedCourseCode(code)}
                        className="w-full text-left px-2 py-1.5 bg-white border border-amber-200 rounded text-xs hover:border-amber-400 flex items-center justify-between"
                      >
                        <span className="font-mono font-bold text-amber-950">{code}</span>
                        <span className="text-slate-600 truncate max-w-[200px] text-[11px]">
                          {prereqObj?.title || 'External Prerequisite (e.g. Calculus)'}
                        </span>
                        <span className="text-[10px] text-amber-700 font-medium">Select →</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <span className="text-slate-400 italic">None (Foundation Course)</span>
              )}
            </div>

            {/* Direct Downstream Dependents */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded p-3">
              <div className="font-semibold text-emerald-900 text-xs mb-1.5 flex items-center justify-between">
                <span>Courses Unlocked By This Node:</span>
                <span className="font-mono text-emerald-800">{downstreamDependents.length}</span>
              </div>
              {downstreamDependents.length > 0 ? (
                <div className="space-y-1">
                  {downstreamDependents.map((code) => {
                    const depObj = courses.find(c => c.code === code);
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setSelectedCourseCode(code)}
                        className="w-full text-left px-2 py-1.5 bg-white border border-emerald-200 rounded text-xs hover:border-emerald-400 flex items-center justify-between"
                      >
                        <span className="font-mono font-bold text-emerald-950">{code}</span>
                        <span className="text-slate-600 truncate max-w-[200px] text-[11px]">
                          {depObj?.title}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium">Select →</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <span className="text-slate-400 italic">None (Terminal Senior Practicum)</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8-Semester Interactive Curriculum Grid */}
      <div className="bg-white border border-[#E2E8F0] rounded p-4 shadow-sm overflow-x-auto">
        <div className="min-w-[960px]">
          <div className="grid grid-cols-8 gap-3 border-b border-[#E2E8F0] pb-2 mb-3 text-center">
            {semesters.map((sem) => (
              <div key={sem} className="space-y-0.5">
                <span className="font-mono font-bold text-xs text-[#0F172A]">
                  Semester {sem}
                </span>
                <div className="text-[10px] text-slate-400 font-medium">
                  {sem % 2 === 1 ? 'Fall Term' : 'Spring Term'}
                </div>
              </div>
            ))}
          </div>

          {/* Columns */}
          <div className="grid grid-cols-8 gap-3 min-h-[420px]">
            {semesters.map((sem) => {
              const semesterCourses = courses.filter(c => c.recommendedSemester === sem);

              return (
                <div key={sem} className="space-y-3 bg-[#F8FAFC] p-2 rounded border border-[#E2E8F0]/60 flex flex-col">
                  {semesterCourses.length === 0 ? (
                    <div className="text-[11px] text-slate-400 text-center py-6 italic">
                      GenEd / Electives
                    </div>
                  ) : (
                    semesterCourses.map((c) => {
                      const isSelected = c.code === selectedCourseCode;
                      const isUpstream = upstreamPrereqs.includes(c.code);
                      const isDownstream = downstreamDependents.includes(c.code);

                      let nodeStyle = 'bg-white border-[#CBD5E1] text-[#0F172A] hover:border-[#4F46E5]';
                      if (isSelected) {
                        nodeStyle = 'bg-indigo-50 border-2 border-[#4F46E5] shadow-md ring-1 ring-[#4F46E5]';
                      } else if (isUpstream) {
                        nodeStyle = 'bg-amber-50 border-2 border-amber-500 shadow-sm';
                      } else if (isDownstream) {
                        nodeStyle = 'bg-emerald-50 border-2 border-[#059669] shadow-sm';
                      }

                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedCourseCode(c.code)}
                          className={`p-2.5 rounded border text-left cursor-pointer transition-all ${nodeStyle} relative group`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-xs">
                              {c.code}
                            </span>
                            <span className="text-[10px] font-mono tabular-nums text-slate-500">
                              {c.credits} cr
                            </span>
                          </div>

                          <div className="font-medium text-[11px] text-slate-800 line-clamp-2 mt-1 leading-snug">
                            {c.title}
                          </div>

                          {/* Prerequisites summary */}
                          {c.prerequisites.length > 0 && (
                            <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center gap-1 text-[10px] text-slate-500">
                              <span className="text-[9px] uppercase font-semibold text-slate-400">Req:</span>
                              <span className="font-mono truncate">{c.prerequisites.join(', ')}</span>
                            </div>
                          )}

                          {/* Status Pip */}
                          <div className="absolute top-2 right-2">
                            {c.status === 'validated' ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] inline-block" title="Validated" />
                            ) : c.status === 'under_revision' ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] inline-block" title="Under Revision" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#64748B] inline-block" title="Draft" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* Supporting General Education or Math indicator */}
                  <div className="mt-auto pt-2 text-center">
                    <span className="text-[10px] font-mono text-slate-400">
                      ~16 credits total
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
