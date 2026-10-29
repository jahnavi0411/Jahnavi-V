/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  FileCheck, 
  Award, 
  ExternalLink,
  ChevronDown,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface HeaderProps {
  onOpenSignOff: () => void;
  onExportDossier: () => void;
  activeProgram: string;
  setActiveProgram: (p: string) => void;
  coursesCount: number;
  outcomesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSignOff,
  onExportDossier,
  activeProgram,
  setActiveProgram,
  coursesCount,
  outcomesCount
}) => {
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);

  const programs = [
    'B.S. in Computer Science & Software Engineering (ABET EAC)',
    'B.S. in Artificial Intelligence & Data Architecture (ABET CAC)',
    'B.S. in Electrical & Computer Systems Engineering (ABET EAC)',
    'M.S. in Applied Software Architecture & Distributed Systems'
  ];

  return (
    <header className="border-b border-[#E2E8F0] bg-[#FFFFFF] sticky top-0 z-30 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)]">
      {/* Institutional Top Bar */}
      <div className="bg-[#0F172A] text-white px-4 md:px-8 py-1.5 flex flex-wrap items-center justify-between text-xs font-mono tracking-wide">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-slate-200 uppercase flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#059669] animate-pulse-subtle"></span>
            Academic Precision
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 hidden sm:inline">Institutional Accreditation & Curriculum Architecture System</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400">California Institute of Technology & Computing</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-300">
          <span className="hidden md:inline text-slate-400">Cycle: AY 2026–2027 Comprehensive Review</span>
          <span className="text-slate-500 hidden md:inline">•</span>
          <span className="inline-flex items-center gap-1 text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded-sm border border-[#059669]/30 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            ABET EAC Certified
          </span>
        </div>
      </div>

      {/* Main Header / Navigation Chrome */}
      <div className="px-4 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Program Identity & Switcher */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded bg-[#0F172A] flex items-center justify-center text-white font-bold text-lg border border-slate-700 shadow-sm">
            AP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProgramDropdownOpen(!isProgramDropdownOpen)}
                  className="group flex items-center gap-2 text-base md:text-lg font-bold text-[#0F172A] hover:text-[#4F46E5] transition-colors focus:outline-none"
                >
                  <span>{activeProgram}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-[#4F46E5] transition-transform duration-150" />
                </button>

                {isProgramDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-96 bg-white border border-[#CBD5E1] rounded shadow-[0_10px_15px_-3px_rgba(15,23,42,0.08)] py-1.5 z-50">
                    <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      Degree Programs Under Accreditation Review
                    </div>
                    {programs.map((prog) => (
                      <button
                        key={prog}
                        type="button"
                        onClick={() => {
                          setActiveProgram(prog);
                          setIsProgramDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#F8FAFC] flex items-center justify-between ${
                          activeProgram === prog ? 'text-[#4F46E5] bg-indigo-50/50 font-semibold' : 'text-[#0F172A]'
                        }`}
                      >
                        <span>{prog}</span>
                        {activeProgram === prog && <CheckCircle2 className="w-3.5 h-3.5 text-[#4F46E5]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600 mt-0.5">
              <span>Department of Computer Science & Software Engineering</span>
              <span className="text-slate-300">•</span>
              <span className="font-mono tabular-nums text-slate-700 font-medium">128.0 Total Program Credits</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center text-[#059669] font-medium gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
                Criterion 3 & 5 Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Metrics & Action Vectors */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Quick Metrics Chips */}
          <div className="hidden xl:flex items-center gap-2 border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 rounded text-xs text-slate-700">
            <span className="text-slate-500">Modules:</span>
            <span className="font-semibold font-mono tabular-nums text-[#0F172A]">{coursesCount}</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">Outcomes:</span>
            <span className="font-semibold font-mono tabular-nums text-[#0F172A]">{outcomesCount}</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">ABET Coverage:</span>
            <span className="font-semibold font-mono tabular-nums text-[#059669]">100%</span>
          </div>

          {/* Secondary Button: Sign-off Sheet */}
          <button
            type="button"
            onClick={onOpenSignOff}
            className="h-9 px-3.5 bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold rounded hover:bg-[#F8FAFC] hover:border-[#94A3B8] active:scale-[0.99] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Accreditation Sign-offs</span>
          </button>

          {/* Primary Button: Export Dossier */}
          <button
            type="button"
            onClick={onExportDossier}
            className="h-9 px-3.5 bg-[#4F46E5] text-white text-xs font-semibold rounded hover:bg-[#4338CA] active:scale-[0.99] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export SSR Dossier</span>
          </button>
        </div>
      </div>
    </header>
  );
};
