import React, { useState, useEffect, useRef } from 'react';
import { SubjectId, Question, UserAnswer, ExamResult } from './types/exam';
import { calculateExamResult, getStoredResults } from './utils/examUtils';
import { loadAllQuestions, storeExamResultToFirebase } from './firebase';
import { generateExamQuestions } from './data/questionBank';
import { Header } from './components/Header';
import { SubjectSelector } from './components/SubjectSelector';
import { ExamScreen } from './components/ExamScreen';
import { ResultScreen } from './components/ResultScreen';
import { SolutionReview } from './components/SolutionReview';
import { ExamHistoryModal } from './components/ExamHistoryModal';
import { InstructionsModal } from './components/InstructionsModal';
import { AdminQuestionModal } from './components/AdminQuestionModal';

export default function App() {
  type ViewState = 'select' | 'exam' | 'result' | 'review';

  const [viewState, setViewState] = useState<ViewState>('select');
  const [candidateName, setCandidateName] = useState<string>('Md. Rafiqul Islam');
  const [examRoll, setExamRoll] = useState<string>('1142715');
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>(['physics', 'chemistry', 'math', 'biology']);
  const [mainSubject, setMainSubject] = useState<SubjectId>('math');
  const [optionalSubject, setOptionalSubject] = useState<SubjectId>('biology');
  
  // All questions loaded from Firebase & defaults
  const [allQuestions, setAllQuestions] = useState<Record<SubjectId, Question[]>>({
    physics: [],
    chemistry: [],
    math: [],
    biology: [],
    bangla: [],
    english: []
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentResult, setCurrentResult] = useState<ExamResult | null>(null);
  
  // Timer state (20 minutes = 1200 seconds)
  const TOTAL_SECONDS = 20 * 60;
  const [timeRemaining, setTimeRemaining] = useState<number>(TOTAL_SECONDS);

  // History and Modals
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [instructionsOpen, setInstructionsOpen] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Keep latest answers in a ref for auto-submit
  const currentAnswersRef = useRef<Record<string, UserAnswer>>({});

  // Fetch all questions from Firebase on mount
  const refreshQuestionPool = async () => {
    const loaded = await loadAllQuestions();
    setAllQuestions(loaded);
  };

  useEffect(() => {
    refreshQuestionPool();
  }, []);

  // Active Timer countdown effect while in exam
  useEffect(() => {
    if (viewState !== 'exam') return;

    const intervalId = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          // Auto submit when time runs out
          handleSubmitExam(currentAnswersRef.current, TOTAL_SECONDS);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [viewState]);

  // Load history on mount
  useEffect(() => {
    setHistory(getStoredResults());
  }, []);

  const handleStartExam = (
    name: string,
    roll: string,
    subjects: SubjectId[],
    mainSub: SubjectId,
    optSub: SubjectId,
    chapterSelections?: Partial<Record<SubjectId, string[]>>
  ) => {
    setCandidateName(name);
    setExamRoll(roll);
    setSelectedSubjects(subjects);
    setMainSubject(mainSub);
    setOptionalSubject(optSub);

    // Reset and start 20 min timer
    setTimeRemaining(TOTAL_SECONDS);

    // Pick 5 questions per chosen subject using intelligent category balancing and chapter filtering
    const generated = generateExamQuestions(subjects, allQuestions, chapterSelections);
    setQuestions(generated);

    // Initialize empty answers
    const initialAnswers: Record<string, UserAnswer> = {};
    for (const q of generated) {
      initialAnswers[q.id] = {
        questionId: q.id,
        subjectId: q.subjectId,
        selectedOptionIndex: null,
        isMarkedForReview: false,
      };
    }
    currentAnswersRef.current = initialAnswers;

    setViewState('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitExam = (answers: Record<string, UserAnswer>, timeTakenSeconds: number) => {
    try {
      const calculatedResult = calculateExamResult(
        candidateName,
        examRoll,
        selectedSubjects,
        mainSubject,
        optionalSubject,
        questions,
        answers,
        timeTakenSeconds
      );

      // Immediately display result without blocking
      setCurrentResult(calculatedResult);
      setHistory(getStoredResults());
      setViewState('result');
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Store to Firebase in background
      storeExamResultToFirebase(calculatedResult).catch((err) => {
        console.warn('Firebase store error:', err);
      });
    } catch (err) {
      console.error('Error submitting exam:', err);
    }
  };

  const handleRetakeExam = () => {
    setViewState('select');
    setCurrentResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryResult = (item: ExamResult) => {
    setCurrentResult(item);
    setViewState('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('nextvarsity_du_exam_results_v1');
      setHistory([]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <Header
        examActive={viewState === 'exam'}
        timeRemaining={timeRemaining}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenInstructions={() => setInstructionsOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onResetExam={() => {
          if (viewState !== 'exam' || window.confirm('পরীক্ষা বাতিল করে হোম পেজে ফিরে যেতে চান?')) {
            setViewState('select');
          }
        }}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {viewState === 'select' && (
          <SubjectSelector onStartExam={handleStartExam} />
        )}

        {viewState === 'exam' && questions.length > 0 && (
          <ExamScreen
            questions={questions}
            selectedSubjects={selectedSubjects}
            candidateName={candidateName}
            examRoll={examRoll}
            timeRemaining={timeRemaining}
            onSubmitExam={handleSubmitExam}
          />
        )}

        {viewState === 'result' && currentResult && (
          <ResultScreen
            result={currentResult}
            onRetakeExam={handleRetakeExam}
            onViewSolutions={() => setViewState('review')}
          />
        )}

        {viewState === 'review' && currentResult && (
          <SolutionReview
            result={currentResult}
            onBackToResult={() => setViewState('result')}
          />
        )}
      </main>

      {/* Clean, Simple Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-5 mt-10">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-700">
            NextVarsity · Dhaka University Science (Ka Unit) MCQ Practice Platform
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Physics, Chemistry (Compulsory) + Main Subject (Math/Biology) + 4th Subject (Biology/Math/Bangla/English)
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AdminQuestionModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        allQuestions={allQuestions}
        onRefreshQuestions={refreshQuestionPool}
      />

      <ExamHistoryModal
        history={history}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectResult={handleSelectHistoryResult}
        onClearHistory={handleClearHistory}
      />

      <InstructionsModal
        isOpen={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
      />
    </div>
  );
}
