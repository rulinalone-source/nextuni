import { ExamResult, Question, SubjectId, SubjectResult, UserAnswer } from '../types/exam';
import { SUBJECT_METADATA } from '../data/questionBank';

export function calculateExamResult(
  candidateName: string,
  examRoll: string,
  selectedSubjects: SubjectId[],
  mainSubject: SubjectId,
  optionalSubject: SubjectId,
  questions: Question[],
  answers: Record<string, UserAnswer>,
  timeTakenSeconds: number
): ExamResult {
  const subjectResults: Record<SubjectId, SubjectResult> = {} as any;
  let totalCorrect = 0;
  let totalWrong = 0;
  let totalUnattempted = 0;
  let totalMcqMarks = 0;

  for (const subId of selectedSubjects) {
    const subQuestions = questions.filter(q => q.subjectId === subId);
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    for (const q of subQuestions) {
      const ans = answers[q.id];
      if (!ans || ans.selectedOptionIndex === null) {
        unattempted++;
      } else if (ans.selectedOptionIndex === q.correctIndex) {
        correct++;
      } else {
        wrong++;
      }
    }

    // DU Negative marking: +1 for correct, -0.25 for wrong
    const mcqMarks = Math.max(0, correct * 1.0 - wrong * 0.25);
    const subName = SUBJECT_METADATA[subId]?.nameEn || subId;

    subjectResults[subId] = {
      subjectId: subId,
      subjectName: subName,
      totalQuestions: subQuestions.length,
      correctCount: correct,
      wrongCount: wrong,
      unattemptedCount: unattempted,
      mcqMarks: Number(mcqMarks.toFixed(2)),
      writtenMarks: 0,
      totalMarks: Number(mcqMarks.toFixed(2)),
      passed: mcqMarks >= 1.5
    };

    totalCorrect += correct;
    totalWrong += wrong;
    totalUnattempted += unattempted;
    totalMcqMarks += mcqMarks;
  }

  // DU Ka Unit minimum pass mark: 40% (8 out of 20 MCQ)
  const isPassed = totalMcqMarks >= 8.0;

  // Total marks purely MCQ out of 20.00
  const finalScore = Number(totalMcqMarks.toFixed(2));

  // Compute realistic merit rank among ~35,000 applicants
  const meritPosition = calculateMeritPosition(totalMcqMarks, 20);

  const result: ExamResult = {
    id: 'du-res-' + Date.now(),
    candidateName: candidateName.trim() || 'DU Aspirant',
    examRoll: examRoll.trim() || String(Math.floor(1000000 + Math.random() * 900000)),
    unit: 'Science',
    timestamp: new Date().toISOString(),
    timeTakenSeconds,
    selectedSubjects,
    mainSubject,
    optionalSubject,
    subjectResults,
    totalCorrect,
    totalWrong,
    totalUnattempted,
    totalMcqMarks: finalScore,
    scaledTotalMarks: finalScore,
    isPassed,
    meritPosition,
    meritGroup: 'Science',
    answers,
    questions
  };

  saveResultToStorage(result);
  return result;
}

/**
 * Realistic merit curve for DU Science A-Unit (approx 35,000 candidates)
 */
function calculateMeritPosition(mcqScore: number, maxScore: number): number {
  const percentage = (mcqScore / maxScore) * 100;

  if (percentage >= 95) {
    return Math.floor(1 + Math.random() * 50); // Rank 1-50
  } else if (percentage >= 85) {
    return Math.floor(51 + Math.random() * 250); // Rank 51-300
  } else if (percentage >= 75) {
    return Math.floor(301 + Math.random() * 600); // Rank 301-900 (matches image ~869!)
  } else if (percentage >= 65) {
    return Math.floor(901 + Math.random() * 1100); // Rank 901-2000
  } else if (percentage >= 50) {
    return Math.floor(2001 + Math.random() * 3000); // Rank 2001-5000
  } else if (percentage >= 40) {
    return Math.floor(5001 + Math.random() * 5000); // Rank 5001-10000
  } else {
    return Math.floor(10001 + Math.random() * 15000); // Rank 10001+
  }
}

const STORAGE_KEY = 'nextvarsity_du_exam_results_v1';

export function saveResultToStorage(result: ExamResult): void {
  try {
    const existing = getStoredResults();
    const updated = [result, ...existing].slice(0, 20); // keep last 20
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save result to local storage', err);
  }
}

export function getStoredResults(): ExamResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
