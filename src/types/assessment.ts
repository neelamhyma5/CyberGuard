export type CategoryId = 'password' | 'mfa' | 'device' | 'phishing' | 'backup' | 'network';

export interface AnswerOption {
  id: string;
  label: string;
  subtext?: string;
  points: number; // 0 (poor), 1 (basic), 2 (good), 3 (exemplary)
}

export interface Question {
  id: string;
  category: CategoryId;
  categoryTitle: string;
  categoryIconName: string;
  title: string;
  contextNote?: string;
  options: AnswerOption[];
}

export interface CategoryScore {
  id: CategoryId;
  name: string;
  iconName: string;
  earnedPoints: number;
  maxPoints: number;
  percentage: number;
  status: 'Strong' | 'Good' | 'Developing' | 'Needs Attention';
}

export interface SecurityStrength {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
}

export interface Recommendation {
  id: string;
  title: string;
  category: CategoryId;
  urgency: 'Critical' | 'Recommended' | 'Best Practice';
  description: string;
  actionableSteps: string[];
  whyItMatters: string;
}

export interface AssessmentResult {
  overallScore: number;
  level: 'Needs Attention' | 'Developing' | 'Good' | 'Strong';
  levelDescription: string;
  categoryScores: Record<CategoryId, CategoryScore>;
  strengths: SecurityStrength[];
  recommendations: Recommendation[];
  answeredCount: number;
  totalQuestions: number;
  completedAt: string;
}
