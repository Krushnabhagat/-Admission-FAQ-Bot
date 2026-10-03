import React, { useState, useMemo } from 'react';
import { UserPersona, Language, StudentProfile, Category } from '../types/admission';
import { SCHOLARSHIPS_DATABASE, COLLEGES_DATABASE } from '../data/admissionData';
import { 
  Coins, 
  HelpCircle, 
  Calculator, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Building2, 
  Home, 
  GraduationCap,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';

interface ScholarshipCalculatorProps {
  persona: UserPersona;
  language: Language;
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onNavigateTab: (tab: string) => void;
}

export const ScholarshipCalculator: React.FC<ScholarshipCalculatorProps> = ({
  persona,
  language,
  profile,
  onUpdateProfile,
  onNavigateTab,
}) => {
  // Inputs
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('pict-pune');
  const [customTuitionFee, setCustomTuitionFee] = useState<number>(120000);
  const [customDevFee, setCustomDevFee] = useState<number>(20000);
  const [isHosteller, setIsHosteller] = useState<boolean>(true);
  const [hostelAnnualFee, setHostelAnnualFee] = useState<number>(55000);
  const [isGirlStudent, setIsGirlStudent] = useState<boolean>(false);

  // When college is selected from list
  const handleCollegeChange = (id: string) => {
    setSelectedCollegeId(id);
    const col = COLLEGES_DATABASE.find(c => c.id === id);
    if (col) {
      setCustomTuitionFee(col.annualTuitionFee);
      setCustomDevFee(col.developmentFee);
      setHostelAnnualFee(col.hostelFeeAnnual);
    }
  };

  // Financial Calculations
  const calculationResults = useMemo(() => {
    const grossTuitionPerYear = customTuitionFee;
    const grossDevFeePerYear = customDevFee;
    const annualCollegeTotal = grossTuitionPerYear + grossDevFeePerYear;
    const annualHostel = isHosteller ? hostelAnnualFee : 0;
    const grossAnnualExpense = annualCollegeTotal + annualHostel;
    const gross4YearTotal = grossAnnualExpense * 4;

    let annualTuitionWaiver = 0;
    let waiverSchemeName = 'No Tuition Waiver (Income > ₹8 Lakhs or Open without EBC)';
    let annualHostelScholarship = 0;
    let annualGirlGrant = 0;

    const income = profile.annualFamilyIncome;
    const cat = profile.category;

    // 1. TFWS (Tuition Fee Waiver Scheme)
    if (cat === 'TFWS') {
      annualTuitionWaiver = grossTuitionPerYear; // 100% tuition waiver
      waiverSchemeName = 'TFWS (100% Tuition Fee Exemption by AICTE & CET Cell)';
    }
    // 2. SC / ST 100% Scholarship
    else if (cat === 'SC' || cat === 'ST') {
      annualTuitionWaiver = grossTuitionPerYear + grossDevFeePerYear; // 100% total college fee
      waiverSchemeName = 'GoI Post-Matric Scholarship (100% Tuition + 100% Development Fee Waived)';
      if (isHosteller) {
        annualHostelScholarship = 36000; // Swadhar / Swayam allowance
      }
    }
    // 3. EBC (Open / EWS with income <= 8 Lakhs)
    else if ((cat === 'OPEN' || cat === 'EWS') && income <= 800000) {
      annualTuitionWaiver = Math.round(grossTuitionPerYear * 0.5); // 50% waiver
      waiverSchemeName = 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Yojna (50% EBC Waiver)';
    }
    // 4. OBC / VJNT / SBC with income <= 8 Lakhs
    else if ((cat === 'OBC' || cat === 'VJ/NT' || cat === 'SBC') && income <= 800000) {
      if (income <= 150000) {
        annualTuitionWaiver = grossTuitionPerYear; // 100% tuition waiver
        waiverSchemeName = 'OBC Post-Matric Scholarship (100% Tuition Waived for Income <= 1.5L)';
      } else {
        annualTuitionWaiver = Math.round(grossTuitionPerYear * 0.5); // 50% waiver
        waiverSchemeName = 'OBC / VJNT / SBC Freeship (50% Tuition Waived for Income <= 8L)';
      }
    }

    // Dr. Panjabrao Deshmukh Hostel Allowance (For students from rural/marginal families in hostellers)
    if (isHosteller && income <= 800000 && cat !== 'SC' && cat !== 'ST') {
      annualHostelScholarship = 30000; // Metro city allowance
    }

    // AICTE Pragati Scholarship for Girls
    if (isGirlStudent && income <= 800000) {
      annualGirlGrant = 50000;
    }

    const totalAnnualBenefits = annualTuitionWaiver + annualHostelScholarship + annualGirlGrant;
    const netAnnualExpense = Math.max(0, grossAnnualExpense - totalAnnualBenefits);
    const total4YearSavings = totalAnnualBenefits * 4;
    const net4YearOutPocket = Math.max(0, gross4YearTotal - total4YearSavings);
    const semesterInstallment = Math.round(netAnnualExpense / 2);

    return {
      grossAnnualExpense,
      gross4YearTotal,
      annualTuitionWaiver,
      waiverSchemeName,
      annualHostelScholarship,
      annualGirlGrant,
      totalAnnualBenefits,
      netAnnualExpense,
      total4YearSavings,
      net4YearOutPocket,
      semesterInstallment,
    };
  }, [customTuitionFee, customDevFee, isHosteller, hostelAnnualFee, isGirlStudent, profile]);

  return (
    <div className="space-y-6">
      {/* Header and Info */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" />
              Scholarship Finder & 4-Year Net Fee Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Calculate government tuition fee waivers (EBC 50%, TFWS 100%, SC/ST 100%), hostel allowances, and exact net payable amounts.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
            <span>Mahadbt + AICTE 2026 Guidelines</span>
          </div>
        </div>

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {/* Select Sample College */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Sample College Fee
            </label>
            <select
              value={selectedCollegeId}
              onChange={(e) => handleCollegeChange(e.target.value)}
              className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs font-semibold border border-slate-700 focus:outline-none cursor-pointer"
            >
              {COLLEGES_DATABASE.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.shortCode} (₹{(col.annualTuitionFee + col.developmentFee).toLocaleString()}/yr)
                </option>
              ))}
            </select>
          </div>

          {/* Annual Family Income */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Annual Family Income Slab
            </label>
            <select
              value={profile.annualFamilyIncome}
              onChange={(e) => onUpdateProfile({ annualFamilyIncome: parseInt(e.target.value, 10) })}
              className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs font-semibold border border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="150000">Below ₹1.5 Lakhs (Full Freeship)</option>
              <option value="400000">₹1.5L - ₹4.0 Lakhs (EBC & Hostel)</option>
              <option value="750000">₹4.0L - ₹8.0 Lakhs (EBC 50% Waiver)</option>
              <option value="1200000">Above ₹8.0 Lakhs (Standard Fee)</option>
            </select>
          </div>

          {/* Candidate Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Category for Fee Concession
            </label>
            <select
              value={profile.category}
              onChange={(e) => onUpdateProfile({ category: e.target.value as Category })}
              className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 text-xs font-semibold border border-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="OPEN">OPEN / General (EBC 50% if &lt; 8L)</option>
              <option value="OBC">OBC (50% to 100% Waiver)</option>
              <option value="EWS">EWS (50% EBC Waiver)</option>
              <option value="TFWS">TFWS (100% Free Tuition)</option>
              <option value="SC">SC (100% Total Fee Waived)</option>
              <option value="ST">ST (100% Total Fee Waived)</option>
              <option value="VJ/NT">VJ / NT (Freeship)</option>
              <option value="SBC">SBC</option>
            </select>
          </div>

          {/* Hosteller & Gender Toggle */}
          <div className="flex flex-col justify-between">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Additional Grant Criteria
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-200">
                <input
                  type="checkbox"
                  checked={isHosteller}
                  onChange={(e) => setIsHosteller(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-700 border-slate-600"
                />
                <span>Hosteller / PG Accommodation</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-200">
                <input
                  type="checkbox"
                  checked={isGirlStudent}
                  onChange={(e) => setIsGirlStudent(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-700 border-slate-600"
                />
                <span>Girl Candidate (AICTE Pragati ₹50k)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Result Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Gross Expense Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Standard College Fee (No Waiver)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">
              ₹{calculationResults.grossAnnualExpense.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">/ year</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            4-Year Total: <strong className="text-slate-200">₹{calculationResults.gross4YearTotal.toLocaleString()}</strong> (Tuition + Dev + Hostel)
          </p>
        </div>

        {/* Total Government Waiver Card */}
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Total Scholarship Concession
            </span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-300">
              - ₹{calculationResults.totalAnnualBenefits.toLocaleString()}
            </span>
            <span className="text-xs text-emerald-400">/ year</span>
          </div>
          <p className="text-xs text-emerald-200/90 mt-2 font-medium">
            4-Year Total Savings: <strong>₹{calculationResults.total4YearSavings.toLocaleString()}</strong>
          </p>
        </div>

        {/* Net Out-Of-Pocket Payable Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-tr from-indigo-950 to-blue-900/60 border border-indigo-700/60 shadow-xl">
          <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
            Net Out-Of-Pocket Payable
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              ₹{calculationResults.netAnnualExpense.toLocaleString()}
            </span>
            <span className="text-xs text-indigo-200">/ year</span>
          </div>
          <div className="mt-2 pt-2 border-t border-indigo-800/50 flex items-center justify-between text-xs text-indigo-200">
            <span>Per Semester: <strong>₹{calculationResults.semesterInstallment.toLocaleString()}</strong></span>
            <span>4-Yr Net: <strong>₹{calculationResults.net4YearOutPocket.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      {/* Breakdown Breakdown Details Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl">
        <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-400" />
          Annual Fee Concession Itemization
        </h4>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Fee / Scholarship Component</th>
                <th className="p-3">Statutory Scheme & Authority</th>
                <th className="p-3">Standard Cost</th>
                <th className="p-3">Waiver Applied</th>
                <th className="p-3">Net Payable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
              <tr>
                <td className="p-3 font-semibold text-white">Annual Tuition Fee</td>
                <td className="p-3 text-indigo-300">{calculationResults.waiverSchemeName}</td>
                <td className="p-3 text-slate-300">₹{customTuitionFee.toLocaleString()}</td>
                <td className="p-3 text-emerald-400 font-bold">- ₹{calculationResults.annualTuitionWaiver.toLocaleString()}</td>
                <td className="p-3 text-white font-extrabold">₹{Math.max(0, customTuitionFee - calculationResults.annualTuitionWaiver).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Development Fee</td>
                <td className="p-3 text-slate-400">Mandatory College Development (Waived only for SC/ST)</td>
                <td className="p-3 text-slate-300">₹{customDevFee.toLocaleString()}</td>
                <td className="p-3 text-emerald-400 font-bold">
                  {profile.category === 'SC' || profile.category === 'ST' ? `- ₹${customDevFee.toLocaleString()}` : '₹0'}
                </td>
                <td className="p-3 text-white font-extrabold">
                  {profile.category === 'SC' || profile.category === 'ST' ? '₹0' : `₹${customDevFee.toLocaleString()}`}
                </td>
              </tr>
              {isHosteller && (
                <tr>
                  <td className="p-3 font-semibold text-white">Hostel & Mess Charges</td>
                  <td className="p-3 text-amber-300">
                    {calculationResults.annualHostelScholarship > 0
                      ? 'Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta'
                      : 'Self Funded'}
                  </td>
                  <td className="p-3 text-slate-300">₹{hostelAnnualFee.toLocaleString()}</td>
                  <td className="p-3 text-emerald-400 font-bold">
                    {calculationResults.annualHostelScholarship > 0
                      ? `- ₹${calculationResults.annualHostelScholarship.toLocaleString()}`
                      : '₹0'}
                  </td>
                  <td className="p-3 text-white font-extrabold">
                    ₹{Math.max(0, hostelAnnualFee - calculationResults.annualHostelScholarship).toLocaleString()}
                  </td>
                </tr>
              )}
              {isGirlStudent && calculationResults.annualGirlGrant > 0 && (
                <tr className="bg-emerald-950/20">
                  <td className="p-3 font-semibold text-emerald-300">AICTE Pragati Scheme Grant</td>
                  <td className="p-3 text-emerald-300">Direct cash credit to girl student bank account</td>
                  <td className="p-3 text-slate-400">₹0</td>
                  <td className="p-3 text-emerald-400 font-bold">+ ₹50,000 / yr</td>
                  <td className="p-3 text-emerald-300 font-extrabold">Net Credit</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mahadbt Applicable Schemes Cards */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-400" />
          Eligible Maharashtra Government Scholarship Schemes
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCHOLARSHIPS_DATABASE.map((sch) => {
            const isEligible = sch.categories.includes(profile.category) && profile.annualFamilyIncome <= sch.maxIncomeLimit;

            return (
              <div
                key={sch.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isEligible
                    ? 'bg-slate-900 border-indigo-500/40 shadow-lg'
                    : 'bg-slate-900/50 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isEligible
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isEligible ? 'Eligible for You' : 'Income / Category Ineligible'}
                  </span>
                  <span className="text-[10px] text-slate-400">Income Limit: ₹{(sch.maxIncomeLimit / 100000)} LPA</span>
                </div>

                <h5 className="text-sm font-bold text-white mt-2">
                  {language === 'mr' ? sch.nameMr : sch.name}
                </h5>
                <p className="text-xs text-indigo-400 mt-0.5 font-medium">{sch.benefitSummary}</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{sch.eligibilityNotes}</p>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">Portal: Mahadbt / NSP</span>
                  <a
                    href={sch.officialPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-400 hover:text-white font-semibold"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
