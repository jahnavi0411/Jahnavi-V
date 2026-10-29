/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  User, 
  Layers, 
  FileCheck, 
  Printer,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { CourseModule, ModuleStatus } from '../../types/curriculum';

interface CourseDetailModalProps {
  course: CourseModule | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCourse: (updated: CourseModule) => void;
  allCourses: CourseModule[];
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onUpdateCourse,
  allCourses
}) => {
  if (!isOpen || !course) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CourseModule>({ ...course });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCourse(formData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] w-full max-w-3xl rounded border border-[#CBD5E1] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#1E293B] border border-slate-700 flex items-center justify-center text-[#4F46E5] font-mono font-bold text-sm">
              {course.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">
                  Syllabus Document {course.syllabusVersion}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-[11px] font-mono text-slate-400">
                  Semester {course.recommendedSemester}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {course.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="h-8 px-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-xs font-semibold text-white flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Syllabus'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#0F172A]">
          {isEditing ? (
            /* Editing Form */
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-mono font-bold text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ModuleStatus })}
                    className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-semibold text-[#0F172A]"
                  >
                    <option value="validated">Accredited & Validated</option>
                    <option value="under_revision">Under Senate Revision</option>
                    <option value="draft">Draft Specification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                  Full Course Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-semibold text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                  Catalog Description & Objectives
                </label>
                <textarea
                  rows={4}
                  value={formData.catalogDescription}
                  onChange={(e) => setFormData({ ...formData, catalogDescription: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                    Accredited Credits
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: parseFloat(e.target.value) || 0 })}
                    className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-mono font-bold text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                    Lead Faculty Instructor
                  </label>
                  <input
                    type="text"
                    value={formData.leadFaculty}
                    onChange={(e) => setFormData({ ...formData, leadFaculty: e.target.value })}
                    className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                    Syllabus Version
                  </label>
                  <input
                    type="text"
                    value={formData.syllabusVersion}
                    onChange={(e) => setFormData({ ...formData, syllabusVersion: e.target.value })}
                    className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-mono text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="h-8 px-3.5 bg-white border border-[#CBD5E1] rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-8 px-4 bg-[#4F46E5] text-white rounded text-xs font-semibold hover:bg-[#4338CA]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <>
              {/* Status and Attributes Card */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">Institutional Governance</div>
                  <div className="flex items-center gap-2">
                    {course.status === 'validated' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#ECFDF5] border border-[#059669] text-[#059669] text-xs font-bold rounded">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                        Accredited & Validated
                      </span>
                    )}
                    {course.status === 'under_revision' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 border border-[#4F46E5] text-[#4F46E5] text-xs font-bold rounded">
                        <Clock className="w-3.5 h-3.5 text-[#4F46E5]" />
                        Under Revision
                      </span>
                    )}
                    {course.status === 'draft' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 border border-[#64748B] text-[#64748B] text-xs font-bold rounded">
                        Draft Specification
                      </span>
                    )}
                    <span className="font-mono text-xs font-semibold text-slate-700 bg-white px-2 py-0.5 border border-slate-200 rounded">
                      {course.credits.toFixed(1)} Semester Credits
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <div className="text-[11px] font-semibold uppercase text-slate-400">Faculty Leadership</div>
                  <div className="font-semibold text-xs text-slate-900">{course.leadFaculty}</div>
                  <div className="font-mono text-[10px] text-slate-500">{course.facultyEmail}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                  Official Academic Catalog Description
                </h3>
                <p className="text-xs text-slate-800 leading-relaxed bg-white border border-[#CBD5E1] p-3 rounded">
                  {course.catalogDescription}
                </p>
              </div>

              {/* Weekly Effort & Federal Credit Hour Ledger */}
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                  Federal 34 CFR 600.2 Effort Breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-3 rounded border border-[#E2E8F0] font-mono text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Direct Lecture</span>
                    <strong className="text-slate-900">{course.creditHours.lectureHoursWeekly}h / week</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Supervised Lab</span>
                    <strong className="text-slate-900">{course.creditHours.labHoursWeekly}h / week</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Independent Study</span>
                    <strong className="text-slate-900">{course.creditHours.outsideStudyHoursWeekly}h / week</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">Semester Total</span>
                    <strong className="text-[#059669]">{course.creditHours.totalStudentEffortHours}h Total</strong>
                  </div>
                </div>
              </div>

              {/* Learning Outcomes Matrix for this Course */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                    Course Learning Outcomes & Rubrics ({course.learningOutcomes.length})
                  </h3>
                </div>

                <div className="space-y-2">
                  {course.learningOutcomes.map((lo) => (
                    <div key={lo.id} className="bg-white border border-[#CBD5E1] rounded p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {lo.code}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
                            {lo.bloomsLevel}
                          </span>
                          <span className="font-mono text-[11px] text-[#059669] font-bold">
                            {lo.measuredAttainmentRate}% Attainment
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-800">{lo.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FFFFFF] border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400">
            Audit Date: {course.lastAuditDate}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-4 bg-[#0F172A] text-white text-xs font-semibold rounded hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
