/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Layers, 
  Grid3X3, 
  GitFork, 
  Clock, 
  CheckCircle,
  FileText
} from 'lucide-react';

export type ActiveScreen = 'workbench' | 'matrix' | 'pathways' | 'credit-ledger' | 'audit-ledger';

interface NavigationTabsProps {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  coursesCount: number;
  outcomesCount: number;
  auditIssuesCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeScreen,
  setActiveScreen,
  coursesCount,
  outcomesCount,
  auditIssuesCount
}) => {
  const tabs: { id: ActiveScreen; label: string; icon: React.FC<{ className?: string }>; count?: string | number; badgeColor?: string }[] = [
    {
      id: 'workbench',
      label: 'Curriculum Workbench',
      icon: Layers,
      count: coursesCount,
    },
    {
      id: 'matrix',
      label: 'Competency Matrix & Bloom\'s',
      icon: Grid3X3,
      count: outcomesCount,
    },
    {
      id: 'pathways',
      label: 'Prerequisite Pathway Map',
      icon: GitFork,
      count: '8 Semesters',
    },
    {
      id: 'credit-ledger',
      label: 'Federal Credit Hour Ledger',
      icon: Clock,
      count: '34 CFR 600.2',
    },
    {
      id: 'audit-ledger',
      label: 'Accreditation Audit Ledger',
      icon: CheckCircle,
      count: auditIssuesCount > 0 ? `${auditIssuesCount} Review` : 'All Compliant',
      badgeColor: auditIssuesCount > 0 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
    }
  ];

  return (
    <div className="border-b border-[#E2E8F0] bg-[#FFFFFF] px-4 md:px-8">
      <nav className="flex space-x-1 sm:space-x-6 overflow-x-auto py-0 -mb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeScreen === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveScreen(tab.id)}
              className={`group whitespace-nowrap py-3 px-2 sm:px-1 border-b-2 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-[#4F46E5] text-[#4F46E5]'
                  : 'border-transparent text-slate-600 hover:text-[#0F172A] hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#4F46E5]' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[11px] font-mono font-medium px-1.5 py-0.5 rounded border tabular-nums ${
                    tab.badgeColor 
                      ? tab.badgeColor 
                      : isActive 
                        ? 'bg-indigo-50 text-[#4F46E5] border-indigo-200' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
