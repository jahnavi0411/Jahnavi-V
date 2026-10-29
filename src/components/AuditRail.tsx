/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileCheck2, 
  ChevronRight,
  ShieldCheck,
  Award,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { AbetCriterionCheck } from '../types/curriculum';

interface AuditRailProps {
  criteria: AbetCriterionCheck[];
  onSelectCriterion?: (crit: AbetCriterionCheck) => void;
  onOpenSignOff: () => void;
  onRunAuditValidation: () => void;
  isValidating: boolean;
  totalProgramCredits: number;
}

export const AuditRail: React.FC<AuditRailProps> = ({
  criteria,
  onSelectCriterion,
  onOpenSignOff,
  onRunAuditValidation,
  isValidating,
  totalProgramCredits
}) => {
  const [filterType, setFilterType] = useState<'all' | 'pending'>('all');

  const compliantCount = criteria.filter(c => c.status === 'compliant').length;
  const pendingCount = criteria.filter(c => c.status !== 'compliant').length;
  const filteredCriteria = filterType === 'all' 
    ? criteria 
    : criteria.filter(c => c.status !== 'compliant');

  return (
    <aside className="w-full lg:w-[280px] shrink-0 bg-[#FFFFFF] border-l border-[#E2E8F0] p-4 flex flex-col space-y-5 text-xs text-[#0F172A]">
      {/* Structural Header */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-[#0F172A]">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>Accreditation Audit Rail</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-medium">ABET EAC</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
          Real-time institutional ledger tracking compliance rubrics across criteria 1–8.
        </p>
      </div>

      {/* Real-time Status Card */}
      <div className="bg-[#ECFDF5] border border-[#059669]/30 rounded p-3 text-[#0F172A]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-[#059669] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#059669] inline-block animate-pulse-subtle"></span>
            Evaluation Status
          </span>
          <span className="font-mono font-bold text-xs text-[#059669]">
            {compliantCount}/{criteria.length} Passed
          </span>
        </div>
        <div className="w-full bg-[#A7F3D0] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#059669] h-full transition-all duration-500" 
            style={{ width: `${(compliantCount / criteria.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-600 mt-2 font-mono tabular-nums">
          <span>Required Credits: 128.0</span>
          <span>Allocated: {totalProgramCredits.toFixed(1)}</span>
        </div>
      </div>

      {/* Quick Action: Re-run Audit Verification */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onRunAuditValidation}
          disabled={isValidating}
          className="w-full h-8 px-2 bg-white border border-[#CBD5E1] hover:border-[#94A3B8] hover:bg-[#F8FAFC] text-slate-700 font-semibold rounded text-[11px] flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 text-[#4F46E5] ${isValidating ? 'animate-spin' : ''}`} />
          <span>{isValidating ? 'Running Verification...' : 'Run Audit Check'}</span>
        </button>
      </div>

      {/* Criteria Filter & Ledger List */}
      <div className="space-y-2 flex-1">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
          <span>CRITERIA VERIFICATION</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${filterType === 'all' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              All ({criteria.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('pending')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${filterType === 'pending' ? 'bg-[#4F46E5] text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Pending ({pendingCount})
            </button>
          </div>
        </div>

        <div className="divide-y divide-[#E2E8F0] border border-[#E2E8F0] rounded overflow-hidden max-h-[380px] overflow-y-auto">
          {filteredCriteria.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCriterion?.(item)}
              className="w-full text-left p-2.5 hover:bg-[#F8FAFC] transition-colors flex items-start gap-2.5 group"
            >
              {/* Status Indicator */}
              <div className="mt-0.5 shrink-0">
                {item.status === 'compliant' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#059669] inline-block" title="Compliant" />
                ) : item.status === 'pending_review' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] inline-block" title="Under Review" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] inline-block" title="Action Required" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold text-xs text-[#0F172A] group-hover:text-[#4F46E5] transition-colors">
                    {item.criterionNumber}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {item.evidenceCount} Evidences
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-0.5 font-medium">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                  <span>Auditor: {item.leadAuditor.split(',')[0]}</span>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0 mt-1" />
            </button>
          ))}
        </div>
      </div>

      {/* Actionable Notice / Advisory Alert */}
      <div className="bg-[#FFFBEB] border border-[#FDE68A] p-2.5 rounded text-[11px] text-amber-900 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-amber-950">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Curriculum Advisory</span>
        </div>
        <p className="text-amber-800 leading-snug">
          CS 301 NP-reduction measured cohort attainment is at <span className="font-mono font-semibold">71.8%</span> (target: 75.0%). Remediation plan recorded for Spring 2027.
        </p>
      </div>

      {/* Institutional Sign-off Footer */}
      <div className="pt-2 border-t border-[#E2E8F0]">
        <button
          type="button"
          onClick={onOpenSignOff}
          className="w-full h-9 bg-white border border-[#CBD5E1] hover:border-[#4F46E5] hover:text-[#4F46E5] rounded font-semibold text-xs flex items-center justify-center gap-2 text-[#0F172A] transition-all shadow-sm group"
        >
          <Award className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>View Sign-Off Sheet</span>
        </button>
      </div>
    </aside>
  );
};
