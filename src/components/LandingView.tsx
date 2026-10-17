import React from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  Key,
  ShieldCheck,
  Laptop,
  Fish,
  Database,
  Globe,
  ArrowRight,
  Lock,
  CheckCircle2,
  Cpu,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface LandingViewProps {
  onStartAssessment: () => void;
  onExploreTips: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartAssessment,
  onExploreTips,
}) => {
  const scrollToCategories = () => {
    const el = document.getElementById('hygiene-pillars');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Kicker - with live glowing pulse indicator */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase shadow-[0_0_15px_rgba(0,245,255,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-90" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#00f5ff]" />
                </span>
                <span>CYBER HYGIENE BENCHMARK</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300 font-normal">15 EVALUATION CRITERIA</span>
              </div>

              {/* Main Headline with Electric Metallic Shimmer */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-balance">
                How secure are your{' '}
                <span className="text-shimmer drop-shadow-[0_0_25px_rgba(0,245,255,0.35)]">
                  digital habits?
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Evaluate your everyday cybersecurity practices across 6 critical defense domains. Get an immediate personalized Cyber Hygiene Score with high-impact recommendations.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onStartAssessment}
                  className="relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#818cf8] hover:from-[#38bdf8] hover:to-[#00f5ff] rounded-2xl shadow-[0_0_30px_rgba(0,245,255,0.45)] hover:shadow-[0_0_45px_rgba(0,245,255,0.65)] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Subtle shimmer sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  
                  <span className="relative z-10 text-slate-950 font-black">Start Free Assessment</span>
                  <ArrowRight className="w-4 h-4 relative z-10 text-slate-950 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToCategories}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/50 rounded-2xl transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <span>Learn About Cyber Hygiene</span>
                </motion.button>
              </div>

              {/* Trust signals / Local Guarantee */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shadow-[0_0_8px_#10b981]" />
                  <span>100% Client-Side Evaluation</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                  <EyeOff className="w-4 h-4 text-cyan-400 shadow-[0_0_8px_#00f5ff]" />
                  <span>Zero Credentials Collected</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                  <Cpu className="w-4 h-4 text-indigo-400 shadow-[0_0_8px_#818cf8]" />
                  <span>~3 Minute Self-Check</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual with sweeping radar & 3D tilt */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section (Below the hero) with animated border beam on hover */}
      <section className="relative py-14 border-y border-cyan-500/20 bg-[#050b1d]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Protect Your Accounts */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="border-beam-container rounded-3xl cyber-card p-7 hover:border-cyan-400 hover:shadow-[0_0_35px_-5px_rgba(0,245,255,0.35)] transition-all duration-300 group cursor-default"
            >
              <div className="w-13 h-13 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-500/25 transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                <Lock className="w-6 h-6 group-hover:rotate-6 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Protect Your Accounts
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Learn how well you protect passwords and accounts against credential stuffing, automated leaks, and dictionary attacks.
              </p>
            </motion.div>

            {/* Card 2: Improve Your Security */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="border-beam-container rounded-3xl cyber-card p-7 hover:border-indigo-400 hover:shadow-[0_0_35px_-5px_rgba(99,102,241,0.35)] transition-all duration-300 group cursor-default"
            >
              <div className="w-13 h-13 rounded-2xl bg-indigo-500/15 border border-indigo-400/40 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 group-hover:bg-indigo-500/25 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Shield className="w-6 h-6 group-hover:rotate-6 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                Improve Your Security
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Identify blind spots in your everyday digital habits across device patching, phishing recognition, and public Wi-Fi safety.
              </p>
            </motion.div>

            {/* Card 3: Get Your Score */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="border-beam-container rounded-3xl cyber-card p-7 hover:border-emerald-400 hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.35)] transition-all duration-300 group cursor-default"
            >
              <div className="w-13 h-13 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 group-hover:bg-emerald-500/25 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                Get Your Score
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Receive an immediate 0–100 Cyber Hygiene Rating and prioritized, step-by-step action plans to seal vulnerabilities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hygiene Pillars / Assessment Categories Section */}
      <section id="hygiene-pillars" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>COMPREHENSIVE FRAMEWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Six Critical Pillars of Cyber Hygiene
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Grounded in NIST CSF 2.0, CIS Controls, and CISA operational guidelines to benchmark your personal security posture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Password Security */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="cyber-card rounded-3xl p-7 border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_30px_-5px_rgba(0,245,255,0.3)] transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/25 transition-all shadow-[0_0_12px_rgba(0,245,255,0.3)]">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">Password Security</h3>
                <span className="text-xs text-slate-400 font-mono">Credential Vaulting</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Eliminating password reuse, deploying dedicated password vaults, and generating high-entropy passphrases to resist brute-force attacks.
            </p>
            <div className="text-xs text-cyan-300 font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>3 Criteria · High Impact Vector</span>
            </div>
          </motion.div>

          {/* Pillar 2: MFA */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="cyber-card rounded-3xl p-7 border-slate-800 hover:border-indigo-400 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-400/40 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/25 transition-all shadow-[0_0_12px_rgba(99,102,241,0.3)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">Multi-Factor Authentication</h3>
                <span className="text-xs text-slate-400 font-mono">Second-Factor Protocol</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Enforcing MFA on primary portals and shifting from interceptable SMS codes to phishing-resistant authenticator apps and hardware keys.
            </p>
            <div className="text-xs text-indigo-300 font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>2 Criteria · Critical Perimeter</span>
            </div>
          </motion.div>

          {/* Pillar 3: Device Security */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="cyber-card rounded-3xl p-7 border-slate-800 hover:border-sky-400 hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.3)] transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/25 transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-sky-300 transition-colors">Device Security</h3>
                <span className="text-xs text-slate-400 font-mono">Endpoint Encryption</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Automating OS and application patches, configuring strict lock screen timeouts, and verifying full-disk encryption like BitLocker or FileVault.
            </p>
            <div className="text-xs text-sky-300 font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>3 Criteria · Baseline Armor</span>
            </div>
          </motion.div>

          {/* Pillar 4: Phishing Awareness */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="cyber-card rounded-3xl p-7 border-slate-800 hover:border-rose-400 hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)] transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-400/40 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-500/25 transition-all shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                <Fish className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-rose-300 transition-colors">Phishing Awareness</h3>
                <span className="text-xs text-slate-400 font-mono">Human Firewall</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Detecting sender spoofing, inspecting hyperlink destinations before clicking, and treating urgent emotional appeals with zero trust.
            </p>
            <div className="text-xs text-rose-300 font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>3 Criteria · #1 Breach Vector</span>
            </div>
          </motion.div>

          {/* Pillar 5: Backup & Data Protection */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="cyber-card rounded-3xl p-7 border-slate-800 hover:border-emerald-400 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/25 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">Backup & Data Protection</h3>
                <span className="text-xs text-slate-400 font-mono">Ransomware Immunity</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Deploying the 3-2-1 backup strategy to neutralize ransomware extortion, and safely storing sensitive tax, biometric, and identity documents.
            </p>
            <div className="text-xs text-emerald-300 font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>2 Criteria · Disaster Resilience</span>
            </div>
          </motion.div>

          {/* Pillar 6: Internet & Network Safety */}
          <motion.div 
            whileHover={{ y: -6 }}
            className="cyber-card rounded-3xl p-7 border-slate-800 hover:border-teal-400 hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.3)] transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-400/40 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/25 transition-all shadow-[0_0_12px_rgba(20,184,166,0.3)]">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-teal-300 transition-colors">Internet & Network Safety</h3>
                <span className="text-xs text-slate-400 font-mono">Transmission Hygiene</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Hardening home router administrative consoles, auditing Wi-Fi encryption protocols (WPA3), and tunneling untrusted public Wi-Fi connections.
            </p>
            <div className="text-xs text-teal-300 font-mono font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <span>2 Criteria · Perimeter Defense</span>
            </div>
          </motion.div>
        </div>

        {/* Mid-page CTA with animated pulse */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl cyber-card border border-cyan-400/40 text-center relative overflow-hidden group shadow-[0_0_40px_rgba(0,245,255,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-indigo-600/15 to-cyan-500/15 animate-pulse-subtle pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to see where your defenses stand?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Takes approximately 3 minutes. Your answers never leave your browser, and no personal identifiable information is requested.
            </p>
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartAssessment}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#818cf8] hover:from-[#38bdf8] hover:to-[#00f5ff] rounded-2xl shadow-[0_0_30px_rgba(0,245,255,0.45)] hover:shadow-[0_0_45px_rgba(0,245,255,0.65)] transition-all cursor-pointer font-sans"
              >
                <span>Start Free Assessment</span>
                <ArrowRight className="w-4 h-4 text-slate-950 font-bold" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Score Levels Framework Preview */}
      <section className="py-20 border-t border-cyan-500/20 bg-[#04091a]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-2">
              EVALUATION BENCHMARK
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Descriptive Score Levels
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              We focus on actionable hygiene tiers rather than vanity metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Level 1: 0-39 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-slate-950/80 border border-rose-500/40 hover:border-rose-400 hover:shadow-[0_0_25px_-3px_rgba(244,63,94,0.35)] transition-all duration-300"
            >
              <div className="text-rose-400 font-mono text-xs font-black tracking-wider mb-1">0 – 39 PTS</div>
              <h4 className="text-lg font-bold text-white mb-2">Needs Attention</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                High exposure to automated exploits. Critical risks around password reuse, missing MFA, or unpatched endpoints.
              </p>
            </motion.div>

            {/* Level 2: 40-59 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-slate-950/80 border border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_25px_-3px_rgba(245,158,11,0.35)] transition-all duration-300"
            >
              <div className="text-amber-400 font-mono text-xs font-black tracking-wider mb-1">40 – 59 PTS</div>
              <h4 className="text-lg font-bold text-white mb-2">Developing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Foundational safety habits exist, but notable blind spots remain in phishing defense, backup safety, or public Wi-Fi.
              </p>
            </motion.div>

            {/* Level 3: 60-79 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-slate-950/80 border border-sky-500/40 hover:border-sky-400 hover:shadow-[0_0_25px_-3px_rgba(14,165,233,0.35)] transition-all duration-300"
            >
              <div className="text-sky-400 font-mono text-xs font-black tracking-wider mb-1">60 – 79 PTS</div>
              <h4 className="text-lg font-bold text-white mb-2">Good</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Solid everyday security posture. Successfully shields against opportunistic automated scanners and standard phishing campaigns.
              </p>
            </motion.div>

            {/* Level 4: 80-100 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-slate-950/80 border border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_25px_-3px_rgba(16,185,129,0.35)] transition-all duration-300"
            >
              <div className="text-emerald-400 font-mono text-xs font-black tracking-wider mb-1">80 – 100 PTS</div>
              <h4 className="text-lg font-bold text-white mb-2">Strong</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Exceptional defense-in-depth posture. Zero-knowledge vaults, robust 2FA, disk encryption, and high resistance to social engineering.
              </p>
            </motion.div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={onExploreTips}
              className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors inline-flex items-center gap-1.5 font-bold group cursor-pointer"
            >
              <span>Explore our curated Cyber Hygiene Tips Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
