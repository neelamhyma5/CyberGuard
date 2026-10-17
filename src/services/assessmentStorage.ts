import { collection, doc, setDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';
import { AssessmentResult } from '../types/assessment';

export interface SavedAssessment {
  id: string;
  userId: string;
  overallScore: number;
  level: string;
  answers: Record<string, string>;
  completedAt: string;
}

export async function saveAssessmentToCloud(
  userId: string,
  result: AssessmentResult,
  answers: Record<string, string>
): Promise<string> {
  const assessmentId = `assess_${Date.now()}`;
  const path = `users/${userId}/assessments/${assessmentId}`;

  const payload: SavedAssessment = {
    id: assessmentId,
    userId,
    overallScore: result.overallScore,
    level: result.level,
    answers,
    completedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'users', userId, 'assessments', assessmentId), payload);
    return assessmentId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserAssessments(userId: string): Promise<SavedAssessment[]> {
  const path = `users/${userId}/assessments`;
  try {
    const q = query(collection(db, 'users', userId, 'assessments'), orderBy('completedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => docSnap.data() as SavedAssessment);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}
