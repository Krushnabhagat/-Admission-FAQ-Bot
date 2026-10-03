import React from 'react';
import { UserPersona, Language, StudentProfile } from '../types/admission';
import { 
  GraduationCap, 
  Users, 
  Languages, 
  Sparkles, 
  SlidersHorizontal,
  Mic,
  ShieldCheck,
  Award
} from 'lucide-react';

interface HeaderProps {
  persona: UserPersona;
  onPersonaChange: (p: UserPersona) => void;
  language: Language;
  onLanguageChange: (l: Language) => void;
  profile: StudentProfile;
  onOpenProfileModal: () => void;
  onOpenVoiceModal: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  persona,
  onPersonaChange,
  language,
  onLanguageChange,
  profile,
  onOpenProfileModal,
  onOpenVoiceModal,
  activeTab,
  onTabChange,
}) => {
  const t = {
    en: {
      appName: 'EduGuide AI',
      badge: 'DTE & CET Copilot 2026',
      studentMode: 'Student Mode',
      parentMode: 'Parent Mode',
      studentSub: 'Cutoffs & Tech',
      parentSub: 'Fees & Safety',
      editProfile: 'Profile & Marks',
      voiceAsk: 'Voice Query',
      tabs: {
        chat: 'AI Copilot',
        recommend: 'Course & Eligibility',
        documents: 'Document Checker',
        scholarships: 'Scholarship Finder',
        compare: 'College Comparator',
        deadlines: 'CAP Schedule',
        problems: 'Emergency Solver',
      },
    },
    hi: {
      appName: 'EduGuide AI',
      badge: 'सीईटी एवं प्रवेश गाइड २०२६',
      studentMode: 'छात्र मोड',
      parentMode: 'अभिभावक मोड',
      studentSub: 'कटऑफ एवं कोडिंग',
      parentSub: 'फीस एवं सुरक्षा',
      editProfile: 'प्रोफाइल एवं अंक',
      voiceAsk: 'आवाज से पूछें',
      tabs: {
        chat: 'एआई कोपायलट',
        recommend: 'कोर्स एवं पात्रता',
        documents: 'दस्तावेज चेकर',
        scholarships: 'छात्रवृत्ति कैलकुलेटर',
        compare: 'कॉलेज तुलना',
        deadlines: 'कैप शेड्यूल',
        problems: 'समस्या समाधान',
      },
    },
    mr: {
      appName: 'EduGuide AI',
      badge: 'डीटीई व सीईटी मार्गदर्शक २०२६',
      studentMode: 'विद्यार्थी मोड',
      parentMode: 'पालक मोड',
      studentSub: 'कटऑफ व करिअर',
      parentSub: 'फीस, वसतिगृह व सुरक्षा',
      editProfile: 'गुण व प्रवर्ग',
      voiceAsk: 'व्हॉइस प्रश्न',
      tabs: {
        chat: 'एआय कोपायलट',
        recommend: 'पात्रता व कॉलेज',
        documents: 'कागदपत्रे तपासणी',
        scholarships: 'शिष्यवृत्ती शोधक',
        compare: 'कॉलेज तुलना',
        deadlines: 'कॅप वेळापत्रक',
        problems: 'अडचण निवारण',
      },
    },
  }[language];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/30">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight font-['Outfit'] bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {persona === 'student' ? 'Smart Course, Cutoffs, Documents & Option Form Assistant' : 'Transparent 4-Yr Fees, Waivers, Hostel Security & Deadlines'}
              </p>
            </div>
          </div>

          {/* Right Action Controls: Persona Switcher, Language, Profile Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Persona Switcher Pill */}
            <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 flex items-center">
              <button
                type="button"
                onClick={() => onPersonaChange('student')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  persona === 'student'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{t.studentMode}</span>
              </button>
              <button
                type="button"
                onClick={() => onPersonaChange('parent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  persona === 'parent'
                    ? 'bg-gradient-to-r from-amber-600 to-emerald-600 text-white shadow-md shadow-amber-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{t.parentMode}</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-800/90 rounded-xl border border-slate-700/80 px-2 py-1">
              <Languages className="w-4 h-4 text-slate-400 mr-1.5" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer pr-1"
                aria-label="Select Language"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
                <option value="mr" className="bg-slate-900 text-white">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Voice Input Quick Trigger */}
            <button
              type="button"
              onClick={onOpenVoiceModal}
              className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title={t.voiceAsk}
            >
              <Mic className="w-4 h-4" />
              <span className="hidden md:inline">{t.voiceAsk}</span>
            </button>

            {/* Profile Quick Pill */}
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-all text-xs font-medium group"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-45 transition-transform" />
              <div className="hidden lg:flex items-center gap-1.5 text-[11px]">
                <span className="font-bold text-indigo-400">{profile.entrancePercentile || 85}%ile</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">{profile.category}</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400">12th: {profile.twelfthPercentage}%</span>
              </div>
              <span className="lg:hidden">{t.editProfile}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-800/80">
          {[
            { id: 'chat', label: t.tabs.chat, icon: Sparkles },
            { id: 'recommend', label: t.tabs.recommend, icon: Award },
            { id: 'documents', label: t.tabs.documents, icon: ShieldCheck },
            { id: 'scholarships', label: t.tabs.scholarships, icon: Users },
            { id: 'compare', label: t.tabs.compare, icon: SlidersHorizontal },
            { id: 'deadlines', label: t.tabs.deadlines, icon: GraduationCap },
            { id: 'problems', label: t.tabs.problems, icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-1 ring-indigo-400/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
