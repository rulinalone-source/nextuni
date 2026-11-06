import React, { useState } from 'react';
import { SubjectId } from '../types/exam';
import { SUBJECT_METADATA, HSC_CHAPTERS } from '../data/questionBank';
import { Lock, ArrowRight, RefreshCw, CheckCircle2, ChevronDown, ChevronUp, Layers, CheckSquare, Square } from 'lucide-react';
import { NextVarsityLogo } from './NextVarsityLogo';

interface SubjectSelectorProps {
  onStartExam: (
    candidateName: string,
    examRoll: string,
    selectedSubjects: SubjectId[],
    mainSubject: SubjectId,
    optionalSubject: SubjectId,
    chapterSelections: Partial<Record<SubjectId, string[]>>
  ) => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({ onStartExam }) => {
  const [candidateName, setCandidateName] = useState('Md. Rafiqul Islam');
  const [examRoll, setExamRoll] = useState('1142715');
  const [mainSubject, setMainSubject] = useState<SubjectId>('math');
  const [optionalSubject, setOptionalSubject] = useState<SubjectId>('biology');

  // Chapter selections for science subjects: map of subjectId -> selected chapter nameBn[]
  // If empty array or not present, it means "Full Syllabus / All Chapters"
  const [chapterMode, setChapterMode] = useState<Record<string, 'all' | 'custom'>>({
    physics: 'all',
    chemistry: 'all',
    math: 'all',
    biology: 'all'
  });

  const [selectedChapters, setSelectedChapters] = useState<Partial<Record<SubjectId, string[]>>>({
    physics: [],
    chemistry: [],
    math: [],
    biology: []
  });

  // Track expanded accordion for chapter selection
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const handleMainSubjectChange = (sub: SubjectId) => {
    setMainSubject(sub);
    if (optionalSubject === sub) {
      const available = sub === 'math' 
        ? ['biology', 'bangla', 'english'] as SubjectId[]
        : ['math', 'bangla', 'english'] as SubjectId[];
      setOptionalSubject(available[0]);
    }
  };

  const handleGenerateRoll = () => {
    const randomRoll = Math.floor(1100000 + Math.random() * 899999).toString();
    setExamRoll(randomRoll);
  };

  const toggleChapterSelection = (subId: SubjectId, chapterName: string) => {
    const current = selectedChapters[subId] || [];
    const exists = current.includes(chapterName);
    const updated = exists 
      ? current.filter(c => c !== chapterName)
      : [...current, chapterName];

    setSelectedChapters(prev => ({
      ...prev,
      [subId]: updated
    }));
  };

  const handleSelectAllChapters = (subId: 'physics' | 'chemistry' | 'math' | 'biology') => {
    const all = HSC_CHAPTERS[subId]?.map(c => c.nameBn) || [];
    setSelectedChapters(prev => ({ ...prev, [subId]: all }));
  };

  const handleClearAllChapters = (subId: 'physics' | 'chemistry' | 'math' | 'biology') => {
    setSelectedChapters(prev => ({ ...prev, [subId]: [] }));
  };

  const availableOptionalOptions: { id: SubjectId; labelEn: string; labelBn: string }[] = 
    mainSubject === 'math'
      ? [
          { id: 'biology', labelEn: 'Biology', labelBn: 'জীববিজ্ঞান' },
          { id: 'bangla', labelEn: 'Bangla', labelBn: 'বাংলা' },
          { id: 'english', labelEn: 'English', labelBn: 'ইংরেজি' },
        ]
      : [
          { id: 'math', labelEn: 'Higher Mathematics', labelBn: 'উচ্চতর গণিত' },
          { id: 'bangla', labelEn: 'Bangla', labelBn: 'বাংলা' },
          { id: 'english', labelEn: 'English', labelBn: 'ইংরেজি' },
        ];

  const selectedSubjectList: SubjectId[] = ['physics', 'chemistry', mainSubject, optionalSubject];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare active chapter selections (only if mode is 'custom')
    const finalChapters: Partial<Record<SubjectId, string[]>> = {};
    for (const sub of selectedSubjectList) {
      if (['physics', 'chemistry', 'math', 'biology'].includes(sub)) {
        if (chapterMode[sub] === 'custom' && selectedChapters[sub] && selectedChapters[sub]!.length > 0) {
          finalChapters[sub] = selectedChapters[sub];
        }
      }
    }

    onStartExam(candidateName, examRoll, selectedSubjectList, mainSubject, optionalSubject, finalChapters);
  };

