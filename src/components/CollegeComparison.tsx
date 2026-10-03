import React, { useState } from 'react';
import { UserPersona, Language, StudentProfile, CollegeDetail } from '../types/admission';
import { COLLEGES_DATABASE } from '../data/admissionData';
import { 
  Building2, 
  ShieldCheck, 
  Coins, 
  MapPin, 
  Award, 
  Clock, 
  Bus, 
  Utensils, 
  Briefcase,
  Check,
  PhoneCall,
  SlidersHorizontal
} from 'lucide-react';

interface CollegeComparisonProps {
  persona: UserPersona;
  language: Language;
  profile: StudentProfile;
  onNavigateTab: (tab: string) => void;
}

export const CollegeComparison: React.FC<CollegeComparisonProps> = ({
  persona,
  language,
  profile,
  onNavigateTab,
}) => {
  const [college1Id, setCollege1Id] = useState<string>('coep-pune');
  const [college2Id, setCollege2Id] = useState<string>('vjti-mumbai');
  const [activeView, setActiveView] = useState<'both' | 'tech_placements' | 'safety_facilities'>(
    persona === 'parent' ? 'safety_facilities' : 'tech_placements'
  );

  const col1 = COLLEGES_DATABASE.find(c => c.id === college1Id) || COLLEGES_DATABASE[0];
  const col2 = COLLEGES_DATABASE.find(c => c.id === college2Id) || COLLEGES_DATABASE[1];

  return (
    <div className="space-y-6">
      {/* Header and Selectors */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Side-by-Side College & Branch Comparator
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Compare cutoffs, fees, hostel curfew, CCTV surveillance, food mess quality, and campus recruitment packages.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button
              onClick={() => setActiveView('tech_placements')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeView === 'tech_placements'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Student Tech & Cutoffs View
            </button>
            <button
              onClick={() => setActiveView('safety_facilities')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeView === 'safety_facilities'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Parent Safety & Hostel View
            </button>
          </div>
        </div>

        {/* College Selection Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="block text-xs font-semibold text-indigo-300 mb-1.5">
              College #1
            </label>
            <select
              value={college1Id}
              onChange={(e) => setCollege1Id(e.target.value)}
              className="w-full bg-slate-800 text-white text-xs font-bold rounded-xl px-3.5 py-3 border border-indigo-500/40 focus:outline-none cursor-pointer"
            >
              {COLLEGES_DATABASE.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
              College #2
            </label>
            <select
              value={college2Id}
              onChange={(e) => setCollege2Id(e.target.value)}
              className="w-full bg-slate-800 text-white text-xs font-bold rounded-xl px-3.5 py-3 border border-emerald-500/40 focus:outline-none cursor-pointer"
            >
              {COLLEGES_DATABASE.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.location})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { col: col1, tag: 'College #1', accent: 'border-indigo-500/40', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
          { col: col2, tag: 'College #2', accent: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
        ].map(({ col, tag, accent, badge }, idx) => (
          <div key={idx} className={`bg-slate-900 rounded-2xl border ${accent} p-5 sm:p-6 shadow-xl flex flex-col justify-between`}>
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge}`}>
                  {tag}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Estd: {col.established} • NAAC {col.naacGrade}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mt-1">
                {col.name}
              </h4>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {col.location} • {col.type}
              </p>

              {/* Financial Summary */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Annual College Fee:</span>
                  <span className="font-extrabold text-white">₹{(col.annualTuitionFee + col.developmentFee).toLocaleString()}/yr</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1.5">
                  <span className="text-slate-400">Annual Hostel & Mess Fee:</span>
                  <span className="font-extrabold text-amber-300">₹{col.hostelFeeAnnual.toLocaleString()}/yr</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1.5 pt-1.5 border-t border-slate-700/60">
                  <span className="font-bold text-indigo-300">Est. 4-Year Gross:</span>
                  <span className="font-extrabold text-white">
                    ₹{((col.annualTuitionFee + col.developmentFee + col.hostelFeeAnnual) * 4).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Placement & Tech Section */}
              {(activeView === 'tech_placements' || activeView === 'both') && (
                <div className="mt-5 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    Placement & Branches
                  </h5>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-semibold">Highest Package</span>
                      <strong className="text-emerald-400 text-xs mt-0.5 block">₹{col.placementSummary.highestLpa} LPA</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-semibold">Median Package</span>
                      <strong className="text-indigo-300 text-xs mt-0.5 block">₹{col.placementSummary.medianLpa} LPA</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block font-semibold">Placement Rate</span>
                      <strong className="text-white text-xs mt-0.5 block">{col.placementSummary.overallRate}%</strong>
                    </div>
                  </div>

                  {/* Cutoff list */}
                  <div className="space-y-1.5 mt-2">
                    <span className="text-[11px] font-semibold text-slate-400">Previous Category ({profile.category}) Cutoffs:</span>
                    {col.branches.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
                        <span className="text-slate-300 font-medium">{b.name}</span>
                        <span className="font-bold text-indigo-400">
                          {profile.category === 'OBC' ? b.obcCutoff : profile.category === 'SC' ? b.scCutoff : profile.category === 'TFWS' ? b.tfwsCutoff : b.openCutoff}%ile
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety & Hostel Section */}
              {(activeView === 'safety_facilities' || activeView === 'both') && (
                <div className="mt-5 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Hostel, Safety & Transport
                  </h5>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-slate-400 block font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        Hostel Curfew & Entry:
                      </span>
                      <p className="text-slate-200 mt-1">{col.hostelCurfew}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-slate-400 block font-semibold flex items-center gap-1">
                        <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                        Mess Hygiene & Security:
                      </span>
                      <p className="text-slate-200 mt-1">{col.hostelSecurity} (Mess Rating: {col.messQualityRating}/5 ⭐)</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <span className="text-slate-400 block font-semibold flex items-center gap-1">
                        <Bus className="w-3.5 h-3.5 text-blue-400" />
                        Bus & Commute Routes:
                      </span>
                      <ul className="text-slate-300 mt-1 list-disc list-inside space-y-0.5">
                        {col.transportBusRoutes.map((r, rIdx) => (
                          <li key={rIdx}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40">
                      <span className="text-rose-400 block font-semibold flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5" />
                        Anti-Ragging Helpline:
                      </span>
                      <p className="text-slate-300 mt-0.5 font-mono text-[11px]">{col.antiRaggingContact}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
