import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Key, CheckCircle, RefreshCw, Activity, Terminal } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[480px] mx-auto aspect-square flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Background Multi-Color Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-indigo-600/25 to-emerald-500/20 rounded-full filter blur-[70px] -z-10 animate-pulse-subtle pointer-events-none" />

      {/* Ripple Waves Expanding from Center */}
      <div className="absolute w-52 h-52 rounded-full border border-cyan-400/40 animate-ripple pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full border border-indigo-400/30 animate-ripple [animation-delay:1.6s] pointer-events-none" />

      {/* Concentric Technical Ring 1 - Outer Clockwise Rotation */}
      <div className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-cyan-400/35 animate-[spin_60s_linear_infinite] shadow-[0_0_15px_rgba(0,245,255,0.15)]" />

      {/* Concentric Technical Ring 2 - Counter-Clockwise Rotation */}
      <div className="absolute inset-8 sm:inset-10 rounded-full border border-slate-700/60 animate-[spin_40s_linear_infinite_reverse] border-t-cyan-400/60 border-b-indigo-400/60" />

      {/* 360-Degree Sweeping Holographic Radar Beam */}
      <div className="absolute inset-10 sm:inset-14 rounded-full overflow-hidden pointer-events-none">
        <div className="w-full h-full animate-radar-sweep origin-center bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,245,255,0.04)_300deg,rgba(0,245,255,0.32)_360deg)]" />
      </div>

      {/* Concentric Ring 3 - Cardinal Coordinate Ticks */}
      <div className="absolute inset-14 sm:inset-16 rounded-full border border-cyan-500/20 flex items-center justify-center pointer-events-none">
        <div className="absolute top-0 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#00f5ff]" />
        <div className="absolute bottom-0 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#00f5ff]" />
        <div className="absolute left-0 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#00f5ff]" />
        <div className="absolute right-0 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#00f5ff]" />
        <div className="absolute inset-4 rounded-full border border-indigo-500/20" />
      </div>

      {/* Central 3D Interactive Shield Core */}
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={`relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-3xl cyber-card flex flex-col items-center justify-center p-6 border transition-all duration-300 ${
          isHovered
            ? 'border-cyan-400 shadow-[0_0_60px_-5px_rgba(0,245,255,0.5)] scale-105'
            : 'border-cyan-400/40 shadow-[0_0_40px_-10px_rgba(0,245,255,0.3)]'
        }`}
      >
        {/* Animated Laser Scanning Beam travelling vertically */}
        <div className="absolute inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_14px_#00f5ff] animate-scanline pointer-events-none" />

        <div className="relative">
          {/* Pulsating Shield Halo */}
          <div className="absolute -inset-4 bg-gradient-to-b from-cyan-400/35 via-indigo-500/40 to-emerald-400/25 rounded-full blur-xl animate-pulse-subtle" />
          
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#040e24] border border-cyan-400/60 flex items-center justify-center shadow-inner group">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(0,245,255,0.7)]" />

            {/* Live Pulsating Green Beacon */}
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-400 rounded-full ring-4 ring-[#030712] animate-ping" />
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-400 rounded-full ring-4 ring-[#030712] shadow-[0_0_14px_#10b981]" />
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-xs uppercase tracking-widest font-mono text-cyan-300 font-bold flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Active Enclave
          </div>
          <div className="text-slate-400 text-[11px] font-mono mt-1 flex items-center justify-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>Telemetry: 100% Secure</span>
          </div>
        </div>
      </motion.div>

      {/* Orbiting Satellite Node 1: MFA (Top Left) */}
      <motion.div
        animate={{ y: [-5, 6, -5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 left-2 sm:left-4 z-20"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/95 border border-cyan-400/50 shadow-lg shadow-cyan-950/60 backdrop-blur-md hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all cursor-default">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(0,245,255,0.3)]">
            <Lock className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-cyan-300 font-mono uppercase tracking-wider font-bold">MFA Guard</div>
            <div className="text-xs font-semibold text-slate-100">Enforced</div>
          </div>
        </div>
      </motion.div>

      {/* Orbiting Satellite Node 2: Phishing Defense (Top Right) */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-6 right-1 sm:right-4 z-20"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/95 border border-emerald-400/50 shadow-lg shadow-emerald-950/60 backdrop-blur-md hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-default">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-emerald-300 font-mono uppercase tracking-wider font-bold">Phishing Shield</div>
            <div className="text-xs font-semibold text-slate-100">Vigilant</div>
          </div>
        </div>
      </motion.div>

      {/* Orbiting Satellite Node 3: Zero-Knowledge Vault (Bottom Left) */}
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-3 left-1 sm:left-4 z-20"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/95 border border-indigo-400/50 shadow-lg shadow-indigo-950/60 backdrop-blur-md hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all cursor-default">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            <Key className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-indigo-300 font-mono uppercase tracking-wider font-bold">Vault Security</div>
            <div className="text-xs font-semibold text-slate-100">Zero-Knowledge</div>
          </div>
        </div>
      </motion.div>

      {/* Orbiting Satellite Node 4: Continuous Patching (Bottom Right) */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-5 right-1 sm:right-6 z-20"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900/95 border border-sky-400/50 shadow-lg shadow-sky-950/60 backdrop-blur-md hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all cursor-default">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
            <RefreshCw className="w-3.5 h-3.5 animate-[spin_8s_linear_infinite]" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-sky-300 font-mono uppercase tracking-wider font-bold">Patch Automation</div>
            <div className="text-xs font-semibold text-slate-100">Continuous</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
