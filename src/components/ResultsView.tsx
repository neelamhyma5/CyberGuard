import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Printer,
  Copy,
  Check,
  Key,
  Laptop,
  Fish,
  Database,
  Globe,
  Lock,
  Sparkles,
  Award,
  Bookmark,
  LogIn,
  BookmarkCheck,
} from 'lucide-react';
import { AssessmentResult, CategoryId, Recommendation } from '../types/assessment';
import { RecommendationModal } from './RecommendationModal';
import { useAuth } from '../context/AuthContext';
import { saveAssessmentToCloud } from '../services/assessmentStorage';

interface ResultsViewProps {
  result: AssessmentResult;
  answers?: Record<string, string>;
  onRestart: () => void;
  onExploreTips: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  answers = {},
  onRestart,
  onExploreTips,
}) => {
  const { user, signInWithGoogle } = useAuth();
  const [animatedScore, setAnimatedScore] = useState(0);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [copied, setCopied] = useState(false);
  const [categoryBarsLoaded, setCategoryBarsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Smooth counter animation
  useEffect(() => {
    let start = 0;
    const end = result.overallScore;
    if (end === 0) {
      setAnimatedScore(0);
      setCategoryBarsLoaded(true);
      return;
    }
    const duration = 1400; // ms
    const incrementTime = 25;
    const step = end / (duration / incrementTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
        setCategoryBarsLoaded(true);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [result.overallScore]);

  // SVG Circular calculation
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Calculate coordinates of the leading laser point on the circular progress ring
  const angleRad = (animatedScore / 100) * 2 * Math.PI - Math.PI / 2;
  const beadX = 80 + radius * Math.cos(angleRad);
  const beadY = 80 + radius * Math.sin(angleRad);

  const getScoreColor = (score: number) => {
    if (score >= 80) return { stroke: '#10b981', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
    if (score >= 60) return { stroke: '#0ea5e9', text: 'text-sky-400', badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30' };
    if (score >= 40) return { stroke: '#f59e0b', text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    return { stroke: '#f43f5e', text: 'text-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
  };

  const scoreTheme = getScoreColor(result.overallScore);

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Key':
        return <Key className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-sky-400" />;
      case 'Fish':
        return <Fish className="w-5 h-5 text-rose-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-teal-400" />;
      default:
        return <Lock className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleCopySummary = () => {
    const summaryText = `🛡️ My Cyber Hygiene Score: ${result.overallScore}/100 (${result.level})\n` +
      `Breakdown:\n` +
      `• Password Security: ${result.categoryScores.password.percentage}%\n` +
      `• Multi-Factor Auth: ${result.categoryScores.mfa.percentage}%\n` +
      `• Device Security: ${result.categoryScores.device.percentage}%\n` +
      `• Phishing Awareness: ${result.categoryScores.phishing.percentage}%\n` +
      `• Data Protection: ${result.categoryScores.backup.percentage}%\n` +
      `• Network Safety: ${result.categoryScores.network.percentage}%\n\n` +
      `Evaluated locally via CyberGuard`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToAccount = async () => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    setIsSaving(true);
    try {
      await saveAssessmentToCloud(user.uid, result, answers);
      setIsSaved(true);
    } catch (err) {
      console.error('Error saving assessment:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      {/* Header Section with subtle staggered entrance */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          OFFICIAL ASSESSMENT SUMMARY
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your Cyber Hygiene Report
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Here’s how your current security habits look and where you can improve.
        </p>
      </div>

      {/* Main Score & Overview Hero Card with Glowing Animated Gauge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="cyber-card rounded-3xl p-6 sm:p-10 border border-cyan-500/40 mb-12 shadow-[0_0_50px_-10px_rgba(0,245,255,0.25)] relative overflow-hidden"
      >
        {/* Subtle background ambient beam */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Circular Animated Score Gauge with Laser Tip */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center relative">
            {/* Ripple waves radiating out */}
            <div className="absolute w-52 h-52 rounded-full border border-cyan-500/25 animate-ripple pointer-events-none" />
            <div className="absolute w-52 h-52 rounded-full border border-indigo-400/20 animate-ripple [animation-delay:1.5s] pointer-events-none" />

            <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
              {/* Outer decorative ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-slate-700/60 animate-[spin_60s_linear_infinite]" />

              {/* Background circular track & Animated SVG Stroke */}
              <svg className="w-full h-full -rotate-90 transform p-2" viewBox="0 0 160 160">
                <defs>
                  <filter id="score-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="glow" />
                    <feComposite in="SourceGraphic" in2="glow" operator="over" />
                  </filter>
                </defs>
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={scoreTheme.stroke}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  filter="url(#score-glow)"
                  className="transition-all duration-300 ease-out"
                />
                {/* Glowing laser beacon at the tip of the score circle */}
                {animatedScore > 0 && (
                  <circle
                    cx={beadX}
                    cy={beadY}
                    r="4.5"
                    fill="#ffffff"
                    filter="drop-shadow(0 0 6px #00f5ff)"
                    className="transition-all duration-300 ease-out"
                  />
                )}
              </svg>

              {/* Central Counter Display with animated scale */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight font-mono tabular-nums text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {animatedScore}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1 font-semibold">
                  out of 100
                </span>
              </div>
            </div>

            {/* Score Tier Badge */}
            <div className="mt-4">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide border shadow-md ${scoreTheme.badge}`}>
                <Award className="w-3.5 h-3.5" />
                <span>{result.level} Cyber Hygiene</span>
              </span>
            </div>
          </div>

          {/* Right: Interpretation & Action Hub */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                Overall Defense Rating: {result.overallScore}/100
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {result.levelDescription}
              </p>
            </div>

            {/* Micro Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Criteria</div>
                <div className="text-lg font-bold text-white mt-0.5">{result.answeredCount} Questions</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Security Strengths</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                  <span>{result.strengths.length}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors col-span-2 sm:col-span-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Recommended Actions</div>
                <div className="text-lg font-bold text-cyan-400 mt-0.5 flex items-center gap-1">
                  <span>{result.recommendations.length}</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Action Bar with Save to Account feature */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              {/* Cloud Save Button */}
              {isSaved ? (
                <div className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Saved to Account!</span>
                </div>
              ) : user ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSaveToAccount}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00f5ff] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00f5ff] rounded-xl transition-all cursor-pointer shadow-md shadow-cyan-500/25"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save to Account'}</span>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSaveToAccount}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-400/40 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Log In to Save Report</span>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print / PDF</span>
              </motion.button>

              <button
                onClick={onRestart}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer ml-auto hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Breakdown Section with Staggered Entrance */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Category Breakdown</h3>
            <p className="text-xs text-slate-400 mt-0.5">Detailed evaluation across the six security domains</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(Object.keys(result.categoryScores) as CategoryId[]).map((catId, index) => {
            const cat = result.categoryScores[catId];
            return (
              <motion.div 
                key={catId} 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="cyber-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_25px_-5px_rgba(0,245,255,0.25)] transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-cyan-950/40 transition-all duration-300">
                      {renderCategoryIcon(cat.iconName)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-tight group-hover:text-cyan-300 transition-colors">{cat.name}</h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {cat.earnedPoints} / {cat.maxPoints} pts
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold tabular-nums px-2.5 py-0.5 rounded-full border ${
                      cat.percentage >= 80
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                        : cat.percentage >= 60
                        ? 'text-sky-400 bg-sky-500/10 border-sky-500/30'
                        : cat.percentage >= 40
                        ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                        : 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                    }`}
                  >
                    {cat.percentage}%
                  </span>
                </div>

                {/* Animated Laser Progress Bar */}
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden mt-3 relative p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                      cat.percentage >= 80
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_#10b981]'
                        : cat.percentage >= 60
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-400 shadow-[0_0_10px_#0ea5e9]'
                        : cat.percentage >= 40
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_10px_#f59e0b]'
                        : 'bg-gradient-to-r from-rose-500 to-red-400 shadow-[0_0_10px_#f43f5e]'
                    }`}
                    style={{ width: categoryBarsLoaded ? `${cat.percentage}%` : '0%' }}
                  />
                </div>

                <div className="mt-2.5 text-right">
                  <span className="text-[11px] font-medium text-slate-400">
                    Status: <strong className="text-slate-200">{cat.status}</strong>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: Strengths & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
        {/* Your Security Strengths (Left) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h3 className="text-xl font-bold text-white tracking-tight">Your Security Strengths</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Solid defensive practices already identified in your everyday routine:
          </p>

          <div className="space-y-3">
            {result.strengths.map((str, index) => (
              <motion.div
                key={str.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 3, transition: { duration: 0.15 } }}
                className="p-4 rounded-2xl bg-slate-900/70 border border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.2)] transition-colors group cursor-default"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-115 transition-transform">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">{str.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {str.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommended Improvements (Right) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="text-xl font-bold text-white tracking-tight">Recommended Improvements</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Prioritized actions to eliminate vulnerabilities and increase your score:
          </p>

          <div className="space-y-4">
            {result.recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="cyber-card rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_-5px_rgba(0,245,255,0.3)] transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{rec.title}</h4>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full w-fit border ${
                      rec.urgency === 'Critical'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : rec.urgency === 'Recommended'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    }`}
                  >
                    {rec.urgency} Priority
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {rec.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {rec.actionableSteps.length} action steps
                  </span>
                  <button
                    onClick={() => setSelectedRecommendation(rec)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-200 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Score Levels Framework Explainer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 mb-12">
        <h3 className="text-lg font-bold text-white mb-2">Understanding Cyber Hygiene Levels</h3>
        <p className="text-xs text-slate-400 mb-6">
          How score ranges correspond to practical digital vulnerability tiers:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
            <div className="text-xs font-mono font-bold text-rose-400 mb-1">0–39 · Needs Attention</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              High exposure to common automated attacks. Passwords reused across services, MFA missing, or unpatched devices.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
            <div className="text-xs font-mono font-bold text-amber-400 mb-1">40–59 · Developing</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Basic awareness in place, but significant blind spots remain in phishing defense, backup safety, or public Wi-Fi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-sky-500/20 hover:border-sky-500/40 transition-colors">
            <div className="text-xs font-mono font-bold text-sky-400 mb-1">60–79 · Good</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Above-average security. Protects against opportunistic threats. Elevating to MFA authenticators seals remaining gaps.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
            <div className="text-xs font-mono font-bold text-emerald-400 mb-1">80–100 · Strong</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Exemplary defense posture. Zero-knowledge vaults, robust 2FA, disk encryption, and high resistance to social engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA to Cybersecurity Tips */}
      <div className="text-center p-8 rounded-3xl cyber-card border border-cyan-500/30 shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-cyan-500/10 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">Want to deepen your security knowledge?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Explore our comprehensive guide of practical cybersecurity tips, cheat sheets, and checklists.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExploreTips}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <span>Explore Cyber Tips Guide</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Recommendation Modal */}
      <RecommendationModal
        recommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
        onExploreTips={onExploreTips}
      />
    </motion.div>
  );
};
