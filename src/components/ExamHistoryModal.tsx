import React from 'react';
import { ExamResult } from '../types/exam';
import { X, Award, Trash2, Calendar, Clock, ChevronRight } from 'lucide-react';

interface ExamHistoryModalProps {
  history: ExamResult[];
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: ExamResult) => void;
  onClearHistory: () => void;
}

export const ExamHistoryModal: React.FC<ExamHistoryModalProps> = ({
  history,
  isOpen,
  onClose,
  onSelectResult,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#006a4e] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-display">
                পরীক্ষার পূর্ববর্তী ফলাফল (Exam History)
              </h3>
              <p className="text-[11px] text-slate-500">
                আপনার সাম্প্রতিক দেওয়া ঢাকা বিশ্ববিদ্যালয় MCQ পরীক্ষার তালিকা
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History List Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              এখনও পর্যন্ত কোনো পরীক্ষার রেকর্ড সংরক্ষিত নেই।
            </div>
          ) : (
            history.map((item) => {
              const dateStr = new Date(item.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectResult(item);
                    onClose();
                  }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-[#006a4e] bg-white hover:bg-slate-50/60 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        Roll: {item.examRoll}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                        item.isPassed 
                          ? 'bg-emerald-50 text-[#006a4e] border border-emerald-200' 
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {item.isPassed ? 'PASSED' : 'NOT PASSED'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {dateStr}
                      </span>
                      <span>•</span>
                      <span>
                        সঠিক: {item.totalCorrect} | ভুল: {item.totalWrong}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-base font-bold font-mono text-slate-900 block">
                        {item.totalMcqMarks.toFixed(2)}/20
                      </span>
                      <span className="text-[10px] font-semibold text-[#746294]">
                        Merit: #{item.meritPosition}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#006a4e] transition-colors" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        {history.length > 0 && (
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onClearHistory}
              className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ইতিহাস মুছে ফেলুন (Clear All)</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              বন্ধ করুন (Close)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
