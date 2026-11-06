import React, { useState } from 'react';
import { Question, SubjectId, UserAnswer } from '../types/exam';
import { SUBJECT_METADATA } from '../data/questionBank';
import { formatTime } from '../utils/examUtils';
import { Clock, Send, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ExamScreenProps {
  questions: Question[];
  selectedSubjects: SubjectId[];
  candidateName: string;
  examRoll: string;
  timeRemaining: number;
  onSubmitExam: (answers: Record<string, UserAnswer>, timeTakenSeconds: number) => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  questions,
  selectedSubjects,
  candidateName,
  examRoll,
  timeRemaining,
  onSubmitExam,
}) => {
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Answer state: mapping questionId -> UserAnswer
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>(() => {
    const initial: Record<string, UserAnswer> = {};
    for (const q of questions) {
      initial[q.id] = {
        questionId: q.id,
        subjectId: q.subjectId,
        selectedOptionIndex: null,
        isMarkedForReview: false,
      };
    }
    return initial;
  });

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        selectedOptionIndex: optionIndex,
      },
    }));
  };

  const handleClearAnswer = (questionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        selectedOptionIndex: null,
      },
    }));
  };

  const answeredCount = Object.values(answers).filter(
    (a) => a.selectedOptionIndex !== null
  ).length;

  const handleFinalSubmit = () => {
    setShowSubmitModal(false);
    const totalTime = 20 * 60;
    const timeTaken = Math.max(0, totalTime - timeRemaining);
    onSubmitExam(answers, timeTaken);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];
  const optionBnLetters = ['ক', 'খ', 'গ', 'ঘ'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28">
      {/* Sticky Top Status & Timer Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-300 py-3 px-4 mb-6 -mx-4 sm:mx-0 sm:rounded-xl sm:border shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-xs">
            <span className="font-bold text-slate-800">{candidateName}</span>
            <span className="text-slate-500 font-mono ml-1.5">(Roll: {examRoll})</span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="text-xs font-semibold text-[#006a4e] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{answeredCount} / {questions.length} সম্পন্ন</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live countdown timer */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md border font-mono font-bold text-sm ${
            timeRemaining <= 180 
              ? 'bg-red-50 text-red-700 border-red-300 animate-pulse' 
              : 'bg-emerald-50 text-[#006a4e] border-emerald-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 rounded-lg bg-[#006a4e] hover:bg-[#055740] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>জমা দিন (Submit)</span>
          </button>
        </div>
      </div>

      {/* Question Paper Header */}
      <div className="bg-white rounded-xl border border-slate-300 p-5 mb-6 text-center shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">
          ঢাকা বিশ্ববিদ্যালয় বিজ্ঞান অনুষদ (Ka Unit) MCQ প্রশ্নপত্র
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          সময়: ২০ মিনিট | পূর্ণমান: ২০.০০ | প্রতিটি প্রশ্নের মান ১.০০ | প্রতিটি ভুল উত্তরের জন্য ০.২৫ কাটা যাবে
        </p>
      </div>

      {/* All 20 Questions on One Page, grouped by Subjects */}
      <div className="space-y-8">
        {selectedSubjects.map((subId, subIdx) => {
          const subQuestions = questions.filter((q) => q.subjectId === subId);
          const subInfo = SUBJECT_METADATA[subId];

          return (
            <div key={subId} className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-xs">
              {/* Subject Title Banner */}
              <div className="bg-slate-100 border-b border-slate-300 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                    {subIdx + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {subInfo.nameEn} ({subInfo.nameBn})
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  ৫টি প্রশ্ন (প্রশ্ন {subIdx * 5 + 1} - {subIdx * 5 + 5})
                </span>
              </div>

              {/* Questions List for this Subject */}
              <div className="divide-y divide-slate-200">
                {subQuestions.map((q) => {
                  const qGlobalIndex = questions.findIndex((item) => item.id === q.id);
                  const selectedOption = answers[q.id]?.selectedOptionIndex;

                  return (
                    <div key={q.id} className="p-5 sm:p-6 hover:bg-slate-50/50 transition-colors">
                      {/* Question Text */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2.5">
                          <span className="font-bold text-sm text-slate-900 bg-slate-100 w-6 h-6 rounded flex items-center justify-center shrink-0">
                            {qGlobalIndex + 1}.
                          </span>
                          <div className="flex-1">
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                              {q.questionBn}
                            </h4>
                            {q.questionEn && q.questionEn !== q.questionBn && (
                              <p className="text-xs text-slate-500 italic mt-0.5">
                                {q.questionEn}
                              </p>
                            )}
                          </div>
                        </div>

                        {selectedOption !== null && (
                          <button
                            type="button"
                            onClick={() => handleClearAnswer(q.id)}
                            className="text-[11px] text-slate-400 hover:text-red-600 flex items-center gap-1 shrink-0 p-1"
                            title="Clear answer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span className="hidden sm:inline">মুছুন</span>
                          </button>
                        )}
                      </div>

                      {/* 4 Radio Options - Mobile friendly full width with comfortable touch target */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 sm:pl-8">
                        {q.options.map((optText, optIdx) => {
                          const isSelected = selectedOption === optIdx;

                          return (
                            <label
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`p-3 sm:p-3.5 rounded-lg border min-h-[44px] cursor-pointer flex items-center gap-3 transition-colors text-xs sm:text-sm active:scale-[0.99] ${
                                isSelected
                                  ? 'border-[#006a4e] bg-emerald-50/70 font-semibold text-slate-900 shadow-xs'
                                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q_${q.id}`}
                                checked={isSelected}
                                onChange={() => handleSelectOption(q.id, optIdx)}
                                className="h-4 w-4 text-[#006a4e] focus:ring-[#006a4e] shrink-0"
                              />
                              <span className="font-bold text-slate-500 mr-1 shrink-0">
                                ({optionBnLetters[optIdx]})
                              </span>
                              <span className="flex-1">{optText}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Sticky Submit Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-300 py-3 px-4 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-600">
            <span>মোট উত্তর দিয়েছেন: </span>
            <span className="font-bold text-[#006a4e]">{answeredCount}</span>
            <span> / {questions.length}টি প্রশ্ন</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-6 py-2.5 rounded-lg bg-[#006a4e] hover:bg-[#055740] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>পরীক্ষা জমা দিন (Submit Exam)</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-slate-300">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#006a4e] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900 text-center">
              পরীক্ষা জমা দিতে চান?
            </h3>
            <p className="text-xs text-slate-500 text-center mt-1">
              একবার সাবমিট করলে আপনার পরীক্ষার ফলাফল তৈরি হবে।
            </p>

            <div className="my-4 p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 border border-slate-200">
              <div className="flex justify-between">
                <span>উত্তর সম্পন্ন:</span>
                <span className="font-bold text-[#006a4e]">{answeredCount}টি</span>
              </div>
              <div className="flex justify-between">
                <span>অনুত্তরিত প্রশ্ন:</span>
                <span className="font-bold text-red-600">{questions.length - answeredCount}টি</span>
              </div>
              <div className="flex justify-between">
                <span>অবশিষ্ট সময়:</span>
                <span className="font-bold font-mono">{formatTime(timeRemaining)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                ফিরে যান
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 rounded-lg bg-[#006a4e] hover:bg-[#055740] text-white text-xs font-bold cursor-pointer shadow-xs transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
