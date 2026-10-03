import React from 'react';
import { UserPersona, Language, StudentProfile } from '../types/admission';
import { 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Coins, 
  Laptop, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';

interface PersonaBannerProps {
  persona: UserPersona;
  language: Language;
  profile: StudentProfile;
  onOpenProfile: () => void;
  onSelectAction: (tab: string) => void;
}

export const PersonaBanner: React.FC<PersonaBannerProps> = ({
  persona,
  language,
  profile,
  onOpenProfile,
  onSelectAction,
}) => {
  if (persona === 'student') {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 border border-indigo-800/40 p-5 sm:p-6 mb-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-800">
                  Student Copilot Active
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5 text-indigo-400" />
                  Engineering & Tech Specializations
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                Optimized for Cutoffs, Option Strategy & High-Growth Tech Branches
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Matched for your candidate score: <strong className="text-indigo-300">{profile.entranceExam} {profile.entrancePercentile}%ile</strong> | Category: <strong className="text-indigo-300">{profile.category}</strong> | 12th PCM: <strong className="text-indigo-300">{profile.twelfthPercentage}%</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onSelectAction('recommend')}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <span>Predict My Colleges</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenProfile}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all"
            >
              <span>Update Marks</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Parent Persona Banner
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-emerald-950/80 border border-amber-800/40 p-5 sm:p-6 mb-6 shadow-xl">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-400 shrink-0">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
                Parent Advisory Mode Active
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Safety, Hostel & Financials
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              Transparent 4-Year College Expenses, Government Fee Waivers & Security
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Find how EBC (50% waiver), TFWS (100% waiver), and Panjabrao Deshmukh Hostel allowance (₹30,000/yr) can reduce your family out-of-pocket expenses while ensuring strict campus safety and warden surveillance.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => onSelectAction('scholarships')}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30 transition-all"
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Calculate Net 4-Yr Cost</span>
          </button>
          <button
            onClick={() => onSelectAction('compare')}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all"
          >
            <span>Hostel & Safety Compare</span>
          </button>
        </div>
      </div>
    </div>
  );
};
