import React from 'react';
import { X, ShieldCheck, EyeOff, Cpu, Lock, Check } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl cyber-card rounded-2xl border border-cyan-500/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close Privacy Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 id="privacy-modal-title" className="text-xl font-bold text-white tracking-tight">
              Your Privacy Matters
            </h2>
            <span className="text-xs text-slate-400">Security Architecture & Privacy Policy</span>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed mb-6">
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200">
            <strong>Educational Self-Check Notice:</strong> This assessment is designed as an educational self-check. Do not enter passwords, financial information, or other highly sensitive credentials. All computations take place strictly inside your local browser runtime.
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <EyeOff className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-xs uppercase tracking-wider font-mono">
                  Zero Credential Collection
                </strong>
                <span className="text-xs text-slate-400">
                  We never ask for actual passwords, pins, secret questions, or account identifiers. Questions evaluate behavioral habits only.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-xs uppercase tracking-wider font-mono">
                  100% Local Browser Execution
                </strong>
                <span className="text-xs text-slate-400">
                  Scores and recommendations are computed in JavaScript on your client machine. No survey responses are transmitted to remote analytics servers or third-party brokers.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-xs uppercase tracking-wider font-mono">
                  No Tracking Pixels or Marketing Cookies
                </strong>
                <span className="text-xs text-slate-400">
                  This application does not load third-party ad networks, telemetry trackers, or fingerprinting scripts.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
