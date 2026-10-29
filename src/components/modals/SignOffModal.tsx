/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Download, 
  KeyRound, 
  Calendar,
  PenTool,
  Lock
} from 'lucide-react';
import { DigitalSignOff } from '../../types/curriculum';

interface SignOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  signoffs: DigitalSignOff[];
  onAddSignature: (role: string, name: string, title: string, comment: string) => void;
  programTitle: string;
}

export const SignOffModal: React.FC<SignOffModalProps> = ({
  isOpen,
  onClose,
  signoffs,
  onAddSignature,
  programTitle
}) => {
  const [signerName, setSignerName] = useState('Dr. Alan Sterling, Ph.D.');
  const [signerRole, setSignerRole] = useState('Provost & Vice President of Academic Affairs');
  const [signerComment, setSignerComment] = useState('Program curriculum meets all institutional and ABET accreditation requirements for the 2026-2027 cycle.');
  const [isSigning, setIsSigning] = useState(false);

  if (!isOpen) return null;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName || !signerRole) return;
    setIsSigning(true);
    setTimeout(() => {
      onAddSignature(signerRole, signerName, signerRole, signerComment);
      setIsSigning(false);
    }, 400);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      {/* Tier 3 Modal Card */}
      <div className="bg-[#FFFFFF] w-full max-w-3xl rounded border border-[#CBD5E1] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12),0_8px_10px_-6px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0F172A] text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#1E293B] border border-slate-700 flex items-center justify-center text-[#059669]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Institutional Accreditation Dossier
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Official Curriculum Certification & Sign-Off Sheet
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#0F172A]">
          {/* Certificate Identification Banner */}
          <div className="border border-[#CBD5E1] bg-[#F8FAFC] p-4 rounded text-center space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
              Self-Study Report (SSR) Institutional Endorsement
            </span>
            <h3 className="text-sm font-bold text-[#0F172A]">
              {programTitle}
            </h3>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              This document certifies that the curriculum structure, credit hour calculations, and learning outcome competencies have been formally verified against ABET General Criteria 1–8.
            </p>
          </div>

          {/* Existing Signatures List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 border-b border-[#E2E8F0] pb-1.5">
              <span>Cryptographic Signatures & Endorsements ({signoffs.length})</span>
              <span className="text-[#059669] flex items-center gap-1 font-mono text-[11px]">
                <Lock className="w-3.5 h-3.5" /> Immutable Hash Audit Trail
              </span>
            </div>

            <div className="space-y-3">
              {signoffs.map((sig, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E2E8F0] rounded p-4 shadow-xs space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
                        <span>{sig.name}</span>
                        <span className="inline-flex items-center gap-1 text-[10px] bg-[#ECFDF5] text-[#059669] px-2 py-0.5 rounded border border-[#059669]/30">
                          <CheckCircle2 className="w-3 h-3" /> Certified
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium">{sig.title}</div>
                    </div>

                    <div className="text-left sm:text-right font-mono text-[11px] text-slate-400">
                      <div>{new Date(sig.timestamp).toLocaleDateString()} {new Date(sig.timestamp).toLocaleTimeString()}</div>
                      <div className="text-slate-500 font-semibold">{sig.role}</div>
                    </div>
                  </div>

                  {sig.comments && (
                    <p className="text-xs text-slate-700 italic bg-[#F8FAFC] p-2 rounded border border-slate-100">
                      "{sig.comments}"
                    </p>
                  )}

                  {sig.hashSignature && (
                    <div className="text-[10px] font-mono text-slate-400 truncate bg-slate-50 p-1.5 rounded border border-slate-200">
                      Signature Hash: {sig.hashSignature}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Endorsement Form: Sign as Academic Officer */}
          <form onSubmit={handleSign} className="border-t border-[#E2E8F0] pt-4 space-y-3 bg-[#F8FAFC] p-4 rounded border">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0F172A] uppercase tracking-wider">
              <PenTool className="w-4 h-4 text-[#4F46E5]" />
              <span>Record Additional Official Endorsement</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Signer Full Name & Credentials
                </label>
                <input
                  type="text"
                  required
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Institutional Role / Title
                </label>
                <input
                  type="text"
                  required
                  value={signerRole}
                  onChange={(e) => setSignerRole(e.target.value)}
                  className="w-full h-8 px-2.5 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Official Certification Remarks
              </label>
              <textarea
                rows={2}
                value={signerComment}
                onChange={(e) => setSignerComment(e.target.value)}
                className="w-full p-2 bg-white border border-[#CBD5E1] rounded text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#4F46E5]"
              />
            </div>

            <button
              type="submit"
              disabled={isSigning}
              className="h-8 px-4 bg-[#4F46E5] text-white text-xs font-semibold rounded hover:bg-[#4338CA] active:scale-[0.99] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSigning ? 'Appending Cryptographic Signature...' : 'Cryptographically Sign & Certify'}</span>
            </button>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FFFFFF] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
            <span>Meets Section 6.2 Institutional Audit Requirements</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="h-9 px-3.5 bg-white border border-[#CBD5E1] text-[#0F172A] text-xs font-semibold rounded hover:bg-[#F8FAFC] transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Certification</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 bg-[#0F172A] text-white text-xs font-semibold rounded hover:bg-slate-800 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
