import React, { useState, useMemo } from 'react';
import { UserPersona, Language, StudentProfile, Category } from '../types/admission';
import { COLLEGES_DATABASE } from '../data/admissionData';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  TrendingUp, 
  Award, 
  Building2, 
  MapPin, 
  Coins, 
  Briefcase, 
  ArrowUpDown,
  Filter,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface EligibilityCalculatorProps {
  persona: UserPersona;
  language: Language;
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onNavigateTab: (tab: string) => void;
}

export const EligibilityCalculator: React.FC<EligibilityCalculatorProps> = ({
  persona,
  language,
  profile,
  onUpdateProfile,
  onNavigateTab,
}) => {
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>('All');
  const [selectedChanceFilter, setSelectedChanceFilter] = useState<'All' | 'Safe' | 'Moderate' | 'Ambitious'>('All');
  const [showCapStrategy, setShowCapStrategy] = useState<boolean>(true);

  // Check statutory 12th board eligibility
  const is12thEligible = useMemo(() => {
    const minRequired = profile.category === 'OPEN' ? 45 : 40;
    return profile.twelfthPercentage >= minRequired;
  }, [profile.twelfthPercentage, profile.category]);

  // Compute matched college branches based on candidate percentile and category
  const courseRecommendations = useMemo(() => {
    const list: Array<{
      collegeId: string;
      collegeName: string;
      shortCode: string;
      branch: string;
      location: string;
      cutoffPercentile: number;
      chances: 'Safe' | 'Moderate' | 'Ambitious';
      annualFee: number;
      netFeeEstimate: number;
      avgPackageLpa: number;
      highestPackageLpa: number;
      naacGrade: string;
      placementRate: number;
      capSuggestedRank: number;
    }> = [];

    const userScore = profile.entrancePercentile || 85;
    const isEbcEligible = profile.annualFamilyIncome <= 800000 && (profile.category === 'OPEN' || profile.category === 'EWS');
    const isTfws = profile.category === 'TFWS';
    const isScSt = profile.category === 'SC' || profile.category === 'ST';
    const isObc = profile.category === 'OBC' || profile.category === 'VJ/NT' || profile.category === 'SBC';

    COLLEGES_DATABASE.forEach((col) => {
      col.branches.forEach((b) => {
        // Find relevant cutoff according to candidate category
        let cutoff = b.openCutoff;
        if (profile.category === 'OBC') cutoff = b.obcCutoff;
        else if (profile.category === 'SC' || profile.category === 'ST') cutoff = b.scCutoff;
        else if (profile.category === 'TFWS') cutoff = b.tfwsCutoff;

        // Classify chance
        let chances: 'Safe' | 'Moderate' | 'Ambitious' = 'Moderate';
        const diff = userScore - cutoff;
        if (diff >= 0.5) chances = 'Safe';
        else if (diff >= -1.5) chances = 'Moderate';
        else chances = 'Ambitious';

        // Calculate approximate net fee
        let netFee = col.annualTuitionFee + col.developmentFee;
        if (isTfws) {
          netFee = col.developmentFee; // 100% tuition waived
        } else if (isScSt) {
          netFee = 1500; // 100% fee covered by government
        } else if (isEbcEligible || isObc) {
          netFee = Math.round(col.annualTuitionFee * 0.5 + col.developmentFee); // 50% tuition waiver
        }

        // Suggested CAP priority logic:
        // Rank 1-3: Ambitious / Dream Colleges
        // Rank 4-8: Moderate / Realistic Targets
        // Rank 9-12: Safe / Sure-Shot Guarantees
        let capSuggestedRank = 5;
        if (chances === 'Ambitious') capSuggestedRank = Math.floor(Math.random() * 3) + 1;
        else if (chances === 'Moderate') capSuggestedRank = Math.floor(Math.random() * 5) + 4;
        else capSuggestedRank = Math.floor(Math.random() * 4) + 9;

        list.push({
          collegeId: col.id,
          collegeName: col.name,
          shortCode: col.shortCode,
          branch: b.name,
          location: col.location,
          cutoffPercentile: cutoff,
          chances,
          annualFee: col.annualTuitionFee + col.developmentFee,
          netFeeEstimate: netFee,
          avgPackageLpa: b.avgLpa,
          highestPackageLpa: col.placementSummary.highestLpa,
          naacGrade: col.naacGrade,
          placementRate: col.placementSummary.overallRate,
          capSuggestedRank,
        });
      });
    });

    return list.sort((a, b) => b.cutoffPercentile - a.cutoffPercentile);
  }, [profile]);

  // Filtered by branch & chance
  const filteredList = useMemo(() => {
    return courseRecommendations.filter((item) => {
      const matchBranch = selectedBranchFilter === 'All' || item.branch.toLowerCase().includes(selectedBranchFilter.toLowerCase());
      const matchChance = selectedChanceFilter === 'All' || item.chances === selectedChanceFilter;
      return matchBranch && matchChance;
    });
  }, [courseRecommendations, selectedBranchFilter, selectedChanceFilter]);

  // CAP Option Form Blueprint (Recommended 10 Choices)
  const capOptionBlueprint = useMemo(() => {
    const ambitious = courseRecommendations.filter(c => c.chances === 'Ambitious').slice(0, 3);
    const moderate = courseRecommendations.filter(c => c.chances === 'Moderate').slice(0, 4);
    const safe = courseRecommendations.filter(c => c.chances === 'Safe').slice(0, 3);
    return [...ambitious, ...moderate, ...safe];
  }, [courseRecommendations]);

  return (
    <div className="space-y-6">
      {/* Input & Candidate Details Bar */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              Smart Course & Eligibility Matcher
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Adjust your marks and category to calculate real-time admission probability, cutoff distance, and CAP option arrangement.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Candidate Score</span>
              <p className="text-sm font-extrabold text-indigo-400">
                {profile.entranceExam} {profile.entrancePercentile}%ile
              </p>
            </div>
            <div className="h-7 w-px bg-slate-700" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">12th PCM</span>
              <p className="text-sm font-extrabold text-emerald-400">
                {profile.twelfthPercentage}%
              </p>
            </div>
            <div className="h-7 w-px bg-slate-700" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Category</span>
              <p className="text-sm font-extrabold text-amber-400">
                {profile.category}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          {/* 12th Board Marks */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              12th Board Aggregate PCM (%)
            </label>
            <input
              type="number"
              min="35"
              max="100"
              step="0.5"
              value={profile.twelfthPercentage}
              onChange={(e) => onUpdateProfile({ twelfthPercentage: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs font-semibold border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Entrance Percentile */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {profile.entranceExam} Percentile
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={profile.entrancePercentile}
              onChange={(e) => onUpdateProfile({ entrancePercentile: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs font-semibold border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Candidate Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Seat Reservation Category
            </label>
            <select
              value={profile.category}
              onChange={(e) => onUpdateProfile({ category: e.target.value as Category })}
              className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs font-semibold border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="OPEN">OPEN / General</option>
              <option value="OBC">OBC (Non-Creamy Layer)</option>
              <option value="EWS">EWS (10% Quota)</option>
              <option value="TFWS">TFWS (100% Tuition Waiver)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="VJ/NT">VJ / NT</option>
              <option value="SBC">SBC</option>
            </select>
          </div>

          {/* Annual Family Income */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Annual Family Income (INR)
            </label>
            <select
              value={profile.annualFamilyIncome}
              onChange={(e) => onUpdateProfile({ annualFamilyIncome: parseInt(e.target.value, 10) })}
              className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs font-semibold border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="150000">Less than ₹1.5 Lakhs (100% Waiver)</option>
              <option value="400000">₹1.5L - ₹4.0 Lakhs (EBC & Panjabrao)</option>
              <option value="750000">₹4.0L - ₹8.0 Lakhs (EBC 50% Waiver)</option>
              <option value="1200000">Above ₹8.0 Lakhs (Standard Fee)</option>
            </select>
          </div>
        </div>

        {/* Statutory Eligibility Status Banner */}
        <div className={`mt-5 p-4 rounded-xl border flex items-center justify-between gap-3 ${
          is12thEligible 
            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200' 
            : 'bg-red-950/40 border-red-800/60 text-red-200'
        }`}>
          <div className="flex items-center gap-3">
            {is12thEligible ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <div>
              <p className="text-xs sm:text-sm font-bold">
                {is12thEligible 
                  ? `Statutory Eligibility Passed for Engineering Admissions (${profile.category})`
                  : `Statutory 12th Board PCM Criteria Not Met (${profile.category})`}
              </p>
              <p className="text-[11px] opacity-80 mt-0.5">
                {is12thEligible
                  ? `Candidate has ${profile.twelfthPercentage}% PCM (Rule requirement: Minimum ${profile.category === 'OPEN' ? '45%' : '40%'} aggregate in Physics + Mathematics + Chemistry/Vocational).`
                  : `Under DTE regulations, ${profile.category} candidates must have at least ${profile.category === 'OPEN' ? '45%' : '40%'} aggregate in PCM. Consider diploma direct second year or improvement examination.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested CAP Option Filling Strategy Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl border border-indigo-800/50 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Personalized CAP Option Form Strategy (Rule of 300 Choices)
              </h4>
              <p className="text-xs text-slate-400">
                To prevent accidental seat loss or unallotted status in CAP Round 1, balance your preferences:
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCapStrategy(!showCapStrategy)}
            className="text-xs font-semibold text-indigo-300 hover:text-white px-3 py-1.5 rounded-lg bg-indigo-950/70 border border-indigo-800"
          >
            {showCapStrategy ? 'Collapse Blueprint' : 'Show 10-Choice Blueprint'}
          </button>
        </div>

        {showCapStrategy && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40">
                <div className="flex items-center justify-between text-xs font-bold text-rose-400 mb-1">
                  <span>Preferences 1 to 3</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-950 text-[10px]">Dream / Ambitious</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Put elite colleges (COEP, VJTI, SPIT) where cutoff is 1-2% higher. You lose nothing if not allotted.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
                  <span>Preferences 4 to 7</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-950 text-[10px]">Realistic / Target</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Colleges where your percentile is within +/- 0.5 of previous round cutoffs (e.g. PICT, VIT, Walchand).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-1">
                  <span>Preferences 8 to 12+</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-[10px]">Safe / Backups</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Guaranteed allotment backups where your score is safely 1.5% above cutoff. Ensures seat security for Betterment.
                </p>
              </div>
            </div>

            {/* Generated Top 5 Blueprint Table */}
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Suggested CAP Preference</th>
                    <th className="p-2.5">College & Location</th>
                    <th className="p-2.5">Branch</th>
                    <th className="p-2.5">Category Cutoff</th>
                    <th className="p-2.5">Your Probability</th>
                    <th className="p-2.5">Avg Package</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                  {capOptionBlueprint.slice(0, 6).map((opt, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-2.5 font-bold text-indigo-400">Choice #{i + 1}</td>
                      <td className="p-2.5 font-medium text-white">{opt.shortCode}</td>
                      <td className="p-2.5 text-slate-300">{opt.branch}</td>
                      <td className="p-2.5 font-bold text-slate-200">{opt.cutoffPercentile}%ile</td>
                      <td className="p-2.5">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          opt.chances === 'Safe' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : opt.chances === 'Moderate'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {opt.chances}
                        </span>
                      </td>
                      <td className="p-2.5 text-emerald-400 font-semibold">₹{opt.avgPackageLpa} LPA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Filter and College Matches Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Matched Colleges & Branch Cutoffs ({filteredList.length} Options)
          </h3>
          <p className="text-xs text-slate-400">
            Comparing against Maharashtra State CAP Round Previous Cutoffs for category: <span className="text-indigo-300 font-bold">{profile.category}</span>
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Branch Filter */}
          <select
            value={selectedBranchFilter}
            onChange={(e) => setSelectedBranchFilter(e.target.value)}
            className="bg-slate-800 text-xs font-medium text-slate-200 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All">All Engineering Branches</option>
            <option value="Computer">Computer Engineering</option>
            <option value="Intelligence">AI & Data Science</option>
            <option value="Information">Information Technology</option>
            <option value="Electronics">Electronics & Telecomm</option>
            <option value="Mechanical">Mechanical Engineering</option>
          </select>

          {/* Chance Filter */}
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
            {(['All', 'Safe', 'Moderate', 'Ambitious'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedChanceFilter(filter)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  selectedChanceFilter === filter
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Matched College Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all p-5 flex flex-col justify-between shadow-lg group hover:shadow-indigo-500/10"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                  item.chances === 'Safe'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : item.chances === 'Moderate'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {item.chances === 'Safe' ? '🟢 Safe Chance' : item.chances === 'Moderate' ? '🟡 Moderate Target' : '🔴 Ambitious Stretch'}
                </span>

                <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700">
                  NAAC {item.naacGrade}
                </span>
              </div>

              {/* Title & Branch */}
              <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {item.shortCode}
              </h4>
              <p className="text-xs font-semibold text-indigo-400 mt-0.5">
                {item.branch}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{item.location}</span>
              </div>

              {/* Cutoff & Comparison Box */}
              <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{profile.category} Previous Cutoff:</span>
                  <span className="font-extrabold text-white">{item.cutoffPercentile}%ile</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1.5">
                  <span className="text-slate-400">Your Score Margin:</span>
                  <span className={`font-bold ${
                    profile.entrancePercentile >= item.cutoffPercentile
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}>
                    {profile.entrancePercentile >= item.cutoffPercentile ? '+' : ''}
                    {(profile.entrancePercentile - item.cutoffPercentile).toFixed(2)} %ile
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Avg Package</span>
                  <p className="text-xs font-extrabold text-emerald-400 mt-0.5">₹{item.avgPackageLpa} LPA</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Placement Rate</span>
                  <p className="text-xs font-extrabold text-indigo-300 mt-0.5">{item.placementRate}% Placed</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Net Fee */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Est. Yearly Fee ({profile.category})</span>
                <span className="text-xs font-extrabold text-white">
                  ₹{item.netFeeEstimate.toLocaleString()}
                  {item.netFeeEstimate < item.annualFee && (
                    <span className="text-[10px] font-normal text-emerald-400 ml-1">(Waiver applied)</span>
                  )}
                </span>
              </div>

              <button
                onClick={() => onNavigateTab('scholarships')}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Calculate 4-Year scholarship fee"
              >
                <span>Fee Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
