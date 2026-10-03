import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types/admission';
import { Mic, MicOff, X, Volume2, Sparkles, AlertCircle } from 'lucide-react';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onVoiceSubmit: (transcript: string) => void;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  language,
  onVoiceSubmit,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setTranscript('');
      setErrorMsg(null);
      return;
    }

    // Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg('Speech recognition is not supported in this browser. Please type your query directly.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Select language
      if (language === 'mr') {
        recognition.lang = 'mr-IN';
      } else if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = 0; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMsg('Microphone access was denied. Please allow microphone permissions in your browser.');
        } else {
          setErrorMsg(`Voice recognition notice: ${event.error}. You can speak again or type.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e: any) {
      console.error(e);
      setErrorMsg('Could not initialize microphone. Please check permissions.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isOpen, language]);

  const handleStartListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setErrorMsg(null);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleSubmit = () => {
    if (!transcript.trim()) return;
    onVoiceSubmit(transcript.trim());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          {/* Animated Microphone Icon */}
          <div className="relative my-4">
            {isListening && (
              <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping scale-150" />
            )}
            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
                isListening
                  ? 'bg-rose-600 text-white shadow-rose-600/40 ring-4 ring-rose-400/30'
                  : 'bg-indigo-600 text-white shadow-indigo-600/40 ring-4 ring-indigo-400/30 hover:scale-105'
              }`}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          <h3 className="text-lg font-bold text-white mt-2">
            {isListening ? 'Listening to your question...' : 'Tap Mic to Speak'}
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Language: <strong className="text-indigo-400">{language === 'mr' ? 'मराठी (Marathi)' : language === 'hi' ? 'हिंदी (Hindi)' : 'English (India)'}</strong>
          </p>

          {/* Transcript Box */}
          <div className="w-full mt-5 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 min-h-[90px] flex items-center justify-center text-xs sm:text-sm text-slate-200 italic">
            {transcript ? (
              <span className="not-italic text-white font-medium">{transcript}</span>
            ) : isListening ? (
              <span className="text-slate-400">Speak now, e.g.: "I got 72% in 12th, can I get CS in Pune?"</span>
            ) : (
              <span className="text-slate-500">Your spoken speech will appear here...</span>
            )}
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-3 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!transcript.trim()}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all shadow-lg ${
                transcript.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              Ask Copilot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
