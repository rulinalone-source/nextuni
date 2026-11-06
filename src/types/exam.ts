export type SubjectId = 
  | 'physics' 
  | 'chemistry' 
  | 'math' 
  | 'biology' 
  | 'bangla' 
  | 'english';

export type QuestionCategory = 'knowledge' | 'comprehension' | 'math';

export const CATEGORY_LABELS: Record<QuestionCategory, { nameBn: string; nameEn: string; color: string }> = {
  knowledge: { nameBn: 'জ্ঞানমূলক', nameEn: 'Knowledge', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  comprehension: { nameBn: 'অনুধাবনমূলক', nameEn: 'Comprehension', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  math: { nameBn: 'গাণিতিক', nameEn: 'Mathematical / Problem', color: 'bg-amber-50 text-amber-800 border-amber-200' }
};

export interface SubjectInfo {
  id: SubjectId;
  nameEn: string;
  nameBn: string;
  category: 'compulsory' | 'main' | 'optional';
  iconName: string;
  color: string;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  subjectName: string;
  questionBn: string;
  questionEn?: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
  category?: QuestionCategory; // 'knowledge' (জ্ঞান), 'comprehension' (অনুধাবন), 'math' (গাণিতিক)
  chapter?: string;
  topic?: string;
}

export interface UserAnswer {
  questionId: string;
  subjectId: SubjectId;
  selectedOptionIndex: number | null; // null if unattempted
  isMarkedForReview: boolean;
  timeSpentSeconds?: number;
}

export interface SubjectResult {
  subjectId: SubjectId;
  subjectName: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unattemptedCount: number;
  mcqMarks: number; // correct - 0.25 * wrong
  writtenMarks: number;
  totalMarks: number;
  passed: boolean;
}

export interface ExamResult {
  id: string;
  candidateName: string;
  examRoll: string;
  unit: string; // e.g. "Science"
  timestamp: string;
  timeTakenSeconds: number;
  selectedSubjects: SubjectId[];
  mainSubject: SubjectId;
  optionalSubject: SubjectId;
  subjectResults: Record<SubjectId, SubjectResult>;
  totalCorrect: number;
  totalWrong: number;
  totalUnattempted: number;
  totalMcqMarks: number;
  scaledTotalMarks: number;
  isPassed: boolean;
  meritPosition: number;
  meritGroup: string;
  answers: Record<string, UserAnswer>;
  questions: Question[];
}
