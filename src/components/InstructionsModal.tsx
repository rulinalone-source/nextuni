import React from 'react';
import { X, CheckCircle2, AlertCircle, Clock, BookOpen, Award } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#746294] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg font-display">
                ঢাকা বিশ্ববিদ্যালয় ভর্তি পরীক্ষা নির্দেশিকা (DU Ka-Unit Instructions)
              </h3>
              <p className="text-xs text-slate-500">
                NextVarsity বিজ্ঞান অনুষদ MCQ পরীক্ষার নিয়মাবলী ও শর্তসমূহ
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

        {/* Content */}
        <div className="py-5 space-y-5 text-xs sm:text-sm text-slate-700">
          {/* Section 1: Subject Selection */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#006a4e]" />
              ১. বিষয় নির্বাচন ও বিন্যাস (Subject Structure)
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>
                <strong className="text-slate-800">আবশ্যিক বিষয় (Compulsory):</strong> পদার্থবিজ্ঞান (Physics) ও রসায়ন (Chemistry) – উভয়েই বাধ্যতামূলক (প্রতিটিতে ৫টি করে মোট ১০টি প্রশ্ন)।
              </li>
              <li>
                <strong className="text-slate-800">মূল বিষয় (Main Subject):</strong> উচ্চতর গণিত (Higher Math) অথবা জীববিজ্ঞান (Biology) থেকে যেকোনো একটি নির্বাচন করতে হবে (৫টি প্রশ্ন)।
              </li>
              <li>
                <strong className="text-slate-800">৪র্থ বিষয় / ঐচ্ছিক (4th / Optional):</strong> অপর মূল বিষয়, অথবা বাংলা (Bangla), অথবা ইংরেজি (English) থেকে যেকোনো একটি বিষয় উত্তর করতে হবে (৫টি প্রশ্ন)।
              </li>
              <li>
                <strong className="text-slate-800">মোট প্রশ্ন:</strong> ৪টি বিষয় × ৫ = ২০টি MCQ প্রশ্ন।
              </li>
            </ul>
          </div>

          {/* Section 2: Time & Marks */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c27803]" />
              ২. সময়সীমা ও মূল্যায়ন পদ্ধতি (Time & Negative Marking)
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
              <li>
                <strong className="text-slate-800">সময়সীমা:</strong> ২০টি প্রশ্নের জন্য নির্ধারিত সময় ২০ মিনিট (১২০০ সেকেন্ড)। সময় শেষ হলে স্বয়ংক্রিয়ভাবে খাতা জমা হয়ে যাবে।
              </li>
              <li>
                <strong className="text-slate-800">সঠিক উত্তর:</strong> প্রতিটি সঠিক উত্তরের জন্য পাবেন <span className="font-bold text-[#006a4e]">+১.০০</span> নম্বর।
              </li>
              <li>
                <strong className="text-slate-800">ভুল উত্তর (নেগেটিভ মার্কিং):</strong> প্রতিটি ভুল উত্তরের জন্য <span className="font-bold text-[#c8102e]">-০.২৫</span> নম্বর কাটা যাবে।
              </li>
              <li>
                <strong className="text-slate-800">ফাঁকা প্রশ্ন:</strong> কোনো প্রশ্ন উত্তর না দিলে কোনো নম্বর কাটা যাবে না (০.০০)।
              </li>
              <li>
                <strong className="text-slate-800">পাস মার্ক:</strong> নূন্যতম ৪০% নম্বর (২০ নম্বরের মধ্যে ৮.০০ নম্বর) পেতে হবে।
              </li>
            </ul>
          </div>

          {/* Section 3: The 3 Theme Colors */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              ৩. ৩টি নির্দেশক রঙের অর্থ (Indicator Theme Colors)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
                <span className="w-4 h-4 rounded-sm bg-[#006a4e] inline-block mb-1"></span>
                <span className="block font-bold text-[#006a4e]">সবুজ (Green)</span>
                <span className="text-[11px] text-slate-600">উত্তর দেওয়া সম্পন্ন ও পাস</span>
              </div>
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-center">
                <span className="w-4 h-4 rounded-sm bg-[#c8102e] inline-block mb-1"></span>
                <span className="block font-bold text-[#c8102e]">লাল (Red)</span>
                <span className="text-[11px] text-slate-600">দেখা হয়েছে কিন্তু অনুত্তরিত / নেগেটিভ</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-center">
                <span className="w-4 h-4 rounded-sm bg-[#d97706] inline-block mb-1"></span>
                <span className="block font-bold text-[#d97706]">অ্যাম্বার (Amber)</span>
                <span className="text-[11px] text-slate-600">রিভিউয়ের জন্য চিহ্নিত / বিস্তারিত রেজাল্ট</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors"
          >
            বুঝেছি, বন্ধ করুন (Got it)
          </button>
        </div>
      </div>
    </div>
  );
};
