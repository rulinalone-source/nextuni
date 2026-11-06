import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { Question, ExamResult, SubjectId } from './types/exam';
import { QUESTION_POOL } from './data/questionBank';

// Firebase configuration provided by user
export const firebaseConfig = {
  apiKey: "AIzaSyAL_F8_Idsbd_GJapbHOotJ9L6LzzQGrrY",
  authDomain: "nextvarsity-227c5.firebaseapp.com",
  databaseURL: "https://nextvarsity-227c5-default-rtdb.firebaseio.com",
  projectId: "nextvarsity-227c5",
  storageBucket: "nextvarsity-227c5.firebasestorage.app",
  messagingSenderId: "87766434487",
  appId: "1:87766434487:web:03d43595e2641e3d6d8332",
  measurementId: "G-0020TPYD0B"
};

// Initialize Firebase safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

const QUESTIONS_STORAGE_KEY = 'nextvarsity_custom_questions_v1';
const RESULTS_STORAGE_KEY = 'nextvarsity_du_exam_results_v1';

/**
 * Load questions: combines Firebase Firestore with default QUESTION_POOL
 * With graceful offline / permission fallback to localStorage.
 */
export async function loadAllQuestions(): Promise<Record<SubjectId, Question[]>> {
  // Start with a clone of the default pool
  const currentPool: Record<SubjectId, Question[]> = {
    physics: [...QUESTION_POOL.physics],
    chemistry: [...QUESTION_POOL.chemistry],
    math: [...QUESTION_POOL.math],
    biology: [...QUESTION_POOL.biology],
    bangla: [...QUESTION_POOL.bangla],
    english: [...QUESTION_POOL.english]
  };

  // Try loading custom questions from Firebase Firestore first
  try {
    const qSnapshot = await getDocs(collection(db, 'questions'));
    if (!qSnapshot.empty) {
      qSnapshot.forEach((docSnap) => {
        const qData = docSnap.data() as Question;
        if (qData.subjectId && currentPool[qData.subjectId]) {
          // Check if already in pool by ID; if so replace, else append
          const existingIdx = currentPool[qData.subjectId].findIndex(q => q.id === qData.id);
          if (existingIdx >= 0) {
            currentPool[qData.subjectId][existingIdx] = qData;
          } else {
            currentPool[qData.subjectId].push(qData);
          }
        }
      });
      return currentPool;
    }
  } catch (err) {
    console.warn('Firebase read error or offline, checking localStorage fallback:', err);
  }

  // Fallback to localStorage if Firebase is empty or pending rules
  try {
    const local = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (local) {
      const parsed: Question[] = JSON.parse(local);
      parsed.forEach((qData) => {
        if (qData.subjectId && currentPool[qData.subjectId]) {
          const existingIdx = currentPool[qData.subjectId].findIndex(q => q.id === qData.id);
          if (existingIdx >= 0) {
            currentPool[qData.subjectId][existingIdx] = qData;
          } else {
            currentPool[qData.subjectId].push(qData);
          }
        }
      });
    }
  } catch (e) {
    console.error('LocalStorage error:', e);
  }

  return currentPool;
}

/**
 * Save question to Firebase & localStorage
 */
export async function saveQuestionToDb(question: Question): Promise<boolean> {
  // Save to localStorage immediately
  try {
    const local = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    const existing: Question[] = local ? JSON.parse(local) : [];
    const idx = existing.findIndex(q => q.id === question.id);
    if (idx >= 0) {
      existing[idx] = question;
    } else {
      existing.push(question);
    }
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Error saving question to localStorage:', e);
  }

  // Attempt saving to Firebase Firestore
  try {
    await setDoc(doc(db, 'questions', question.id), {
      ...question,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.warn('Firebase write warning (saved locally):', err);
    return false;
  }
}

/**
 * Delete question from Firebase & localStorage
 */
export async function deleteQuestionFromDb(questionId: string): Promise<boolean> {
  // Remove from localStorage
  try {
    const local = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (local) {
      const existing: Question[] = JSON.parse(local);
      const filtered = existing.filter(q => q.id !== questionId);
      localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (e) {
    console.error('Error deleting from localStorage:', e);
  }

  // Attempt deleting from Firebase
  try {
    await deleteDoc(doc(db, 'questions', questionId));
    return true;
  } catch (err) {
    console.warn('Firebase delete warning (removed locally):', err);
    return false;
  }
}

/**
 * Store exam result to Firebase Firestore
 */
export async function storeExamResultToFirebase(result: ExamResult): Promise<void> {
  // Store locally
  try {
    const existing = localStorage.getItem(RESULTS_STORAGE_KEY);
    const list: ExamResult[] = existing ? JSON.parse(existing) : [];
    const updated = [result, ...list].slice(0, 30);
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving result locally:', e);
  }

  // Store to Firebase with a 2-second safety timeout so it never hangs
  try {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase timeout')), 2000));
    const writeOp = setDoc(doc(db, 'exam_results', result.id), {
      candidateName: result.candidateName,
      examRoll: result.examRoll,
      unit: result.unit,
      timestamp: result.timestamp,
      timeTakenSeconds: result.timeTakenSeconds,
      selectedSubjects: result.selectedSubjects,
      totalCorrect: result.totalCorrect,
      totalWrong: result.totalWrong,
      totalUnattempted: result.totalUnattempted,
      totalMcqMarks: result.totalMcqMarks,
      isPassed: result.isPassed,
      meritPosition: result.meritPosition
    });
    await Promise.race([writeOp, timeout]);
  } catch (err) {
    console.warn('Firebase store result warning (cached locally):', err);
  }
}
