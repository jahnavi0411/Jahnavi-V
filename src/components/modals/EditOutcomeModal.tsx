/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Sparkles,
  Layers,
  Scale
} from 'lucide-react';
import { CourseModule, LearningOutcome, BloomsTaxonomyLevel, AssessmentLinkage } from '../../types/curriculum';
import { BLOOMS_LEVELS_METADATA, ABET_STUDENT_OUTCOMES_DEF } from '../../data/mockCurriculumData';

interface EditOutcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: CourseModule[];
  initialCourse?: CourseModule;
  initialOutcome?: LearningOutcome;
  onSaveOutcome: (courseId: string, outcome: LearningOutcome) => void;
}

export const EditOutcomeModal: React.FC<EditOutcomeModalProps> = ({
  isOpen,
  onClose,
  courses,
  initialCourse,
  initialOutcome,
  onSaveOutcome
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourse?.id || courses[0]?.id || ''
  );
  const [code, setCode] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bloomsLevel, setBloomsLevel] = useState<BloomsTaxonomyLevel>('Analyzing (L4)');
  const [selectedSos, setSelectedSos] = useState<string[]>(['SO-1']);
  const [targetRate, setTargetRate] = useState<number>(80);
  const [measuredRate, setMeasuredRate] = useState<number>(82);
  const [assessments, setAssessments] = useState<AssessmentLinkage[]>([
    { id: 'as-new-1', name: 'Comprehensive Examination', weightPercentage: 50, type: 'Exam', thresholdCriteria: 'Score ≥ 70%', currentCohortAttainment: 84 },
    { id: 'as-new-2', name: 'Applied Laboratory Project', weightPercentage: 50, type: 'Project', thresholdCriteria: 'Pass unit tests ≥ 80%', currentCohortAttainment: 80 }
  ]);

  useEffect(() => {
    if (initialOutcome) {
      setCode(initialOutcome.code);
      setDescription(initialOutcome.description);
      setBloomsLevel(initialOutcome.bloomsLevel);
      setSelectedSos(initialOutcome.abetStudentOutcomes);
      setTargetRate(initialOutcome.targetAttainmentRate);
      setMeasuredRate(initialOutcome.measuredAttainmentRate);
      setAssessments(initialOutcome.assessments);
    } else if (initialCourse) {
      const nextIndex = initialCourse.learningOutcomes.length + 1;
      setCode(`${initialCourse.code.replace(' ', '')}-LO-${nextIndex}`);
      setDescription('');
      setBloomsLevel('Applying (L3)');
      setSelectedSos(['SO-1']);
      setTargetRate(80);
      setMeasuredRate(85);
      setAssessments([
        { id: `as-${Date.now()}-1`, name: 'Midterm Assessment', weightPercentage: 40, type: 'Exam', thresholdCriteria: 'Score ≥ 70%', currentCohortAttainment: 82 },
        { id: `as-${Date.now()}-2`, name: 'Capstone Practicum Project', weightPercentage: 60, type: 'Project', thresholdCriteria: 'Rubric met ≥ 80%', currentCohortAttainment: 88 }
      ]);
    }
    if (initialCourse) {
      setSelectedCourseId(initialCourse.id);
    }
  }, [initialOutcome, initialCourse, isOpen]);

  if (!isOpen) return null;

  const totalWeight = assessments.reduce((sum, a) => sum + (Number(a.weightPercentage) || 0), 0);
  const isBalanced = totalWeight === 100;

  const handleToggleSo = (soCode: string) => {
    if (selectedSos.includes(soCode)) {
      if (selectedSos.length > 1) {
        setSelectedSos(selectedSos.filter(s => s !== soCode));
      }
    } else {
      setSelectedSos([...selectedSos, soCode]);
    }
  };

  const handleAddAssessment = () => {
    setAssessments([
      ...assessments,
      {
        id: `as-${Date.now()}`,
        name: 'New Assessment Instrument',
        weightPercentage: 20,
        type: 'Project',
        thresholdCriteria: 'Score ≥ 75%',
        currentCohortAttainment: 80
      }
    ]);
  };

  const handleRemoveAssessment = (id: string) => {
    if (assessments.length > 1) {
      setAssessments(assessments.filter(a => a.id !== id));
    }
  };

  const handleUpdateAssessment = (id: string, field: keyof AssessmentLinkage, value: any) => {
    setAssessments(assessments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !code.trim()) return;

    const outcomeData: LearningOutcome = {
      id: initialOutcome?.id || `lo-${Date.now()}`,
      code: code.trim(),
      description: description.trim(),
      bloomsLevel,
      abetStudentOutcomes: selectedSos,
      wascCompetencies: ['Critical Thinking'],
      targetAttainmentRate: targetRate,
      measuredAttainmentRate: measuredRate,
      status: measuredRate >= targetRate ? 'compliant' : 'review_required',
      assessments
    };

    onSaveOutcome(selectedCourseId, outcomeData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] w-full max-w-2xl rounded border border-[#CBD5E1] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#4F46E5]" />
            <h2 className="text-base font-bold text-white">
              {initialOutcome ? 'Edit Competency Outcome Specification' : 'Map New Course Learning Outcome'}
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
          {/* Target Course & Outcome Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Parent Course Module
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                disabled={!!initialOutcome}
                className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}: {c.title.slice(0, 30)}...
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Outcome Index Code (e.g. CS-LO-301.1)
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-mono font-bold text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          {/* Outcome Description */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Measurable Performance Statement
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="State what the student will be able to formulate, analyze, design, evaluate, or construct..."
              className="w-full p-2.5 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
            />
          </div>

          {/* Bloom's Level & Attainment Target */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Bloom's Taxonomy Cognitive Classification
              </label>
              <select
                value={bloomsLevel}
                onChange={(e) => setBloomsLevel(e.target.value as BloomsTaxonomyLevel)}
                className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              >
                {BLOOMS_LEVELS_METADATA.map((b) => (
                  <option key={b.level} value={b.level}>
                    {b.level} — {b.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                Target Threshold (%)
              </label>
              <input
                type="number"
                min="50"
                max="100"
                value={targetRate}
                onChange={(e) => setTargetRate(parseInt(e.target.value) || 80)}
                className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs font-mono font-bold text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          {/* ABET Student Outcomes Mapping Checkboxes */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              ABET Criterion 3 Student Outcomes (Select applicable)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ABET_STUDENT_OUTCOMES_DEF.map((so) => {
                const isSelected = selectedSos.includes(so.code);
                return (
                  <button
                    key={so.code}
                    type="button"
                    onClick={() => handleToggleSo(so.code)}
                    className={`p-2 rounded border text-left flex items-start gap-2 transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-[#4F46E5] text-[#4F46E5]'
                        : 'bg-white border-[#CBD5E1] text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-sm border shrink-0 mt-0.5 flex items-center justify-center ${
                      isSelected ? 'bg-[#4F46E5] border-[#4F46E5] text-white' : 'border-slate-400 bg-white'
                    }`}>
                      {isSelected && <span className="text-[10px] font-bold">✓</span>}
                    </div>
                    <div>
                      <div className="font-mono font-bold text-[11px]">{so.code}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{so.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Assessment Linkage & Weights */}
          <div className="border-t border-[#E2E8F0] pt-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-700">
                <Scale className="w-4 h-4 text-[#4F46E5]" />
                <span>Multi-Method Assessment Instruments & Weights</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold ${isBalanced ? 'text-[#059669]' : 'text-[#DC2626]'}`}>
                  Total: {totalWeight}% {isBalanced ? '✓ Validated' : '⚠️ Must sum to 100%'}
                </span>
                <button
                  type="button"
                  onClick={handleAddAssessment}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-[11px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Instrument
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {assessments.map((as, index) => (
                <div key={as.id} className="flex items-center gap-2 bg-[#F8FAFC] p-2 rounded border border-[#E2E8F0]">
                  <input
                    type="text"
                    value={as.name}
                    onChange={(e) => handleUpdateAssessment(as.id, 'name', e.target.value)}
                    placeholder="Assessment instrument name..."
                    className="flex-1 h-7 px-2 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A]"
                  />

                  <select
                    value={as.type}
                    onChange={(e) => handleUpdateAssessment(as.id, 'type', e.target.value)}
                    className="h-7 px-1.5 bg-white border border-[#CBD5E1] rounded text-xs text-slate-800"
                  >
                    <option value="Exam">Exam</option>
                    <option value="Project">Project</option>
                    <option value="Lab Practicum">Lab Practicum</option>
                    <option value="Problem Set">Problem Set</option>
                    <option value="Oral Defense">Oral Defense</option>
                    <option value="Peer Review">Peer Review</option>
                  </select>

                  <div className="flex items-center gap-1 shrink-0">
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={as.weightPercentage}
                      onChange={(e) => handleUpdateAssessment(as.id, 'weightPercentage', parseInt(e.target.value) || 0)}
                      className="w-14 h-7 px-1.5 text-right font-mono font-bold text-xs bg-white border border-[#CBD5E1] rounded"
                    />
                    <span className="font-mono text-xs text-slate-500">%</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveAssessment(as.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded"
                    title="Remove Instrument"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-8 px-3.5 bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold rounded hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-8 px-4 bg-[#4F46E5] text-white text-xs font-semibold rounded hover:bg-[#4338CA] active:scale-[0.99] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save & Validate Outcome</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
