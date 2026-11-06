import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ExamResult } from '../types/exam';
import { SUBJECT_METADATA } from '../data/questionBank';
import { formatTime } from '../utils/examUtils';
import { Printer, RotateCcw, FileCheck2, Share2, Check } from 'lucide-react';
import { NextVarsityLogo } from './NextVarsityLogo';

interface ResultScreenProps {
  result: ExamResult;
  onRetakeExam: () => void;
  onViewSolutions: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRetakeExam,
  onViewSolutions,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (result.isPassed) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#006a4e', '#746294', '#de2b3c', '#ffffff']
      });
    }
  }, [result.isPassed]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `NextVarsity ঢাকা বিশ্ববিদ্যালয় Ka-Unit MCQ রেজাল্ট:\nরোল: ${result.examRoll}\nফলাফল: ${result.isPassed ? 'PASSED' : 'NOT PASSED'}\nপ্রাপ্ত নম্বর: ${result.totalMcqMarks}/20.00\nমেধা অবস্থান: ${result.meritPosition} (Science)`;
    if (navigator.share) {
      navigator.share({
        title: 'NextVarsity DU Result',
        text: text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');
  const subjectKeys = result.selectedSubjects;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Top Action Bar (Hidden in print) */}
      <div className="no-print flex items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-xl border border-slate-300 shadow-xs">
        <div className="flex items-center gap-2">
          <NextVarsityLogo size="sm" showSubtitle={false} />
          <span className="text-xs font-semibold text-slate-700 hidden sm:inline ml-2 border-l border-slate-200 pl-2">
            পরীক্ষার ফলাফল (Official Result Card)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>প্রিন্ট</span>
          </button>

          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-600" />}
            <span>{copied ? 'কপি হয়েছে' : 'শেয়ার'}</span>
          </button>

          <button
            onClick={onRetakeExam}
            className="px-3 py-1.5 rounded-md bg-[#006a4e] hover:bg-[#055740] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>নতুন পরীক্ষা</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EXACT DU OFFICIAL RESULT CARD (Matches Image 2 without Written marks)     */}
      {/* ========================================================================= */}
      <div className="print-card bg-white rounded-xl border-2 border-slate-300 p-6 sm:p-8 shadow-sm">
        
        {/* Main Title: "Science" in the exact DU purple font */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#746294] tracking-wide">
            Science
          </h1>
          <p className="text-xs text-slate-400 font-serif uppercase tracking-widest mt-0.5">
            Faculty of Science · University of Dhaka
          </p>
        </div>

        {/* Top Summary Table (Unit | Exam Roll | Result | Merit Position) */}
        <div className="overflow-x-auto rounded-md border border-[#746294]/50 mb-7">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#746294] text-white text-xs sm:text-sm font-semibold divide-x divide-white/20">
                <th className="py-2.5 px-3 uppercase tracking-wider font-medium">Unit</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-medium">Exam Roll</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-medium">Result</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-medium">Merit Position (Group)</th>
              </tr>
            </thead>
            <tbody className="bg-white text-xs sm:text-sm divide-x divide-slate-200">
              <tr className="border-t border-slate-200">
                <td className="py-3 px-3 font-semibold text-[#746294]">
                  Science
                </td>
                <td className="py-3 px-3 font-mono font-bold text-slate-900">
                  {result.examRoll}
                </td>
                <td className="py-3 px-3 font-bold">
                  {result.isPassed ? (
                    <span className="text-[#008000] text-sm sm:text-base font-extrabold tracking-wide">
                      PASSED
                    </span>
                  ) : (
                    <span className="text-red-600 text-sm sm:text-base font-extrabold tracking-wide">
                      NOT PASSED
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 font-medium text-slate-800">
                  {result.isPassed ? (
                    <span className="font-bold text-[#746294]">
                      {result.meritPosition} (Science)
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">Not Qualified</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Subheading: "Detailed Results" in golden bronze serif */}
        <div className="text-center my-5">
          <h2 className="text-sm sm:text-base font-serif font-bold text-[#b5832a] tracking-wide inline-block">
            Detailed Results
          </h2>
        </div>

        {/* Detailed Results Table - 3 Columns (Written column removed per user request!) */}
        <div className="overflow-x-auto rounded-md border border-slate-300 mb-6">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="text-xs sm:text-sm font-semibold divide-x divide-slate-300">
                <th className="py-2.5 px-4 bg-[#88888e] text-white font-medium text-left">
                  Subjects
                </th>
                <th className="py-2.5 px-4 bg-[#88888e] text-white font-medium">
                  <span className="text-slate-200 font-normal text-[11px] mr-1">(Correct)</span>
                  <span>MCQ</span>
                  <span className="text-slate-200 font-normal text-[11px] ml-1">(Wrong)</span>
                </th>
                <th className="py-2.5 px-4 bg-[#746294] text-white font-medium">
                  Marks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm bg-white">
              {subjectKeys.map((subId) => {
                const subRes = result.subjectResults[subId];
                if (!subRes) return null;

                const correct2d = formatTwoDigits(subRes.correctCount);
                const wrong2d = formatTwoDigits(subRes.wrongCount);
                const netScore = subRes.mcqMarks.toFixed(2);

                return (
                  <tr key={subId} className="divide-x divide-slate-200 hover:bg-slate-50/50">
                    {/* Subject Column */}
                    <td className="py-3 px-4 font-semibold text-slate-800 text-left">
                      {SUBJECT_METADATA[subId]?.nameEn || subId}
                    </td>

                    {/* Exact DU MCQ formatting: ✓11  10.75  ×01 */}
                    <td className="py-3 px-4 font-mono">
                      <div className="inline-flex items-center justify-center gap-2">
                        {/* Correct in Green */}
                        <span className="text-[#008000] font-bold text-xs inline-flex items-center">
                          ✓<span className="text-[11px]">{correct2d}</span>
                        </span>

                        {/* Net Score in large bold text */}
                        <span className="text-lg sm:text-xl font-bold font-serif text-slate-900 mx-3 tracking-tight">
                          {netScore}
                        </span>

                        {/* Wrong in Red */}
                        <span className="text-[#c8102e] font-bold text-xs inline-flex items-center">
                          ×<span className="text-[11px]">{wrong2d}</span>
                        </span>
                      </div>
                    </td>

                    {/* Marks Column */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {netScore}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Total Admission Test Marks (20) Strip (Matches Image 2 bottom highlight) */}
        <div className="flex items-center justify-end gap-4 py-3 px-4 bg-slate-50 rounded-md border border-slate-200 mb-6">
          <span className="text-xs sm:text-sm font-serif font-bold text-[#746294]">
            Admission Test Marks (20)
          </span>
          <div className="px-5 py-1 rounded bg-white border border-slate-300 shadow-xs">
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#008000]">
              {result.totalMcqMarks.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Academic Details Section */}
        <div className="text-center my-4">
          <h2 className="text-xs sm:text-sm font-serif font-bold text-[#b5832a] tracking-wide inline-block uppercase">
            Academic Mark Details
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-center text-xs">
          <div className="p-1.5">
            <span className="text-slate-500 block">সঠিক উত্তর</span>
            <span className="text-sm font-bold font-mono text-[#008000]">
              {result.totalCorrect}টি
            </span>
          </div>
          <div className="p-1.5">
            <span className="text-slate-500 block">ভুল উত্তর (-০.২৫)</span>
            <span className="text-sm font-bold font-mono text-red-600">
              {result.totalWrong}টি
            </span>
          </div>
          <div className="p-1.5">
            <span className="text-slate-500 block">সময় লেগেছে</span>
            <span className="text-sm font-bold font-mono text-slate-800">
              {formatTime(result.timeTakenSeconds)}
            </span>
          </div>
          <div className="p-1.5">
            <span className="text-slate-500 block">পরীক্ষার্থী</span>
            <span className="text-xs font-semibold text-slate-800 truncate block mt-0.5">
              {result.candidateName}
            </span>
          </div>
        </div>

        {/* Printable Verification Footer */}
        <div className="mt-8 pt-4 border-t border-dashed border-slate-300 flex items-center justify-between text-[11px] text-slate-400">
          <div>NextVarsity DU Ka-Unit System</div>
          <div>University of Dhaka</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="no-print mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onViewSolutions}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>প্রশ্ন ও ব্যাখ্যা পর্যালোচনা (Solutions)</span>
        </button>

        <button
          onClick={onRetakeExam}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>আরেকটি পরীক্ষা দিন (Retake)</span>
        </button>
      </div>
    </div>
  );
};
