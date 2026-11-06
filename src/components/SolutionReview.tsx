import React, { useState } from 'react';
import { ExamResult } from '../types/exam';
import { SUBJECT_METADATA } from '../data/questionBank';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  BookOpen, 
  Filter
} from 'lucide-react';

interface SolutionReviewProps {
  result: ExamResult;
  onBackToResult: () => void;
}

export const SolutionReview: React.FC<SolutionReviewProps> = ({
  result,
  onBackToResult,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'wrong' | 'unattempted'>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  const questionsWithStatus = result.questions.map((q, idx) => {
    const userAns = result.answers[q.id];
    const isUnattempted = !userAns || userAns.selectedOptionIndex === null;
    const isCorrect = !isUnattempted && userAns.selectedOptionIndex === q.correctIndex;
    const isWrong = !isUnattempted && !isCorrect;

    return {
      ...q,
      questionNumber: idx + 1,
      userAns,
      isUnattempted,
      isCorrect,
      isWrong,
    };
  });

  const filtered = questionsWithStatus.filter((item) => {
    if (filterType === 'correct' && !item.isCorrect) return false;
    if (filterType === 'wrong' && !item.isWrong) return false;
    if (filterType === 'unattempted' && !item.isUnattempted) return false;
    if (subjectFilter !== 'all' && item.subjectId !== subjectFilter) return false;
    return true;
  });

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <button
            onClick={onBackToResult}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>রেজাল্ট কার্ডে ফিরে যান (Back to Result)</span>
          </button>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            প্রশ্ন ও সমাধান পর্যালোচনা (Question Solutions & Explanations)
          </h2>
          <p className="text-xs text-slate-500">
            রোল: {result.examRoll} · মোট সঠিক: {result.totalCorrect} · ভুল: {result.totalWrong} · ফাঁকা: {result.totalUnattempted}
          </p>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono">
            +{result.totalCorrect * 1.0}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-red-50 text-red-800 border border-red-200 text-xs font-bold font-mono">
            -{(result.totalWrong * 0.25).toFixed(2)}
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold font-mono">
            ={result.totalMcqMarks.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({questionsWithStatus.length})
          </button>
          <button
            onClick={() => setFilterType('correct')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              filterType === 'correct'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 hover:text-emerald-900'
            }`}
          >
            Correct ({result.totalCorrect})
          </button>
          <button
            onClick={() => setFilterType('wrong')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              filterType === 'wrong'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-red-700 hover:text-red-900'
            }`}
          >
            Wrong ({result.totalWrong})
          </button>
          <button
            onClick={() => setFilterType('unattempted')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              filterType === 'unattempted'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Skipped ({result.totalUnattempted})
          </button>
        </div>

        {/* Subject Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#006a4e]"
          >
            <option value="all">সব বিষয় (All Subjects)</option>
            {result.selectedSubjects.map((subId) => (
              <option key={subId} value={subId}>
                {SUBJECT_METADATA[subId]?.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-5">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            এই ফিল্টারে কোনো প্রশ্ন নেই।
          </div>
        ) : (
          filtered.map((item) => {
            const userIndex = item.userAns?.selectedOptionIndex ?? null;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden"
              >
                {/* Status Indicator Left Accent Bar using the 3 theme colors */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    item.isCorrect
                      ? 'bg-[#006a4e]' // Emerald Green
                      : item.isWrong
                      ? 'bg-[#c8102e]' // Crimson Red
                      : 'bg-[#d97706]' // Amber for skipped/unanswered
                  }`}
                ></div>

                {/* Question Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      প্রশ্ন {item.questionNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {item.subjectName}
                    </span>
                    {item.category && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        item.category === 'math' 
                          ? 'bg-amber-50 text-amber-800 border-amber-200' 
                          : item.category === 'comprehension' 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' 
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {item.category === 'math' ? 'গাণিতিক' : item.category === 'comprehension' ? 'অনুধাবন' : 'জ্ঞান'}
                      </span>
                    )}
                    {item.chapter && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {item.chapter}
                      </span>
                    )}
                  </div>

                  <div>
                    {item.isCorrect && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006a4e] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        সঠিক (+১.০০)
                      </span>
                    )}
                    {item.isWrong && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#c8102e] bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                        <XCircle className="w-3.5 h-3.5" />
                        ভুল উত্তর (-০.২৫)
                      </span>
                    )}
                    {item.isUnattempted && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        <MinusCircle className="w-3.5 h-3.5" />
                        উত্তর দেননি (০.০০)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="my-4">
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {item.questionBn}
                  </h4>
                  {item.questionEn && item.questionEn !== item.questionBn && (
                    <p className="mt-1 text-xs text-slate-500 italic">
                      {item.questionEn}
                    </p>
                  )}
                </div>

                {/* Options List with status highlights */}
                <div className="space-y-2 mb-4">
                  {item.options.map((optText, optIdx) => {
                    const isUserChoice = userIndex === optIdx;
                    const isCorrectAnswer = optIdx === item.correctIndex;

                    let rowStyle = 'border-slate-200 bg-white text-slate-700';

                    if (isCorrectAnswer) {
                      rowStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold';
                    } else if (isUserChoice && !isCorrectAnswer) {
                      rowStyle = 'border-red-400 bg-red-50/70 text-red-950';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${rowStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center shrink-0 ${
                            isCorrectAnswer
                              ? 'bg-[#006a4e] text-white'
                              : isUserChoice
                              ? 'bg-[#c8102e] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {optionLetters[optIdx]}
                          </span>
                          <span>{optText}</span>
                        </div>

                        <div>
                          {isCorrectAnswer && (
                            <span className="text-[11px] font-bold text-[#006a4e] bg-emerald-100/80 px-2 py-0.5 rounded">
                              ✓ সঠিক উত্তর
                            </span>
                          )}
                          {isUserChoice && !isCorrectAnswer && (
                            <span className="text-[11px] font-bold text-[#c8102e] bg-red-100/80 px-2 py-0.5 rounded">
                              × আপনার উত্তর
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#006a4e]" />
                    <span>ব্যাখ্যা ও নোট (Explanation & Key Concept):</span>
                  </div>
                  <p className="leading-relaxed text-slate-800">
                    {item.explanation}
                  </p>
                  {item.topic && (
                    <span className="text-[11px] text-slate-500 block pt-1">
                      টপিক: {item.topic}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onBackToResult}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
        >
          রেজাল্ট কার্ডে ফিরে যান (Back to Result Card)
        </button>
      </div>
    </div>
  );
};
