/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Plus, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { CourseModule, ModuleStatus } from '../../types/curriculum';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (course: CourseModule) => void;
  existingCourses: CourseModule[];
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  onAddCourse,
  existingCourses
}) => {
  if (!isOpen) return null;

  const [code, setCode] = useState('CS 360');
  const [title, setTitle] = useState('Computer Networks & Distributed Protocols');
  const [semester, setSemester] = useState(5);
  const [credits, setCredits] = useState(4.0);
  const [lectureHours, setLectureHours] = useState(3.0);
  const [labHours, setLabHours] = useState(2.0);
  const [outsideHours, setOutsideHours] = useState(7.0);
  const [status, setStatus] = useState<ModuleStatus>('validated');
  const [faculty, setFaculty] = useState('Dr. Maya Patel, Ph.D.');
  const [facultyEmail, setFacultyEmail] = useState('mpatel@institute.edu');
  const [catalogDescription, setCatalogDescription] = useState('Layered protocol architectures, socket programming, reliable transport (TCP), congestion avoidance algorithms, routing fabrics (BGP, OSPF), and software-defined networks.');
  const [selectedPrereqs, setSelectedPrereqs] = useState<string[]>(['CS 201']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    const totalContact = (lectureHours + labHours) * 15;
    const totalEffort = (lectureHours + labHours + outsideHours) * 15;

    const newModule: CourseModule = {
      id: `cs-${Date.now()}`,
      code: code.trim(),
      title: title.trim(),
      department: 'Computer Science & Software Engineering',
      termOffered: 'Both',
      recommendedSemester: semester,
      credits,
      status,
      leadFaculty: faculty.trim(),
      facultyEmail: facultyEmail.trim(),
      syllabusVersion: 'v1.0 (2026)',
      lastAuditDate: new Date().toISOString().split('T')[0],
      catalogDescription: catalogDescription.trim(),
      prerequisites: selectedPrereqs,
      creditHours: {
        lectureHoursWeekly: lectureHours,
        labHoursWeekly: labHours,
        outsideStudyHoursWeekly: outsideHours,
        semesterWeeks: 15,
        totalContactHours: totalContact,
        totalStudentEffortHours: totalEffort,
        accreditedCredits: credits,
        federalFormulaCompliant: true,
      },
      abetCriteriaMapped: ['Criterion 3 (SO-1, SO-2)', 'Criterion 5 (Curriculum)'],
      learningOutcomes: [
        {
          id: `lo-${Date.now()}-1`,
          code: `${code.replace(/\s+/g, '')}-LO-1`,
          description: `Analyze protocol header encodings, congestion state machines, and packet loss recovery in TCP flow control.`,
          bloomsLevel: 'Analyzing (L4)',
          abetStudentOutcomes: ['SO-1', 'SO-6'],
          wascCompetencies: ['Quantitative Reasoning', 'Critical Thinking'],
          targetAttainmentRate: 80,
          measuredAttainmentRate: 84.5,
          status: 'compliant',
          assessments: [
            { id: `as-${Date.now()}-1`, name: 'Socket Network Protocol Lab', weightPercentage: 50, type: 'Lab Practicum', thresholdCriteria: 'Packet integrity verified', currentCohortAttainment: 85.0 },
            { id: `as-${Date.now()}-2`, name: 'Midterm Networking Exam', weightPercentage: 50, type: 'Exam', thresholdCriteria: 'Score ≥ 70%', currentCohortAttainment: 84.0 }
          ]
        }
      ]
    };

    onAddCourse(newModule);
    onClose();
  };

  const handleTogglePrereq = (courseCode: string) => {
    if (selectedPrereqs.includes(courseCode)) {
      setSelectedPrereqs(selectedPrereqs.filter(c => c !== courseCode));
    } else {
      setSelectedPrereqs([...selectedPrereqs, courseCode]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] w-full max-w-2xl rounded border border-[#CBD5E1] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#4F46E5]" />
            <h2 className="text-base font-bold text-white">
              Create New Accredited Course Module
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs text-[#0F172A]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Course Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CS 360"
                className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-mono font-bold text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Course Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Computer Networks & Distributed Protocols"
                className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Recommended Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(parseInt(e.target.value))}
                className="w-full h-8 px-2 bg-white border border-[#CBD5E1] rounded text-xs font-medium text-[#0F172A]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Credit Hours
              </label>
              <input
                type="number"
                step="0.5"
                value={credits}
                onChange={(e) => setCredits(parseFloat(e.target.value) || 0)}
                className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-mono font-bold text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Audit Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ModuleStatus)}
                className="w-full h-8 px-2 bg-white border border-[#CBD5E1] rounded text-xs font-semibold text-[#0F172A]"
              >
                <option value="validated">Accredited & Validated</option>
                <option value="under_revision">Under Senate Revision</option>
                <option value="draft">Draft Specification</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Catalog Description
            </label>
            <textarea
              rows={3}
              required
              value={catalogDescription}
              onChange={(e) => setCatalogDescription(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          {/* Contact Hours */}
          <div className="bg-[#F8FAFC] p-3 rounded border border-[#E2E8F0]">
            <span className="block text-[11px] font-semibold text-slate-600 uppercase mb-2">
              Weekly Contact & Effort Hours (34 CFR 600.2 Compliance)
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Lecture Hrs/Wk</label>
                <input
                  type="number"
                  step="0.5"
                  value={lectureHours}
                  onChange={(e) => setLectureHours(parseFloat(e.target.value) || 0)}
                  className="w-full h-7 px-2 bg-white border border-[#CBD5E1] rounded font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Lab Hrs/Wk</label>
                <input
                  type="number"
                  step="0.5"
                  value={labHours}
                  onChange={(e) => setLabHours(parseFloat(e.target.value) || 0)}
                  className="w-full h-7 px-2 bg-white border border-[#CBD5E1] rounded font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Outside Study Hrs/Wk</label>
                <input
                  type="number"
                  step="0.5"
                  value={outsideHours}
                  onChange={(e) => setOutsideHours(parseFloat(e.target.value) || 0)}
                  className="w-full h-7 px-2 bg-white border border-[#CBD5E1] rounded font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Prerequisites Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Prerequisites (Select required foundation courses)
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-white border border-[#CBD5E1] rounded">
              {existingCourses.map((c) => {
                const isSelected = selectedPrereqs.includes(c.code);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleTogglePrereq(c.code)}
                    className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-[#4F46E5] text-white font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {c.code} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Faculty Instructor Lead
              </label>
              <input
                type="text"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Instructor Email
              </label>
              <input
                type="email"
                value={facultyEmail}
                onChange={(e) => setFacultyEmail(e.target.value)}
                className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A]"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-3.5 bg-white border border-[#CBD5E1] text-[#0F172A] rounded font-semibold text-xs hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8 px-4 bg-[#4F46E5] text-white rounded font-semibold text-xs hover:bg-[#4338CA] shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Create Module</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
