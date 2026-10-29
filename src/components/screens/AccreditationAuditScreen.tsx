/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download, 
  Award, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Edit2
} from 'lucide-react';
import { AbetCriterionCheck } from '../../types/curriculum';

interface AccreditationAuditScreenProps {
  criteria: AbetCriterionCheck[];
  onOpenSignOff: () => void;
  onExportDossier: () => void;
}

export const AccreditationAuditScreen: React.FC<AccreditationAuditScreenProps> = ({
  criteria,
  onOpenSignOff,
  onExportDossier
}) => {
  const [expandedId, setExpandedId] = useState<string | null>('crit-3');
  const [selectedStandard, setSelectedStandard] = useState<'all' | 'ABET EAC' | 'WASC (WSCUC)'>('all');

  const filteredCriteria = selectedStandard === 'all'
    ? criteria
    : criteria.filter(c => c.standardBody === selectedStandard);

  const compliantCount = criteria.filter(c => c.status === 'compliant').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#0F172A] flex items-center gap-2">
            <span>Accreditation Audit Ledger & SSR Evaluation</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 text-[#059669] border border-emerald-300">
              General Criteria 1–8
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Authoritative compliance tracking across ABET Engineering Accreditation Commission (EAC) criteria and WSCUC core competencies.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenSignOff}
            className="h-9 px-3.5 bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold rounded hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Digital Sign-Off Sheet</span>
          </button>

          <button
            type="button"
            onClick={onExportDossier}
            className="h-9 px-3.5 bg-[#4F46E5] text-white text-xs font-semibold rounded hover:bg-[#4338CA] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Self-Study Report (SSR)</span>
          </button>
        </div>
      </div>

      {/* Compliance Overview Banner */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded p-5 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Overall EAC Audit Status
          </span>
          <div className="text-xl font-bold text-[#059669] flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5" />
            <span>Substantially Compliant</span>
          </div>
          <p className="text-[11px] text-slate-500">
            No institutional deficiencies or weakness flags cited.
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Criteria Verification Score
          </span>
          <div className="text-xl font-bold font-mono text-[#0F172A] tabular-nums">
            {compliantCount} of {criteria.length} Criteria Passed
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-[#059669] h-full" style={{ width: `${(compliantCount / criteria.length) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Verified Artifact Evidences
          </span>
          <div className="text-xl font-bold font-mono text-[#4F46E5] tabular-nums">
            154 Documents
          </div>
          <p className="text-[11px] text-slate-500">
            Course binders, direct assessments, student work samples.
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Next External Evaluation
          </span>
          <div className="text-xl font-bold font-mono text-slate-900">
            November 2026
          </div>
          <p className="text-[11px] text-slate-500">
            Peer Review Team Campus On-Site Visit.
          </p>
        </div>
      </div>

      {/* Criteria Breakdown Accordion List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pb-1">
          <span>ABET EAC GENERAL CRITERIA LEDGER (2026–2027 STANDARDS)</span>
          <span className="text-slate-400 font-mono text-[11px]">Click row to expand evidence portfolio</span>
        </div>

        {filteredCriteria.map((crit) => {
          const isExpanded = expandedId === crit.id;

          return (
            <div
              key={crit.id}
              className="bg-white border border-[#CBD5E1] rounded shadow-sm overflow-hidden transition-all"
            >
              {/* Row Header */}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : crit.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  {/* Status Indicator */}
                  {crit.status === 'compliant' ? (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-[#ECFDF5] border border-[#059669] text-[#059669] shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-amber-50 border border-amber-500 text-amber-700 shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {crit.criterionNumber}
                      </span>
                      <h3 className="font-bold text-sm text-[#0F172A]">{crit.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {crit.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex flex-col text-right text-xs">
                    <span className="font-mono font-medium text-slate-700 tabular-nums">
                      {crit.evidenceCount} Evidences Linked
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Lead: {crit.leadAuditor.split(' ')[0]} {crit.leadAuditor.split(' ')[1] || ''}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                    crit.status === 'compliant' 
                      ? 'bg-[#ECFDF5] text-[#059669] border-[#059669]/40' 
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {crit.status === 'compliant' ? 'Compliant' : 'Review Required'}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] space-y-4 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-700 uppercase tracking-wider text-[11px] mb-1">
                      Full Criterion Requirement & Scope
                    </h4>
                    <p className="text-slate-800 leading-relaxed bg-white p-3 rounded border border-slate-200">
                      {crit.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Auditor Evaluation Notes */}
                    <div className="bg-white p-3 rounded border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                        <span>INTERNAL AUDIT EVALUATION NOTES</span>
                        <span className="font-mono text-slate-400">Lead: {crit.leadAuditor}</span>
                      </div>
                      <p className="text-slate-700 italic">
                        "{crit.notes}"
                      </p>
                    </div>

                    {/* Verified Artifacts Portfolio */}
                    <div className="bg-white p-3 rounded border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                        <span>LINKED EVIDENCE ARTIFACTS ({crit.evidenceCount})</span>
                        <span className="text-[#4F46E5] cursor-pointer hover:underline">Manage Artifacts</span>
                      </div>
                      <div className="space-y-1 text-slate-600">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>Official Course Syllabi & Outcome Matrices (PDF Binder)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>Graded Student Work Samples: High, Medium, Low thresholds</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span>Continuous Improvement Advisory Committee Minutes (2024–2026)</span>
                        </div>
                      </div>
                    </div>
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
