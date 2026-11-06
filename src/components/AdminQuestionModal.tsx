import React, { useState } from 'react';
import { Question, SubjectId, QuestionCategory, CATEGORY_LABELS } from '../types/exam';
import { SUBJECT_METADATA, HSC_CHAPTERS } from '../data/questionBank';
import { saveQuestionToDb, deleteQuestionFromDb } from '../firebase';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Cloud, 
  BookOpen, 
  Search,
  Tag
} from 'lucide-react';

interface AdminQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  allQuestions: Record<SubjectId, Question[]>;
  onRefreshQuestions: () => void;
}

export const AdminQuestionModal: React.FC<AdminQuestionModalProps> = ({
  isOpen,
  onClose,
  allQuestions,
  onRefreshQuestions,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('physics');
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Form State
  const [formSubject, setFormSubject] = useState<SubjectId>('physics');
  const [formCategory, setFormCategory] = useState<QuestionCategory>('math');
  const [formChapter, setFormChapter] = useState('');
  const [formQuestionBn, setFormQuestionBn] = useState('');
  const [formQuestionEn, setFormQuestionEn] = useState('');
  const [formOption0, setFormOption0] = useState('');
  const [formOption1, setFormOption1] = useState('');
  const [formOption2, setFormOption2] = useState('');
  const [formOption3, setFormOption3] = useState('');
  const [formCorrectIndex, setFormCorrectIndex] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState('');
  const [formTopic, setFormTopic] = useState('');

  if (!isOpen) return null;

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormSubject(selectedSubject);
    setFormCategory('math');
    const defaultChapter = HSC_CHAPTERS[selectedSubject as keyof typeof HSC_CHAPTERS]?.[0]?.nameBn || '';
    setFormChapter(defaultChapter);
    setFormQuestionBn('');
    setFormQuestionEn('');
    setFormOption0('');
    setFormOption1('');
    setFormOption2('');
    setFormOption3('');
    setFormCorrectIndex(0);
    setFormExplanation('');
    setFormTopic('');
    setIsAddingNew(true);
  };

  const handleEditQuestion = (q: Question) => {
    setEditingId(q.id);
    setFormSubject(q.subjectId);
    setFormCategory(q.category || 'knowledge');
    setFormChapter(q.chapter || '');
    setFormQuestionBn(q.questionBn);
    setFormQuestionEn(q.questionEn || '');
    setFormOption0(q.options[0] || '');
    setFormOption1(q.options[1] || '');
    setFormOption2(q.options[2] || '');
    setFormOption3(q.options[3] || '');
    setFormCorrectIndex(q.correctIndex);
    setFormExplanation(q.explanation || '');
    setFormTopic(q.topic || '');
    setIsAddingNew(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestionBn.trim() || !formOption0.trim() || !formOption1.trim() || !formOption2.trim() || !formOption3.trim()) {
      alert('দয়া করে প্রশ্ন ও ৪টি অপশন পূরণ করুন।');
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    const questionId = editingId || `custom-${formSubject}-${Date.now()}`;
    const newQuestion: Question = {
      id: questionId,
      subjectId: formSubject,
      subjectName: `${SUBJECT_METADATA[formSubject].nameEn} (${SUBJECT_METADATA[formSubject].nameBn})`,
      questionBn: formQuestionBn.trim(),
      questionEn: formQuestionEn.trim() || undefined,
      options: [formOption0.trim(), formOption1.trim(), formOption2.trim(), formOption3.trim()],
      correctIndex: formCorrectIndex,
      category: formCategory,
      chapter: formChapter.trim() || undefined,
      explanation: formExplanation.trim() || 'সঠিক উত্তরের ব্যাখ্যা অন্তর্ভুক্ত করা হয়েছে।',
      topic: formTopic.trim() || undefined
    };

    const saved = await saveQuestionToDb(newQuestion);
    setIsSaving(false);
    setSaveStatus(saved ? 'Firebase-এ সংরক্ষিত হয়েছে!' : 'সংরক্ষিত হয়েছে (স্থানীয় ব্যাকআপে)');

    setTimeout(() => {
      setSaveStatus(null);
      setIsAddingNew(false);
      onRefreshQuestions();
    }, 900);
  };

  const handleDeleteQuestion = async (qId: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই প্রশ্নটি মুছে ফেলতে চান?')) return;
    await deleteQuestionFromDb(qId);
    onRefreshQuestions();
  };

  // Get current questions list for selected subject
  const currentQuestions = (allQuestions[selectedSubject] || []).filter(q => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return q.questionBn.toLowerCase().includes(term) || 
      (q.questionEn && q.questionEn.toLowerCase().includes(term)) || 
      (q.chapter && q.chapter.toLowerCase().includes(term)) ||
      (q.topic && q.topic.toLowerCase().includes(term));
  });

  const subjectList: SubjectId[] = ['physics', 'chemistry', 'math', 'biology', 'bangla', 'english'];
  const chaptersForForm = HSC_CHAPTERS[formSubject as keyof typeof HSC_CHAPTERS] || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl border border-slate-300 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#006a4e] text-white flex items-center justify-center font-bold text-sm">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Admin Panel · প্রশ্ন যোগ ও ক্যাটাগরি নির্ধারণ
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-[#006a4e] border border-emerald-200 font-semibold flex items-center gap-1">
                  <Cloud className="w-3 h-3" />
                  Firebase Synced
                </span>
              </div>
              <p className="text-xs text-slate-500">
                জ্ঞানমূলক, অনুধাবনমূলক ও গাণিতিক ক্যাটাগরি এবং অধ্যায় নির্বাচন করে প্রশ্ন যোগ করুন।
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* If Adding or Editing Form is Open */}
          {isAddingNew ? (
            <form onSubmit={handleSaveQuestion} className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-300">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#006a4e]" />
                  <span>{editingId ? 'প্রশ্ন সম্পাদনা করুন' : 'নতুন প্রশ্ন যুক্ত করুন'}</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  বাতিল করুন
                </button>
              </div>

              {/* Subject, Category & Chapter Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Subject Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ১. বিষয়:
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => {
                      const newSub = e.target.value as SubjectId;
                      setFormSubject(newSub);
                      const defChap = HSC_CHAPTERS[newSub as keyof typeof HSC_CHAPTERS]?.[0]?.nameBn || '';
                      setFormChapter(defChap);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white text-slate-800"
                  >
                    {subjectList.map((sub) => (
                      <option key={sub} value={sub}>
                        {SUBJECT_METADATA[sub].nameEn} ({SUBJECT_METADATA[sub].nameBn})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Question Category (জ্ঞান / অনুধাবন / গাণিতিক) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ২. ক্যাটাগরি (জ্ঞান / অনুধাবন / গাণিতিক):
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as QuestionCategory)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white font-semibold text-slate-800"
                  >
                    <option value="knowledge">জ্ঞানমূলক (Knowledge)</option>
                    <option value="comprehension">অনুধাবনমূলক (Comprehension)</option>
                    <option value="math">গাণিতিক (Mathematical / Problem)</option>
                  </select>
                </div>

                {/* Chapter Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ৩. HSC অধ্যায় (Chapter):
                  </label>
                  {chaptersForForm.length > 0 ? (
                    <select
                      value={formChapter}
                      onChange={(e) => setFormChapter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white text-slate-800"
                    >
                      <option value="">সকল অধ্যায় / সাধারণ</option>
                      {chaptersForForm.map((c) => (
                        <option key={c.id} value={c.nameBn}>
                          {c.nameBn} ({c.paper})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formChapter}
                      onChange={(e) => setFormChapter(e.target.value)}
                      placeholder="e.g. ব্যাকরণ / Vocabulary"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white text-slate-800"
                    />
                  )}
                </div>
              </div>

              {/* Question Text in Bengali */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  প্রশ্ন (বাংলায়) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formQuestionBn}
                  onChange={(e) => setFormQuestionBn(e.target.value)}
                  placeholder="প্রশ্নের মূল বক্তব্য লিখুন..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white text-slate-800"
                />
              </div>

              {/* Question Text in English (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  প্রশ্ন (English Translation - ঐচ্ছিক):
                </label>
                <input
                  type="text"
                  value={formQuestionEn}
                  onChange={(e) => setFormQuestionEn(e.target.value)}
                  placeholder="Optional English version"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  ৪টি অপশন লিখুন ও সঠিক উত্তরের রেডিও বাটনে টিক দিন:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'ক (Option A)', val: formOption0, setVal: setFormOption0, idx: 0 },
                    { label: 'খ (Option B)', val: formOption1, setVal: setFormOption1, idx: 1 },
                    { label: 'গ (Option C)', val: formOption2, setVal: setFormOption2, idx: 2 },
                    { label: 'ঘ (Option D)', val: formOption3, setVal: setFormOption3, idx: 3 },
                  ].map((opt) => (
                    <div 
                      key={opt.idx}
                      className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                        formCorrectIndex === opt.idx 
                          ? 'border-[#006a4e] bg-emerald-50/50' 
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={formCorrectIndex === opt.idx}
                        onChange={() => setFormCorrectIndex(opt.idx)}
                        className="h-4 w-4 text-[#006a4e]"
                        title="সঠিক উত্তর হিসেবে চিহ্নিত করুন"
                      />
                      <span className="text-xs font-bold text-slate-500 shrink-0">
                        {opt.label}:
                      </span>
                      <input
                        type="text"
                        required
                        value={opt.val}
                        onChange={(e) => opt.setVal(e.target.value)}
                        placeholder="অপশনের টেক্সট"
                        className="w-full px-2 py-1 text-xs sm:text-sm bg-transparent border-0 focus:outline-none text-slate-800"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation (ব্যাখ্যা) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#006a4e]" />
                  <span>প্রশ্নের বিশদ ব্যাখ্যা ও নোট (Explanation):</span>
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="কেন এই উত্তরটি সঠিক? সমাধান, সূত্র বা প্রয়োজনীয় ব্যাখ্যা এখানে লিখুন..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white text-slate-800"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-emerald-700 font-semibold">
                  {saveStatus}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-100 text-slate-700"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-lg bg-[#006a4e] hover:bg-[#055740] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন (Save to Firebase)'}</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Question Pool Browser */
            <div className="space-y-4">
              {/* Controls: Subject Tabs, Search & Add Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {subjectList.map((sub) => {
                    const count = (allQuestions[sub] || []).length;
                    return (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubject(sub)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                          selectedSubject === sub
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {SUBJECT_METADATA[sub].nameEn} ({count})
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-44">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="খুঁজুন..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800"
                    />
                  </div>

                  <button
                    onClick={handleOpenAddForm}
                    className="px-3.5 py-1.5 rounded-lg bg-[#006a4e] hover:bg-[#055740] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>প্রশ্ন যোগ করুন</span>
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {currentQuestions.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    কোনো প্রশ্ন পাওয়া যায়নি। "প্রশ্ন যোগ করুন" বাটনে ক্লিক করে নতুন প্রশ্ন যোগ করুন।
                  </div>
                ) : (
                  currentQuestions.map((q, qIdx) => {
                    const catInfo = CATEGORY_LABELS[q.category || 'knowledge'];

                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors relative"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              #{qIdx + 1}
                            </span>
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${catInfo.color}`}>
                                  {catInfo.nameBn}
                                </span>
                                {q.chapter && (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
                                    <Tag className="w-2.5 h-2.5" />
                                    {q.chapter}
                                  </span>
                                )}
                              </div>
                              <h5 className="font-bold text-sm text-slate-900 leading-snug">
                                {q.questionBn}
                              </h5>
                              {q.questionEn && (
                                <p className="text-xs text-slate-500 italic mt-0.5">
                                  {q.questionEn}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Edit & Delete Controls */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleEditQuestion(q)}
                              className="p-1 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100"
                              title="সম্পাদনা করুন"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* 4 Options preview */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mt-2 pl-7">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-1.5 rounded border ${
                                oIdx === q.correctIndex
                                ? 'border-emerald-500 bg-emerald-50 font-semibold text-[#006a4e]'
                                : 'border-slate-200 text-slate-600 bg-slate-50/50'
                              }`}
                            >
                              <span className="font-bold mr-1">({['ক', 'খ', 'গ', 'ঘ'][oIdx]})</span>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>

                        {/* Explanation preview */}
                        {q.explanation && (
                          <div className="mt-2.5 pl-7 text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                            <span className="font-bold text-slate-700">ব্যাখ্যা: </span>
                            <span>{q.explanation}</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>মোট প্রশ্ন সংখ্যা: {Object.values(allQuestions).reduce((acc, list) => acc + list.length, 0)}টি</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
