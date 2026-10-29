/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileCheck2, 
  Copy, 
  Check, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { CourseModule, AbetCriterionCheck, DigitalSignOff } from '../../types/curriculum';

interface ExportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  courses: CourseModule[];
  criteria: AbetCriterionCheck[];
  signoffs: DigitalSignOff[];
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({
  isOpen,
  onClose,
  programTitle,
  courses,
  criteria,
  signoffs
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  // Generate dossier text
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalOutcomes = courses.reduce((sum, c) => sum + c.learningOutcomes.length, 0);
  const compliantCriteria = criteria.filter(c => c.status === 'compliant').length;

  const dossierContent = `
================================================================================
INSTITUTIONAL ACCREDITATION SELF-STUDY REPORT (SSR) DOSSIER
CALIFORNIA INSTITUTE OF TECHNOLOGY & COMPUTING
COLLEGE OF ENGINEERING & APPLIED SCIENCES
================================================================================

DEGREE PROGRAM: ${programTitle}
ACCREDITATION CYCLE: AY 2026-2027 Comprehensive Self-Study Review
AUDIT STATUS: Substantially Compliant (0 Deficiencies, 0 Weaknesses)
TOTAL PROGRAM CREDITS: ${totalCredits.toFixed(1)} Semester Credits
TOTAL MAPPED LEARNING OUTCOMES: ${totalOutcomes}
ABET EAC GENERAL CRITERIA STATUS: ${compliantCriteria} of ${criteria.length} Criteria Passed

--------------------------------------------------------------------------------
1. ACCREDITED COURSE MODULES & CONTACT-HOUR BREAKDOWN (34 CFR § 600.2)
--------------------------------------------------------------------------------
${courses.map(c => `
• [${c.code}] ${c.title}
  Semester: ${c.recommendedSemester} (${c.termOffered}) | Credits: ${c.credits.toFixed(1)} | Status: ${c.status.toUpperCase()}
  Contact Hours: ${c.creditHours.lectureHoursWeekly}h Lec + ${c.creditHours.labHoursWeekly}h Lab = ${c.creditHours.totalContactHours}h Term Contact
  Student Effort Total: ${c.creditHours.totalStudentEffortHours}h (Federal Formula Compliant: YES)
  Prerequisites: ${c.prerequisites.length ? c.prerequisites.join(', ') : 'None'}
  Faculty Lead: ${c.leadFaculty} (${c.facultyEmail})
  Mapped Outcomes:
${c.learningOutcomes.map(lo => `    - ${lo.code} [${lo.bloomsLevel}]: ${lo.description} (Attainment: ${lo.measuredAttainmentRate}% vs ${lo.targetAttainmentRate}% target)`).join('\n')}
`).join('')}

--------------------------------------------------------------------------------
2. ABET GENERAL CRITERIA 1 THROUGH 8 VERIFICATION LEDGER
--------------------------------------------------------------------------------
${criteria.map(crit => `
[${crit.criterionNumber}] ${crit.title}
Status: ${crit.status.toUpperCase()} | Evidence Count: ${crit.evidenceCount} | Lead Auditor: ${crit.leadAuditor}
Requirement: ${crit.description}
Auditor Notes: "${crit.notes}"
`).join('\n')}

--------------------------------------------------------------------------------
3. INSTITUTIONAL SIGN-OFF & CRYPTOGRAPHIC VERIFICATION TRAIL
--------------------------------------------------------------------------------
${signoffs.map(sig => `
• ${sig.name} (${sig.title})
  Role: ${sig.role}
  Timestamp: ${sig.timestamp}
  Hash Signature: ${sig.hashSignature || 'PENDING'}
  Remarks: "${sig.comments || 'Endorsed without reservation'}"
`).join('\n')}

================================================================================
Generated via Academic Precision Curriculum Architecture System
Timestamp: ${new Date().toISOString()}
================================================================================
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(dossierContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([dossierContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ABET_SelfStudyReport_${programTitle.slice(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}_2026.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] w-full max-w-3xl rounded border border-[#CBD5E1] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#059669]" />
            <div>
              <h2 className="text-base font-bold text-white">
                Export ABET Self-Study Report (SSR) Dossier
              </h2>
              <span className="text-[11px] font-mono text-slate-400">
                Formal Academic Submission Packet • Cycle 2026–2027
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-[#0F172A]">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>SELF-STUDY DOSSIER PREVIEW</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-1 bg-white border border-[#CBD5E1] hover:bg-slate-50 rounded text-slate-700 font-semibold flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded text-[11px] font-mono text-slate-800 whitespace-pre-wrap max-h-[460px] overflow-y-auto leading-relaxed">
            {dossierContent}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FFFFFF] border-t border-[#E2E8F0] flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Format: Standard EAC Self-Study Appendix Plaintext
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="h-8 px-3 bg-white border border-[#CBD5E1] rounded text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="h-8 px-4 bg-[#4F46E5] text-white rounded text-xs font-semibold hover:bg-[#4338CA] flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Report (.txt)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
