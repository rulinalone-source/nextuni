import React from 'react';
import { Clock, History, HelpCircle, ArrowLeft, Edit3 } from 'lucide-react';
import { formatTime } from '../utils/examUtils';
import { NextVarsityLogo } from './NextVarsityLogo';

interface HeaderProps {
  examActive: boolean;
  timeRemaining: number;
  onOpenHistory: () => void;
  onOpenInstructions: () => void;
  onOpenAdmin: () => void;
  onResetExam?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  examActive,
  timeRemaining,
  onOpenHistory,
  onOpenInstructions,
  onOpenAdmin,
  onResetExam,
}) => {
  const isUrgent = timeRemaining <= 180;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone - 100% Code Based NextVarsity Logo */}
        <div 
          onClick={onResetExam}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <NextVarsityLogo size="sm" showSubtitle={false} />

          <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
            DU Science
          </span>
        </div>

        {/* Center: Live Timer if Exam is Active */}
        {examActive && (
          <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg border font-mono transition-colors ${
            isUrgent 
              ? 'bg-red-50 text-red-700 border-red-300 animate-pulse' 
              : 'bg-emerald-50 text-[#006a4e] border-emerald-300'
          }`}>
            <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-600' : 'text-[#006a4e]'}`} />
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Time Left:</span>
            <span className="text-base sm:text-lg font-bold tracking-tight">
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}

        {/* Right Action Zone */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Admin / Edit Questions Button */}
          {!examActive && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-white bg-[#006a4e] hover:bg-[#055740] rounded-lg shadow-xs transition-colors cursor-pointer"
              title="Admin: প্রশ্ন যোগ, অপশন ও ব্যাখ্যা সম্পাদনা করুন"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>প্রশ্ন যোগ / Admin</span>
            </button>
          )}

          <button
            onClick={onOpenInstructions}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">নির্দেশনা</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            <History className="w-4 h-4 text-[#006a4e]" />
            <span className="hidden sm:inline">রেজাল্ট</span>
          </button>

          {examActive && (
            <button
              onClick={onResetExam}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 px-2 py-1 hover:bg-red-50 rounded transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">হোম</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
