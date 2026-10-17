import React, { useState, useMemo } from 'react';
import {
  Key,
  ShieldCheck,
  Laptop,
  Fish,
  Database,
  Globe,
  Lock,
  Search,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CYBER_TIPS } from '../data/tips';

interface TipsViewProps {
  onStartAssessment: () => void;
}

export const TipsView: React.FC<TipsViewProps> = ({ onStartAssessment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Account Security', 'Device Security', 'Phishing Protection', 'Data Protection', 'Internet & Network Safety'];

  const filteredTips = useMemo(() => {
    return CYBER_TIPS.filter((tip) => {
      const matchesCat = selectedCategory === 'All' || tip.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.actionItems.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tip.proTip.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Key':
        return <Key className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-indigo-400" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-sky-400" />;
      case 'Fish':
        return <Fish className="w-5 h-5 text-indigo-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Globe':
      case 'Wifi':
        return <Globe className="w-5 h-5 text-teal-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          SECURITY HYGIENE PLAYBOOK
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Practical Cybersecurity Tips
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Actionable, high-impact defense habits designed to protect your accounts, devices, and personal information.
        </p>
      </div>

      {/* Filter and Search Bar with animated active states */}
      <div className="cyber-card rounded-2xl p-4 sm:p-5 mb-10 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/30 scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tips, tools, threats..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Tip Cards Grid with animated entrance and hover lifts */}
      {filteredTips.length === 0 ? (
        <div className="text-center py-16 cyber-card rounded-2xl p-8 border border-slate-800">
          <p className="text-slate-400 text-sm">No security tips matched your search query "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className="cyber-card rounded-3xl p-6 sm:p-7 border border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)] transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 group"
            >
              <div>
                {/* Category & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-cyan-950/40 transition-all duration-200">
                      {renderIcon(tip.iconName)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        {tip.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-cyan-200 transition-colors">
                        {tip.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {tip.summary}
                </p>

                {/* Checklist Action Items */}
                <div className="space-y-2.5 mb-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Action Checklist
                  </div>
                  {tip.actionItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Pro Tip & Threat Vector Callout */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">Threat Vector:</span>
                  <span className="text-slate-200 font-semibold">{tip.threatVector}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/20 flex items-start gap-2.5 text-xs text-slate-300 shadow-sm">
                  <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="font-bold text-cyan-300">Pro Tip: </span>
                    <span>{tip.proTip}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assessment CTA */}
      <div className="mt-16 text-center p-8 sm:p-10 rounded-3xl cyber-card border border-cyan-500/40 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-cyan-500/10 animate-pulse-subtle" />
        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Benchmark your habits against these guidelines
          </h3>
          <p className="text-sm text-slate-300">
            Take the free, client-side Cyber Hygiene Assessment to get your 0–100 score and personalized recommendations.
          </p>
          <div className="pt-3">
            <button
              onClick={onStartAssessment}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Start Free Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
