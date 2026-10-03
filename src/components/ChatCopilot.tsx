import React, { useState, useRef, useEffect } from 'react';
import { UserPersona, Language, StudentProfile, ChatMessage } from '../types/admission';
import { 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  RefreshCw, 
  User, 
  Bot, 
  CornerDownLeft,
  GraduationCap,
  Users,
  Lightbulb,
  Mic
} from 'lucide-react';

interface ChatCopilotProps {
  persona: UserPersona;
  language: Language;
  profile: StudentProfile;
  onOpenVoiceModal: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ChatCopilot: React.FC<ChatCopilotProps> = ({
  persona,
  language,
  profile,
  onOpenVoiceModal,
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init-1',
      sender: 'assistant',
      text: persona === 'parent'
        ? `Namaste! I am your **EduGuide Parent Copilot**. I specialize in transparent 4-year fee breakdowns, government fee waivers (EBC 50%, TFWS 100%), hostel security, mess hygiene, and critical admission deadlines. How can I help you plan your child's higher education today?`
        : `Hey there! I am your **EduGuide AI Admission Copilot**. Based on your profile (${profile.entranceExam}: **${profile.entrancePercentile}%ile**, 12th PCM: **${profile.twelfthPercentage}%**, Category: **${profile.category}**), I can guide you through eligibility, college cutoffs, CAP option form ranking, document verification, and scholarships. What's on your mind?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      persona,
      language,
      suggestions: persona === 'parent'
        ? [
            'How much will 4-year engineering cost after EBC scholarship?',
            'What is the security & curfew policy in college hostels?',
            'How does TFWS 100% tuition waiver work?',
          ]
        : [
            'I got 72% in 12th and I want admission in Computer Engineering.',
            'What is the difference between Freeze and Betterment in CAP 1?',
            'Which documents are needed for my OBC/EWS category?',
            'How should I arrange my CAP Round 1 option form?',
          ],
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle Speech Synthesis
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown stars and hashes for cleaner speech
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick suitable voice if available
    const voices = window.speechSynthesis.getVoices();
    if (language === 'hi') {
      const hiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
      if (hiVoice) utterance.voice = hiVoice;
      utterance.lang = 'hi-IN';
    } else if (language === 'mr') {
      const mrVoice = voices.find(v => v.lang.includes('mr') || v.lang.includes('IN'));
      if (mrVoice) utterance.voice = mrVoice;
      utterance.lang = 'mr-IN';
    } else {
      const enVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-US'));
      if (enVoice) utterance.voice = enVoice;
      utterance.lang = 'en-US';
    }

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputMessage).trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      persona,
      language,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/admission/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          persona,
          language,
          studentProfile: profile,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I am processing your query. Please review the recommended modules.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        persona,
        language,
        suggestions: data.suggestions || [
          'Calculate Net Fees with Scholarship',
          'Check Required Documents Checklist',
          'Predict College Options',
        ],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Failed to get bot reply:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `I encountered an issue connecting to the admission engine. However, based on statutory guidelines: For Engineering admissions, ensure you have your 12th PCM aggregate, Domicile certificate, and entrance score card ready. You can explore the **Course & Eligibility** tab directly!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        persona,
        language,
        suggestions: ['Predict College Options', 'Document Verification Checklist'],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Quick inquiry prompts based on persona
  const quickChips = persona === 'parent'
    ? [
        { label: '💰 4-Year Fee with EBC Waiver', query: 'How much total fee will I have to pay for 4 years if my income is under 8 lakhs?' },
        { label: '🛡️ Hostel Curfew & Safety', query: 'What are the safety measures, curfews, and warden supervision in college hostels?' },
        { label: '🎓 TFWS 100% Free Tuition', query: 'Explain how TFWS gives 100% tuition waiver and who is eligible.' },
        { label: '🚌 College Bus Routes', query: 'Do engineering colleges provide daily bus transportation for day scholars?' },
      ]
    : [
        { label: '🎯 72% in 12th + CS Branch', query: 'I got 72% in 12th and I want admission in Computer Engineering.' },
        { label: '⚖️ Freeze vs Betterment in CAP', query: 'Explain clearly what is the difference between Freeze, Self-Freeze and Betterment in CAP Round 1.' },
        { label: '📋 Missing Caste Validity Receipt', query: 'What happens if my original Caste Validity certificate is not received before CAP deadline?' },
        { label: '💡 CS vs AI & Data Science', query: 'What is the syllabus and placement difference between Computer Engineering and AI & Data Science?' },
      ];

  return (
    <div className="flex flex-col h-[740px] bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Copilot Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${persona === 'parent' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'}`}>
            {persona === 'parent' ? <Users className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">
                {persona === 'parent' ? 'Admissions Copilot (Parent Advisory)' : 'AI Smart Admission Assistant'}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                Live DTE Rules
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personalized for: <span className="text-indigo-300 font-medium">{profile.entranceExam} {profile.entrancePercentile}%ile</span> • Category: <span className="text-indigo-300 font-medium">{profile.category}</span>
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Reset conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips Bar */}
      <div className="bg-slate-950/70 border-b border-slate-800/80 px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          Quick Ask:
        </span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip.query)}
            disabled={loading}
            className="text-[11px] font-medium px-3 py-1 rounded-full bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-700/80 hover:border-indigo-500/50 whitespace-nowrap transition-all shrink-0"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  isUser
                    ? 'bg-gradient-to-tr from-indigo-600 to-blue-600 text-white'
                    : msg.persona === 'parent'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-indigo-400 border border-slate-700'
                }`}
              >
                {isUser ? (
                  <User className="w-4 h-4" />
                ) : msg.persona === 'parent' ? (
                  <Users className="w-4 h-4" />
                ) : (
                  <GraduationCap className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-100 rounded-tl-none border border-slate-700/80'
                  }`}
                >
                  <div className="whitespace-pre-line prose prose-invert prose-xs max-w-none">
                    {msg.text}
                  </div>
                </div>

                {/* Footer Controls: Audio, Copy, Timestamp */}
                <div className="flex items-center gap-3 mt-1.5 px-1 text-[11px] text-slate-400">
                  <span>{msg.timestamp}</span>

                  {!isUser && (
                    <>
                      <button
                        onClick={() => handleToggleSpeak(msg.id, msg.text)}
                        className={`flex items-center gap-1 hover:text-white transition-colors ${
                          speakingId === msg.id ? 'text-indigo-400 font-bold' : ''
                        }`}
                        title="Read out aloud"
                      >
                        {speakingId === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-red-400" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>

                {/* Inline follow-up suggestions */}
                {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-800/50 hover:border-indigo-600 transition-all text-left"
                      >
                        ↳ {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl rounded-tl-none p-4 max-w-xs shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-indigo-300 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-400 ml-1">Analyzing official cutoffs & rules...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2"
        >
          {/* Voice Input Trigger */}
          <button
            type="button"
            onClick={onOpenVoiceModal}
            className="p-3 rounded-xl bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-300 border border-slate-700 transition-all shrink-0"
            title="Ask using voice"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                persona === 'parent'
                  ? 'Ask about 4-year total expenses, scholarships, hostel rules, or admission safety...'
                  : 'Ask about cutoffs, branch recommendation, CAP round choices, or missing documents...'
              }
              className="w-full bg-slate-800/90 text-slate-100 placeholder-slate-400 text-xs sm:text-sm rounded-xl px-4 py-3.5 pr-10 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            className={`p-3.5 rounded-xl font-semibold transition-all shrink-0 shadow-lg ${
              inputMessage.trim() && !loading
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
