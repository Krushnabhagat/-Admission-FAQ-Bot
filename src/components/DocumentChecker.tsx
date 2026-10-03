import React, { useState, useMemo } from 'react';
import { UserPersona, Language, StudentProfile, Category, DocumentItem } from '../types/admission';
import { MANDATORY_DOCUMENTS } from '../data/admissionData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Printer, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  CheckSquare,
  Square
} from 'lucide-react';

interface DocumentCheckerProps {
  persona: UserPersona;
  language: Language;
  profile: StudentProfile;
  onUpdateCategory: (cat: Category) => void;
  onNavigateTab: (tab: string) => void;
}

export const DocumentChecker: React.FC<DocumentCheckerProps> = ({
  persona,
  language,
  profile,
  onUpdateCategory,
  onNavigateTab,
}) => {
  // Store statuses for each doc: 'ready' | 'pending' | 'missing'
  const [docStatuses, setDocStatuses] = useState<Record<string, 'ready' | 'pending' | 'missing'>>({
    'ssc-marksheet': 'ready',
    'hsc-marksheet': 'ready',
    'entrance-scorecard': 'ready',
    'domicile-certificate': 'ready',
    'aadhaar-npci': 'ready',
  });

  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);
  const [hasGapYear, setHasGapYear] = useState<boolean>(false);

  // Filter documents applicable to candidate's category + gap status
  const applicableDocuments = useMemo(() => {
    return MANDATORY_DOCUMENTS.filter((doc) => {
      if (doc.id === 'gap-certificate' && !hasGapYear) return false;
      return doc.categoryApplicable.includes(profile.category);
    });
  }, [profile.category, hasGapYear]);

  // Compute readiness percentage
  const readinessMetrics = useMemo(() => {
    let readyCount = 0;
    let pendingCount = 0;
    let missingCount = 0;

    applicableDocuments.forEach((doc) => {
      const status = docStatuses[doc.id] || 'missing';
      if (status === 'ready') readyCount++;
      else if (status === 'pending') pendingCount++;
      else missingCount++;
    });

    const total = applicableDocuments.length || 1;
    const score = Math.round(((readyCount + pendingCount * 0.5) / total) * 100);

    return { readyCount, pendingCount, missingCount, total, score };
  }, [applicableDocuments, docStatuses]);

  const handleStatusChange = (id: string, newStatus: 'ready' | 'pending' | 'missing') => {
    setDocStatuses((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header and Readiness Dashboard */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-white">
                Personalized Document Verification Checker
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Categorized for <strong className="text-indigo-400">{profile.category}</strong> candidature. Prevent Scrutiny Center rejections with strict validity tracking.
            </p>
          </div>

          {/* Category Switcher & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-slate-800/90 rounded-xl px-3 py-1.5 border border-slate-700">
              <span className="text-xs text-slate-400 font-medium">Category:</span>
              <select
                value={profile.category}
                onChange={(e) => onUpdateCategory(e.target.value as Category)}
                className="bg-transparent text-xs font-bold text-indigo-300 focus:outline-none cursor-pointer"
              >
                <option value="OPEN" className="bg-slate-900">OPEN / General</option>
                <option value="OBC" className="bg-slate-900">OBC</option>
                <option value="EWS" className="bg-slate-900">EWS</option>
                <option value="TFWS" className="bg-slate-900">TFWS</option>
                <option value="SC" className="bg-slate-900">SC</option>
                <option value="ST" className="bg-slate-900">ST</option>
                <option value="VJ/NT" className="bg-slate-900">VJ / NT</option>
                <option value="SBC" className="bg-slate-900">SBC</option>
              </select>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Checklist Docket</span>
            </button>
          </div>
        </div>

        {/* Readiness Meter & Gap Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {/* Readiness Score Card */}
          <div className="md:col-span-2 p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">
                CAP Scrutiny Verification Readiness Score
              </span>
              <span className="text-sm font-extrabold text-indigo-400">
                {readinessMetrics.score}% Prepared
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  readinessMetrics.score >= 80 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                    : readinessMetrics.score >= 50 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400' 
                    : 'bg-gradient-to-r from-rose-500 to-orange-400'
                }`}
                style={{ width: `${readinessMetrics.score}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-700/40">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> {readinessMetrics.readyCount} Originals Ready
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <Clock className="w-3.5 h-3.5" /> {readinessMetrics.pendingCount} Receipt / In Progress
              </span>
              <span className="flex items-center gap-1 text-rose-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" /> {readinessMetrics.missingCount} Missing / Urgent
              </span>
            </div>
          </div>

          {/* Gap Year Checkbox Card */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200">
                Break / Gap Year After 12th?
              </span>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                If you dropped 1 year for JEE/CET or medical reason, a notarized Gap Certificate on ₹100 stamp paper is mandatory.
              </p>
            </div>

            <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasGapYear}
                onChange={(e) => setHasGapYear(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-700 border-slate-600"
              />
              <span className="text-xs font-bold text-indigo-300">
                Yes, I have an academic gap year
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Critical Statutory Alerts for Reserved / Waiver Candidates */}
      {(profile.category === 'OBC' || profile.category === 'VJ/NT' || profile.category === 'SBC') && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="font-bold text-amber-300">Crucial Non-Creamy Layer (NCL) Validity Rule:</strong>
            <p className="mt-0.5">
              Your NCL Certificate must clearly mention that it is <strong>valid up to March 31, 2027</strong>. NCL certificates mentioning validity till March 31, 2026 will be REJECTED at the scrutiny center, converting your candidature to General/OPEN.
            </p>
          </div>
        </div>
      )}

      {(profile.category === 'OBC' || profile.category === 'SC' || profile.category === 'ST' || profile.category === 'VJ/NT') && (
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-indigo-200 flex items-start gap-3">
          <FileText className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="font-bold text-indigo-300">Caste Validity Application Receipt Grace Period:</strong>
            <p className="mt-0.5">
              If your original Caste Validity is still pending at the Scrutiny Committee, upload the official <strong>acknowledgment receipt + Proforma H undertaking</strong> at registration. However, you MUST produce the original validity before reporting in CAP Round 3!
            </p>
          </div>
        </div>
      )}

      {/* Interactive Document Checklist Items */}
      <div className="space-y-3">
        {applicableDocuments.map((doc, idx) => {
          const status = docStatuses[doc.id] || 'missing';
          const isExpanded = expandedDocId === doc.id;

          return (
            <div
              key={doc.id}
              className={`rounded-2xl border transition-all ${
                status === 'ready'
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : status === 'pending'
                  ? 'bg-amber-950/15 border-amber-800/40'
                  : 'bg-rose-950/15 border-rose-800/40'
              }`}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5 flex-1">
                  <div className="mt-1">
                    {status === 'ready' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : status === 'pending' ? (
                      <Clock className="w-5 h-5 text-amber-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>
                      <h4 className="text-sm font-bold text-white">
                        {language === 'mr' ? doc.nameMr : doc.name}
                      </h4>
                      {doc.isMandatory ? (
                        <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Mandatory
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          Conditional
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-slate-400">
                        • Needed at: {doc.stageNeeded}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>

                {/* Status Toggle Radio Group */}
                <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(doc.id, 'ready')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      status === 'ready'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Original Ready
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(doc.id, 'pending')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      status === 'pending'
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Applied / Receipt
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(doc.id, 'missing')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      status === 'missing'
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Missing
                  </button>
                </div>
              </div>

              {/* Expansion Detail Bar */}
              <div className="px-4 pb-3 sm:px-5 flex items-center justify-between border-t border-slate-800/60 pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Hide Authority & Validity Details' : 'View Validity & Alternative If Missing'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {isExpanded && (
                <div className="p-4 sm:p-5 bg-slate-950/70 border-t border-slate-800 space-y-2 text-xs rounded-b-2xl">
                  <div>
                    <strong className="text-slate-300">Competent Issuing Authority:</strong>
                    <p className="text-slate-400 mt-0.5">{doc.issuingAuthority}</p>
                  </div>
                  <div>
                    <strong className="text-slate-300">Statutory Validity Requirement:</strong>
                    <p className="text-slate-400 mt-0.5">{doc.validityRequirement}</p>
                  </div>
                  <div>
                    <strong className="text-slate-300">Accepted Alternative if Missing:</strong>
                    <p className="text-emerald-400 mt-0.5">{doc.alternativeIfMissing}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
