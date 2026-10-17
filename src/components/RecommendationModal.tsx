import React from 'react';
import { X, CheckCircle, AlertTriangle, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { Recommendation } from '../types/assessment';

interface RecommendationModalProps {
  recommendation: Recommendation | null;
  onClose: () => void;
  onExploreTips: () => void;
}

export const RecommendationModal: React.FC<RecommendationModalProps> = ({
  recommendation,
  onClose,
  onExploreTips,
}) => {
  if (!recommendation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl cyber-card rounded-2xl border border-cyan-500/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rec-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close Guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                recommendation.urgency === 'Critical'
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  : recommendation.urgency === 'Recommended'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              }`}
            >
              {recommendation.urgency} Priority
            </span>
          </div>
          <h2 id="rec-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {recommendation.title}
          </h2>
        </div>

        {/* Why It Matters */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Why This Matters</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {recommendation.whyItMatters}
          </p>
        </div>

        {/* Step-by-Step Action Plan */}
        <div className="mb-6">
          <h3 className="text-sm font-mono font-semibold text-slate-200 uppercase tracking-wider mb-3">
            Implementation Action Plan
          </h3>
          <div className="space-y-3">
            {recommendation.actionableSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80">
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 text-xs font-mono font-bold">
                  {index + 1}
                </div>
                <div className="text-sm text-slate-200 leading-relaxed pt-0.5">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onExploreTips();
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>Read more security habits in Cyber Tips</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