  // Helper renderer for chapter selector for a science subject
  const renderChapterSelector = (subId: 'physics' | 'chemistry' | 'math' | 'biology') => {
    const isCustom = chapterMode[subId] === 'custom';
    const chapters = HSC_CHAPTERS[subId] || [];
    const currentSelected = selectedChapters[subId] || [];
    const isExpanded = expandedSubject === subId;

    return (
      <div className="mt-3 pt-3 border-t border-slate-200 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">সিলেবাস পরিধি:</span>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name={`mode_${subId}`}
                checked={!isCustom}
                onChange={() => {
                  setChapterMode(prev => ({ ...prev, [subId]: 'all' }));
                  setExpandedSubject(null);
                }}
                className="h-3.5 w-3.5 text-[#006a4e]"
              />
              <span className={`text-xs ${!isCustom ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                সম্পূর্ণ সিলেবাস (Full Subject)
              </span>
            </label>

            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name={`mode_${subId}`}
                checked={isCustom}
                onChange={() => {
                  setChapterMode(prev => ({ ...prev, [subId]: 'custom' }));
                  setExpandedSubject(subId);
                }}
                className="h-3.5 w-3.5 text-[#006a4e]"
              />
              <span className={`text-xs ${isCustom ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                অধ্যায় নির্বাচন (Custom Chapters)
              </span>
            </label>
          </div>

          {isCustom && (
            <button
              type="button"
              onClick={() => setExpandedSubject(isExpanded ? null : subId)}
              className="text-xs font-semibold text-[#006a4e] hover:underline flex items-center gap-1"
            >
              <span>{currentSelected.length > 0 ? `${currentSelected.length}টি অধ্যায় নির্বাচিত` : 'অধ্যায় বাছুন'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Collapsible Chapter Checkboxes */}
        {isCustom && isExpanded && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-slate-300 space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 text-[11px]">
              <span className="text-slate-500 font-medium">
                এইচএসসি সিলেবাসের অধ্যায়গুলো টিক দিন ({currentSelected.length}/{chapters.length}):
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectAllChapters(subId)}
                  className="text-[#006a4e] hover:underline font-semibold"
                >
                  সব বাছুন
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => handleClearAllChapters(subId)}
                  className="text-slate-500 hover:underline"
                >
                  রিসেট
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pt-1">
              {chapters.map((ch) => {
                const isChecked = currentSelected.includes(ch.nameBn);
                return (
                  <label
                    key={ch.id}
                    onClick={() => toggleChapterSelection(subId, ch.nameBn)}
                    className={`p-1.5 px-2 rounded border cursor-pointer flex items-center gap-2 text-xs transition-colors ${
                      isChecked 
                        ? 'bg-emerald-50 border-emerald-300 text-slate-900 font-medium' 
                        : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleChapterSelection(subId, ch.nameBn)}
                      className="h-3.5 w-3.5 text-[#006a4e] rounded"
                    />
                    <span className="flex-1 truncate">{ch.nameBn}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{ch.paper}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Brand & Simple Heading */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-3">
          <NextVarsityLogo size="lg" showSubtitle={true} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          ঢাকা বিশ্ববিদ্যালয় বিজ্ঞান অনুষদ (Ka Unit) MCQ পরীক্ষা
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          ৪টি বিষয় · ২০টি প্রশ্ন · ২০ মিনিট সময় · নেগেটিভ মার্কিং -০.২৫
        </p>
      </div>

      <form onSubmit={handleStart} className="space-y-6">
        {/* Candidate Info Box */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 border-b pb-2 mb-4">
            ১. পরীক্ষার্থীর তথ্য (Candidate Information)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                পরীক্ষার্থীর নাম:
              </label>
              <input
                type="text"
                required
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#006a4e]"
                placeholder="আপনার নাম লিখুন"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  পরীক্ষার রোল নম্বর:
                </label>
                <button
                  type="button"
                  onClick={handleGenerateRoll}
                  className="text-xs text-[#006a4e] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  নতুন রোল
                </button>
              </div>
              <input
                type="text"
                required
                value={examRoll}
                onChange={(e) => setExamRoll(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono text-slate-800 focus:outline-none focus:border-[#006a4e]"
                placeholder="1142715"
              />
            </div>
          </div>
        </div>

        {/* Compulsory Subjects (Locked) + Chapter Selector for Physics & Chemistry */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-sm font-bold text-slate-900">
              ২. আবশ্যিক বিষয় (Compulsory Subjects)
            </h2>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Lock className="w-3 h-3 text-slate-400" />
              বাধ্যতামূলক (১০টি প্রশ্ন)
            </span>
          </div>

          {/* Physics Box */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 text-sm">1. Physics (পদার্থবিজ্ঞান)</span>
                <span className="text-xs text-slate-500 block">৫টি MCQ · ৫ নম্বর</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#006a4e]" />
            </div>
            {renderChapterSelector('physics')}
          </div>

          {/* Chemistry Box */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 text-sm">2. Chemistry (রসায়ন)</span>
                <span className="text-xs text-slate-500 block">৫টি MCQ · ৫ নম্বর</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#006a4e]" />
            </div>
            {renderChapterSelector('chemistry')}
          </div>
        </div>

        {/* Main Subject Selection + Chapter selector if Math/Bio */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-4">
          <div className="border-b pb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              ৩. মূল বিষয় নির্বাচন (Select Main Subject)
            </h2>
            <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
              যেকোনো ১টি নির্বাচন করুন (৫টি প্রশ্ন)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              onClick={() => handleMainSubjectChange('math')}
              className={`p-3.5 border-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
                mainSubject === 'math'
                  ? 'border-[#006a4e] bg-emerald-50/50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <input
                type="radio"
                name="mainSub"
                checked={mainSubject === 'math'}
                onChange={() => handleMainSubjectChange('math')}
                className="h-4 w-4 text-[#006a4e]"
              />
              <div>
                <span className="font-bold text-slate-800 text-sm block">
                  Higher Mathematics (উচ্চতর গণিত)
                </span>
                <span className="text-xs text-slate-500">৫টি MCQ প্রশ্ন</span>
              </div>
            </label>

            <label
              onClick={() => handleMainSubjectChange('biology')}
              className={`p-3.5 border-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
                mainSubject === 'biology'
                  ? 'border-[#006a4e] bg-emerald-50/50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <input
                type="radio"
                name="mainSub"
                checked={mainSubject === 'biology'}
                onChange={() => handleMainSubjectChange('biology')}
                className="h-4 w-4 text-[#006a4e]"
              />
              <div>
                <span className="font-bold text-slate-800 text-sm block">
                  Biology (জীববিজ্ঞান)
                </span>
                <span className="text-xs text-slate-500">৫টি MCQ প্রশ্ন</span>
              </div>
            </label>
          </div>

          {/* Chapter selector for chosen Main subject */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-700 text-xs">
              {mainSubject === 'math' ? 'Higher Mathematics অধ্যায় নির্বাচন:' : 'Biology অধ্যায় নির্বাচন:'}
            </span>
            {renderChapterSelector(mainSubject as 'math' | 'biology')}
          </div>
        </div>

        {/* 4th Subject Selection (If science, has chapter selection; if Bangla/English, no chapter selection) */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs space-y-4">
          <div className="border-b pb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              ৪. ৪র্থ বিষয় / ঐচ্ছিক (Select 4th / Optional Subject)
            </h2>
            <span className="text-xs text-red-700 font-semibold bg-red-50 px-2 py-0.5 rounded">
              যেকোনো ১টি নির্বাচন করুন (৫টি প্রশ্ন)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {availableOptionalOptions.map((opt) => (
              <label
                key={opt.id}
                onClick={() => setOptionalSubject(opt.id)}
                className={`p-3.5 border-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${
                  optionalSubject === opt.id
                    ? 'border-[#006a4e] bg-emerald-50/50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="optionalSub"
                  checked={optionalSubject === opt.id}
                  onChange={() => setOptionalSubject(opt.id)}
                  className="h-4 w-4 text-[#006a4e]"
                />
                <div>
                  <span className="font-bold text-slate-800 text-sm block">
                    {opt.labelEn}
                  </span>
                  <span className="text-xs text-slate-500">{opt.labelBn}</span>
                </div>
              </label>
            ))}
          </div>

          {/* If the 4th subject is a Science subject (Math or Biology), offer chapter selection */}
          {['math', 'biology'].includes(optionalSubject) && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-semibold text-slate-700 text-xs">
                {optionalSubject === 'math' ? 'Higher Mathematics অধ্যায় নির্বাচন:' : 'Biology অধ্যায় নির্বাচন:'}
              </span>
              {renderChapterSelector(optionalSubject as 'math' | 'biology')}
            </div>
          )}
        </div>

        {/* User Request 1: Remove the dark box / summary text from image_f6da7517.png */}
        {/* and JUST keep the clean "পরীক্ষা শুরু করুন (Start Exam)" button directly! */}
        <div className="text-center pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-[#006a4e] hover:bg-[#055740] text-white font-bold text-base flex items-center justify-center gap-2.5 mx-auto cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            <span>পরীক্ষা শুরু করুন (Start Exam)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
