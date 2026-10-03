import React, { useState } from 'react';
import { UserPersona, Language, ProblemSolution } from '../types/admission';
import { EMERGENCY_SOLUTIONS } from '../data/admissionData';
import { 
  AlertCircle, 
  HelpCircle, 
  PhoneCall, 
  CheckCircle, 
  CreditCard, 
  FileCheck, 
  FileX, 
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface ProblemSolverProps {
  persona: UserPersona;
  language: Language;
  onNavigateTab: (tab: string) => void;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = ({
  persona,
  language,
  onNavigateTab,
}) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>(EMERGENCY_SOLUTIONS[0].id);

  const activeProblem = EMERGENCY_SOLUTIONS.find(p => p.id === selectedProblemId) || EMERGENCY_SOLUTIONS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-blue-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-indigo-400" />;
      case 'FileX': return <FileX className="w-5 h-5 text-red-400" />;
      default: return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 rounded-2xl border border-red-800/40 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Admission Emergency Problem Solver & Helpline
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Step-by-step statutory dispute workflows for application rejection, fee transaction failure, Caste Validity delay, and Freeze vs. Betterment decision pitfalls.
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Troubleshooter Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Selectable Common Emergencies List */}
        <div className="lg:col-span-1 space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
            Common Admission Crises:
          </span>

          {EMERGENCY_SOLUTIONS.map((item) => {
            const isSelected = item.id === selectedProblemId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedProblemId(item.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500 shadow-lg ring-1 ring-indigo-500/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {getIcon(item.iconName)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.topic}
                    </span>
                    {item.urgency === 'high' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-rose-500/20 text-rose-300">
                        High Priority
                      </span>
                    )}
                  </div>
                  <h5 className={`text-xs font-bold mt-1 line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {language === 'mr' ? item.titleMr : item.title}
                  </h5>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Resolution Workflow */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                {activeProblem.topic}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Official Guideline Reference
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white mt-2">
              {language === 'mr' ? activeProblem.titleMr : activeProblem.title}
            </h4>

            <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <strong className="text-indigo-300">Cause Summary:</strong> {activeProblem.summary}
            </p>
          </div>

          {/* Action Steps */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              Immediate Official Action Steps to Resolve:
            </h5>

            <div className="space-y-3">
              {activeProblem.solutionSteps.map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {sIdx + 1}
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Helpline and Legal/DTE Regulatory Footnote */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{activeProblem.helpline}</span>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              {activeProblem.statutoryRuleRef}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
