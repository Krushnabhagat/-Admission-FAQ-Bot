import React, { useState, useEffect } from 'react';
import { UserPersona, Language, AdmissionDeadline } from '../types/admission';
import { CAP_DEADLINES_SCHEDULE } from '../data/admissionData';
import { 
  Calendar, 
  Clock, 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';

interface DeadlineTrackerProps {
  persona: UserPersona;
  language: Language;
}

export const DeadlineTracker: React.FC<DeadlineTrackerProps> = ({
  persona,
  language,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reminderSaved, setReminderSaved] = useState(false);

  // Simulated countdown to next milestone (July 10, 2026 - CAP Registration Deadline)
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Download .ics calendar event file
  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EduGuide AI//CAP Admission Deadlines 2026//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:MHT-CET / DTE CAP Option Form Submission Deadline
DESCRIPTION:Mandatory submission and confirmation of CAP Round 1 Option Form. Do not miss locking your choices.
STATUS:CONFIRMED
DTSTART:20260720T090000Z
DTEND:20260722T170000Z
LOCATION:https://fe2026.mahacet.org
END:VEVENT
BEGIN:VEVENT
SUMMARY:CAP Round 1 Seat Acceptance & Reporting (Freeze / Betterment)
DESCRIPTION:Pay Rs 1000 seat acceptance fee online and select Freeze or Betterment.
STATUS:CONFIRMED
DTSTART:20260726T090000Z
DTEND:20260729T170000Z
LOCATION:https://fe2026.mahacet.org
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CAP_Admission_Schedule_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header and Live Countdown */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl border border-indigo-800/40 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-5 border-b border-indigo-800/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40">
                <Calendar className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-white">
                Maharashtra State CAP 2026 Centralized Admission Schedule
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Track deadlines for Scrutiny confirmation, Option Form locking, Seat Acceptance Fee payment, and reporting.
            </p>
          </div>

          {/* .ICS Calendar Download */}
          <button
            onClick={handleDownloadICS}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download .ICS for Google Calendar</span>
          </button>
        </div>

        {/* Live Countdown Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 items-center">
          <div>
            <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Next Critical Milestone Closing:
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-white mt-1">
              Phase 1: Online Registration & E-Scrutiny Verification
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Unverified applications will be disqualified from CAP Round 1 merit list generation.
            </p>
          </div>

          {/* Countdown Digit Boxes */}
          <div className="flex items-center justify-start md:justify-end gap-2 sm:gap-3">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.minutes },
              { label: 'Secs', val: timeLeft.seconds },
            ].map((digit, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-slate-900 border border-indigo-700/60 flex items-center justify-center text-xl sm:text-2xl font-black text-white shadow-inner">
                  {digit.val < 10 ? `0${digit.val}` : digit.val}
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">{digit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SMS / WhatsApp Notification Simulator */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <form onSubmit={handleSaveReminder} className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-white">
                Get WhatsApp & SMS Alerts 24 Hours Before Every Deadline
              </h5>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Never miss option form locking or ₹1,000 seat acceptance fee payment cutoff windows.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="tel"
              placeholder="+91 Mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-slate-800 text-white placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-48"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shrink-0"
            >
              {reminderSaved ? 'Alerts Activated!' : 'Activate Alerts'}
            </button>
          </div>
        </form>
      </div>

      {/* Roadmap Timeline Schedule */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          Step-by-Step CAP Round Roadmap
        </h4>

        <div className="space-y-3">
          {CAP_DEADLINES_SCHEDULE.map((item, idx) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                item.isUrgent
                  ? 'bg-indigo-950/20 border-indigo-600/40 shadow-lg'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                      {item.phase}
                    </span>
                    {item.isUrgent && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Critical Milestone
                      </span>
                    )}
                  </div>

                  <h5 className="text-sm font-bold text-white mt-1">
                    {language === 'mr' ? item.eventTitleMr : item.eventTitle}
                  </h5>

                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    {item.actionRequired}
                  </p>

                  {item.penaltyNotice && (
                    <p className="text-[11px] font-semibold text-rose-400 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      {item.penaltyNotice}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0 mt-2 md:mt-0">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white inline-block">
                    {item.startDate} — {item.endDate}
                  </div>
                  <div className="mt-1">
                    <a
                      href={item.portalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-indigo-400 hover:text-white inline-flex items-center gap-1"
                    >
                      <span>CET Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
