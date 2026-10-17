import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import {
  Key,
  ShieldCheck,
  Laptop,
  Fish,
  Database,
  Globe,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../data/questions';

interface AssessmentViewProps {
  currentIndex: number;
  answers: Record<string, string>;
  onSelectOption: (questionId: string, optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onJumpToQuestion: (index: number) => void;
  onSubmit: () => void;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.985,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    scale: 0.985,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const optionsContainerVariants: Variants = {
  enter: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
};

const optionItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  currentIndex,
  answers,
  onSelectOption,
  onNext,
  onPrevious,
  onJumpToQuestion,
  onSubmit,
}) => {
  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentSelectedOption = answers[currentQuestion.id];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const [direction, setDirection] = useState<number>(1);
  const [justSelected, setJustSelected] = useState<string | null>(null);

  const handleNextWithDirection = useCallback(() => {
    setDirection(1);
    onNext();
  }, [onNext]);

  const handlePreviousWithDirection = useCallback(() => {
    setDirection(-1);
    onPrevious();
  }, [onPrevious]);

  const handleJumpWithDirection = (targetIndex: number) => {
    setDirection(targetIndex >= currentIndex ? 1 : -1);
    onJumpToQuestion(targetIndex);
  };

  const handleOptionClick = (optionId: string) => {
    setJustSelected(optionId);
    setDirection(1);
    onSelectOption(currentQuestion.id, optionId);
    setTimeout(() => setJustSelected(null), 400);
  };

  // Keyboard navigation support for options 1, 2, 3, 4 and Arrow keys
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (currentQuestion.options[optionIndex]) {
          handleOptionClick(currentQuestion.options[optionIndex].id);
        }
      } else if (e.key === 'ArrowRight' && currentSelectedOption) {
        if (isLastQuestion) {
          onSubmit();
        } else {
          handleNextWithDirection();
        }
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handlePreviousWithDirection();
      }
    },
    [currentQuestion, currentSelectedOption, isLastQuestion, currentIndex, handleNextWithDirection, handlePreviousWithDirection, onSubmit]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Key':
        return <Key className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_8px_#00f5ff]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-indigo-400 drop-shadow-[0_0_8px_#818cf8]" />;
      case 'Laptop':
        return <Laptop className="w-4 h-4 text-sky-400 drop-shadow-[0_0_8px_#38bdf8]" />;
      case 'Fish':
        return <Fish className="w-4 h-4 text-rose-400 drop-shadow-[0_0_8px_#f43f5e]" />;
      case 'Database':
        return <Database className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_8px_#10b981]" />;
      case 'Globe':
        return <Globe className="w-4 h-4 text-teal-400 drop-shadow-[0_0_8px_#14b8a6]" />;
      default:
        return <Lock className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_8px_#00f5ff]" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Top Header & Progress */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Cyber Hygiene Assessment
            </h1>
            <div className="flex items-center gap-2 mt-1.5 text-sm text-slate-300">
              <span className="font-mono text-cyan-300 font-bold tabular-nums drop-shadow-[0_0_8px_rgba(0,245,255,0.4)]">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5 text-slate-200">
                {renderCategoryIcon(currentQuestion.categoryIconName)}
                <span className="font-semibold">{currentQuestion.categoryTitle}</span>
              </span>
            </div>
          </div>

          <div className="text-right flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-lg border border-cyan-400/50 tabular-nums shadow-[0_0_15px_rgba(0,245,255,0.25)]">
              {progressPercent}% Completed
            </span>
          </div>
        </div>

        {/* Enhanced Animated Progress Bar with Glowing Laser Tip */}
        <div className="relative w-full h-3 bg-slate-950 rounded-full p-0.5 border border-cyan-500/25 shadow-inner overflow-visible">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#818cf8] rounded-full relative shadow-[0_0_15px_rgba(0,245,255,0.9)]"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Glowing Laser Plasma Head at the leading tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#00f5ff] flex items-center justify-center animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
          </motion.div>
        </div>

        {/* Step dots navigation with active wave pulse */}
        <div className="flex items-center justify-between gap-1.5 mt-4 px-1">
          {ASSESSMENT_QUESTIONS.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => handleJumpWithDirection(idx)}
                title={`Jump to Question ${idx + 1}: ${q.categoryTitle}`}
                className={`relative h-2 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#00f5ff] h-2.5 shadow-[0_0_12px_#00f5ff]'
                    : isAnswered
                    ? 'bg-cyan-600/80 hover:bg-cyan-400'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Question ${idx + 1}`}
              >
                {isCurrent && (
                  <span className="absolute -top-1 -bottom-1 -left-0.5 -right-0.5 rounded-full border border-cyan-400 animate-ping pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card with Framer Motion AnimatePresence entrance & exit */}
      <div className="relative min-h-[460px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="cyber-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative shadow-2xl overflow-hidden"
          >
            {/* Top scanning laser edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#00f5ff]" />

            {/* Category tag & Index */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 tracking-wider uppercase">
                {renderCategoryIcon(currentQuestion.categoryIconName)}
                <span>{currentQuestion.categoryTitle}</span>
              </div>
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Q{currentIndex + 1} of {totalQuestions}
              </span>
            </div>

            {/* Question Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3 text-balance">
              {currentQuestion.title}
            </h2>

            {/* Context Explainer */}
            {currentQuestion.contextNote && (
              <div className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/90 p-4 rounded-2xl border border-cyan-500/20 mb-8 shadow-sm">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{currentQuestion.contextNote}</span>
              </div>
            )}

            {/* Staggered Clickable Options with Micro-Animations */}
            <motion.div 
              variants={optionsContainerVariants}
              initial="hidden"
              animate="enter"
              className="space-y-3.5 mb-8" 
              role="radiogroup" 
              aria-label={currentQuestion.title}
            >
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentSelectedOption === option.id;
                const wasJustClicked = justSelected === option.id;

                return (
                  <motion.button
                    key={option.id}
                    variants={optionItemVariants}
                    onClick={() => handleOptionClick(option.id)}
                    whileHover={{ scale: 1.012, x: 5 }}
                    whileTap={{ scale: 0.988 }}
                    role="radio"
                    aria-checked={isSelected}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/20 via-slate-900/90 to-indigo-950/40 border-[#00f5ff] text-white shadow-[0_0_35px_-5px_rgba(0,245,255,0.45)]'
                        : 'bg-slate-900/60 hover:bg-slate-800/70 border-slate-800 hover:border-cyan-500/40 text-slate-200'
                    } ${wasJustClicked ? 'ring-2 ring-cyan-300 shadow-[0_0_35px_rgba(0,245,255,0.6)]' : ''}`}
                  >
                    {/* Visual Indicator / Key number badge */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#00f5ff] text-slate-950 shadow-[0_0_15px_#00f5ff] scale-110'
                          : 'bg-slate-800 border border-slate-700 text-slate-300 group-hover:border-slate-600'
                      }`}
                    >
                      {isSelected ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -25 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-slate-950 font-black" />
                        </motion.div>
                      ) : (
                        idx + 1
                      )}
                    </div>

                    {/* Option text */}
                    <div className="flex-1">
                      <div className={`text-sm sm:text-base font-semibold leading-snug ${isSelected ? 'text-cyan-200' : 'text-slate-100'}`}>
                        {option.label}
                      </div>
                      {option.subtext && (
                        <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {option.subtext}
                        </div>
                      )}
                    </div>

                    {/* Keyboard shortcut hint */}
                    <div className="hidden sm:flex items-center text-[10px] font-mono text-slate-400 opacity-60 self-center border border-slate-700/80 rounded px-1.5 py-0.5">
                      key {idx + 1}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                onClick={handlePreviousWithDirection}
                disabled={currentIndex === 0}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed text-slate-600'
                    : 'text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 cursor-pointer active:scale-95'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {isLastQuestion ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSubmit}
                  disabled={!currentSelectedOption}
                  className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 ${
                    currentSelectedOption
                      ? 'text-slate-950 bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#818cf8] hover:from-[#38bdf8] hover:to-[#00f5ff] shadow-[0_0_25px_rgba(0,245,255,0.45)] hover:shadow-[0_0_35px_rgba(0,245,255,0.65)] cursor-pointer'
                      : 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-800'
                  }`}
                >
                  <span>View Results</span>
                  <Sparkles className="w-4 h-4 animate-spin [animation-duration:8s]" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNextWithDirection}
                  disabled={!currentSelectedOption}
                  className={`inline-flex items-center gap-2 px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    currentSelectedOption
                      ? 'text-slate-950 bg-[#00f5ff] hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.4)] cursor-pointer'
                      : 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-800'
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Local Privacy Reassurance Note */}
      <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
        <Lock className="w-3.5 h-3.5 text-cyan-400" />
        <span>Your answers are evaluated locally in your browser and are not sent to any server.</span>
      </div>
    </div>
  );
};
