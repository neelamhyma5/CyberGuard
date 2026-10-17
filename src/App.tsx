import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingView } from './components/LandingView';
import { AssessmentView } from './components/AssessmentView';
import { ResultsView } from './components/ResultsView';
import { TipsView } from './components/TipsView';
import { PrivacyModal } from './components/PrivacyModal';
import { CyberBackground } from './components/CyberBackground';
import { calculateCyberHygieneScore } from './utils/calculator';
import { AssessmentResult } from './types/assessment';
import { ASSESSMENT_QUESTIONS } from './data/questions';

const STORAGE_KEY_ANSWERS = 'cyberguard_answers_v1';
const STORAGE_KEY_RESULT = 'cyberguard_result_v1';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'assessment' | 'results' | 'tips'>('home');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANSWERS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [result, setResult] = useState<AssessmentResult | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESULT);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
    } catch {
      // ignore local storage errors
    }
  }, [answers]);

  useEffect(() => {
    try {
      if (result) {
        localStorage.setItem(STORAGE_KEY_RESULT, JSON.stringify(result));
      } else {
        localStorage.removeItem(STORAGE_KEY_RESULT);
      }
    } catch {
      // ignore
    }
  }, [result]);

  const handleStartAssessment = () => {
    const unansweredIdx = ASSESSMENT_QUESTIONS.findIndex((q) => !answers[q.id]);
    if (unansweredIdx !== -1) {
      setCurrentIndex(unansweredIdx);
    } else {
      setCurrentIndex(0);
    }
    setActiveView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));

    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, ASSESSMENT_QUESTIONS.length - 1));
      }, 260);
    }
  };

  const handleNext = () => {
    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSubmitAssessment = () => {
    const calculatedResult = calculateCyberHygieneScore(answers);
    setResult(calculatedResult);
    setActiveView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartAssessment = () => {
    setAnswers({});
    setResult(null);
    setCurrentIndex(0);
    try {
      localStorage.removeItem(STORAGE_KEY_ANSWERS);
      localStorage.removeItem(STORAGE_KEY_RESULT);
    } catch {
      // ignore
    }
    setActiveView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'home' | 'assessment' | 'results' | 'tips') => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 font-sans relative selection:bg-cyan-500/20 selection:text-cyan-200">
        {/* Living Cyber Ambient Background */}
        <CyberBackground />

        {/* Universal Top Bar */}
        <Navbar
          activeView={activeView}
          onNavigate={handleNavigate}
          hasCompletedAssessment={!!result}
          onRestartAssessment={handleRestartAssessment}
        />

        {/* Main View Router */}
        <main className="flex-1 flex flex-col relative z-10">
          {activeView === 'home' && (
            <LandingView
              onStartAssessment={handleStartAssessment}
              onExploreTips={() => handleNavigate('tips')}
            />
          )}

          {activeView === 'assessment' && (
            <AssessmentView
              currentIndex={currentIndex}
              answers={answers}
              onSelectOption={handleSelectOption}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onJumpToQuestion={handleJumpToQuestion}
              onSubmit={handleSubmitAssessment}
            />
          )}

          {activeView === 'results' && result && (
            <ResultsView
              result={result}
              answers={answers}
              onRestart={handleRestartAssessment}
              onExploreTips={() => handleNavigate('tips')}
            />
          )}

          {activeView === 'tips' && (
            <TipsView onStartAssessment={handleStartAssessment} />
          )}
        </main>

        {/* Universal Quiet Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onRestartAssessment={handleRestartAssessment}
        />

        {/* Privacy Notice Modal */}
        <PrivacyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
