import React from 'react';
import { Shield, Lock, RotateCcw } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'assessment' | 'results' | 'tips') => void;
  onOpenPrivacy: () => void;
  onRestartAssessment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPrivacy,
  onRestartAssessment,
}) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#040711] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Cyber Hygiene Score Calculator
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Understand your security habits. Improve your digital safety.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => onNavigate('tips')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Cybersecurity Tips
            </button>
            <button
              onClick={onRestartAssessment}
              className="hover:text-cyan-400 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restart Assessment</span>
            </button>
          </nav>
        </div>

        {/* Quiet Bottom Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Built with modern security frameworks (NIST CSF, CIS Benchmarks & CISA guidelines).
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <Lock className="w-3 h-3 text-cyan-400" />
            <span>100% Client-Side Evaluation · Zero Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
