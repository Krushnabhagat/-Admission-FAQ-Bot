/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserPersona, Language, StudentProfile, Category } from './types/admission';
import { Header } from './components/Header';
import { PersonaBanner } from './components/PersonaBanner';
import { ChatCopilot } from './components/ChatCopilot';
import { EligibilityCalculator } from './components/EligibilityCalculator';
import { DocumentChecker } from './components/DocumentChecker';
import { ScholarshipCalculator } from './components/ScholarshipCalculator';
import { CollegeComparison } from './components/CollegeComparison';
import { DeadlineTracker } from './components/DeadlineTracker';
import { ProblemSolver } from './components/ProblemSolver';
import { VoiceInputModal } from './components/VoiceInputModal';
import { X, Check, SlidersHorizontal, GraduationCap, ShieldCheck } from 'lucide-react';

export default function App() {
  const [persona, setPersona] = useState<UserPersona>('student');
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('chat');

  // Candidate Profile State (Default based on user prompt: 72% in 12th + CS aspiration)
  const [profile, setProfile] = useState<StudentProfile>({
    name: 'Candidate',
    twelfthPercentage: 72.0,
    entranceExam: 'MHT-CET',
    entrancePercentile: 88.5,
    category: 'OBC',
    annualFamilyIncome: 450000,
    preferredBranch: 'Computer Engineering',
    preferredCity: 'Pune / Mumbai',
    hostelNeeded: true,
    gender: 'all',
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleVoiceSubmit = (transcript: string) => {
    setActiveTab('chat');
    // Dispatch query to copilot by triggering message input
    setTimeout(() => {
      const chatInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (chatInput) {
        chatInput.value = transcript;
        const form = chatInput.closest('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header with Persona & Language Controls */}
      <Header
        persona={persona}
        onPersonaChange={setPersona}
        language={language}
        onLanguageChange={setLanguage}
        profile={profile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dual Persona Context Banner */}
        <PersonaBanner
          persona={persona}
          language={language}
          profile={profile}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onSelectAction={(tab) => setActiveTab(tab)}
        />

        {/* Tab Modules */}
        {activeTab === 'chat' && (
          <ChatCopilot
            persona={persona}
            language={language}
            profile={profile}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'recommend' && (
          <EligibilityCalculator
            persona={persona}
            language={language}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentChecker
            persona={persona}
            language={language}
            profile={profile}
            onUpdateCategory={(cat) => handleUpdateProfile({ category: cat })}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'scholarships' && (
          <ScholarshipCalculator
            persona={persona}
            language={language}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'compare' && (
          <CollegeComparison
            persona={persona}
            language={language}
            profile={profile}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'deadlines' && (
          <DeadlineTracker
            persona={persona}
            language={language}
          />
        )}

        {activeTab === 'problems' && (
          <ProblemSolver
            persona={persona}
            language={language}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-800/80 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">EduGuide AI</span>
            <span>— Directorate of Technical Education & CET Smart Copilot</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>MHT-CET / JEE Main 2026</span>
            <span>•</span>
            <span>Mahadbt Scholarship Calculator</span>
            <span>•</span>
            <span>Maharashtra State Quota</span>
          </div>
        </div>
      </footer>

      {/* Candidate Profile Quick Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Candidate Profile & Marksheet Details
                </h3>
                <p className="text-xs text-slate-400">
                  Customizes cutoffs, eligibility checks, and scholarship fee waivers across all tabs.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">12th Board PCM (%)</label>
                  <input
                    type="number"
                    min="35"
                    max="100"
                    step="0.1"
                    value={profile.twelfthPercentage}
                    onChange={(e) => handleUpdateProfile({ twelfthPercentage: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Entrance Percentile</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={profile.entrancePercentile}
                    onChange={(e) => handleUpdateProfile({ entrancePercentile: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Candidature Category</label>
                  <select
                    value={profile.category}
                    onChange={(e) => handleUpdateProfile({ category: e.target.value as Category })}
                    className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="OPEN">OPEN / General</option>
                    <option value="OBC">OBC</option>
                    <option value="EWS">EWS (10% Quota)</option>
                    <option value="TFWS">TFWS (100% Free Tuition)</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="VJ/NT">VJ / NT</option>
                    <option value="SBC">SBC</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Annual Family Income</label>
                  <select
                    value={profile.annualFamilyIncome}
                    onChange={(e) => handleUpdateProfile({ annualFamilyIncome: parseInt(e.target.value, 10) })}
                    className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="150000">Below ₹1.5 Lakhs (100% Waiver)</option>
                    <option value="400000">₹1.5L - ₹4.0 Lakhs (EBC & Hostel)</option>
                    <option value="750000">₹4.0L - ₹8.0 Lakhs (EBC 50% Waiver)</option>
                    <option value="1200000">Above ₹8.0 Lakhs (Standard Fee)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Preferred Engineering Branch</label>
                <select
                  value={profile.preferredBranch}
                  onChange={(e) => handleUpdateProfile({ preferredBranch: e.target.value })}
                  className="w-full bg-slate-800 text-white rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="Computer Engineering">Computer Engineering / Computer Science</option>
                  <option value="Artificial Intelligence & Data Science">AI & Data Science (AI&DS)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Electronics & Telecommunication">Electronics & Telecommunication (E&TC)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 font-medium">
                  <input
                    type="checkbox"
                    checked={profile.hostelNeeded}
                    onChange={(e) => handleUpdateProfile({ hostelNeeded: e.target.checked })}
                    className="rounded text-indigo-600 bg-slate-800 border-slate-700"
                  />
                  <span>Hostel / Dormitory Needed</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
              >
                Apply & Save Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
        onVoiceSubmit={handleVoiceSubmit}
      />
    </div>
  );
}
