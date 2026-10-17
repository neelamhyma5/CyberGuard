import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Menu, X, RotateCcw, User as UserIcon, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserAccountModal } from './UserAccountModal';

interface NavbarProps {
  activeView: 'home' | 'assessment' | 'results' | 'tips';
  onNavigate: (view: 'home' | 'assessment' | 'results' | 'tips') => void;
  hasCompletedAssessment: boolean;
  onRestartAssessment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  hasCompletedAssessment,
  onRestartAssessment,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const { user, loading, signInWithGoogle } = useAuth();

  const handleNavClick = (view: 'home' | 'assessment' | 'results' | 'tips') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const handleRestart = () => {
    onRestartAssessment();
    setMobileMenuOpen(false);
  };

  const navLinks: Array<{ id: 'home' | 'assessment' | 'results' | 'tips'; label: string; show: boolean }> = [
    { id: 'home', label: 'Home', show: true },
    { id: 'assessment', label: 'Assessment', show: true },
    { id: 'results', label: 'Results', show: hasCompletedAssessment },
    { id: 'tips', label: 'Cyber Tips', show: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[#030712]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
              aria-label="CyberGuard Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5ff] to-[#6366f1] flex items-center justify-center shadow-md shadow-cyan-500/25 group-hover:scale-105 group-hover:shadow-[0_0_15px_#00f5ff] transition-all duration-300">
                <Shield className="w-4 h-4 text-slate-950 font-black" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                CyberGuard
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation links with smooth animated sliding indicator */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium relative" aria-label="Main Navigation">
            {navLinks
              .filter((item) => item.show)
              .map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative py-1.5 transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-[#818cf8] shadow-[0_0_8px_#00f5ff]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
          </nav>

          {/* Zone 3: Primary action button & Auth button */}
          <div className="hidden md:flex items-center gap-3">
            {hasCompletedAssessment ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Restart</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavClick('assessment')}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#00f5ff] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00f5ff] rounded-lg shadow-md shadow-cyan-500/25 transition-all whitespace-nowrap cursor-pointer"
              >
                Start Assessment →
              </motion.button>
            )}

            {/* Auth Button / Profile Avatar */}
            {!loading && (
              user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAccountModalOpen(true)}
                  className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all cursor-pointer"
                  title="My Account"
                >
                  <span className="text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                    {user.displayName?.split(' ')[0] || 'Account'}
                  </span>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-7 h-7 rounded-full border border-cyan-400 object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
                      <UserIcon className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={signInWithGoogle}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-xs font-semibold text-white hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Log In</span>
                </motion.button>
              )
            )}
          </div>

          {/* Mobile menu hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            {!loading && user && (
              <button
                onClick={() => setAccountModalOpen(true)}
                className="w-8 h-8 rounded-full border border-cyan-400 overflow-hidden"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-cyan-500/20 flex items-center justify-center text-xs text-cyan-300 font-bold">
                    U
                  </div>
                )}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown with slide & fade */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-800 bg-[#070d1e] px-4 pt-3 pb-5 space-y-3"
          >
            {navLinks
              .filter((item) => item.show)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeView === item.id
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}

            <div className="pt-2 border-t border-slate-800 space-y-2">
              {!loading && (
                user ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAccountModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-800 border border-cyan-500/40 rounded-xl"
                  >
                    <UserIcon className="w-4 h-4 text-cyan-400" />
                    <span>My Account ({user.displayName?.split(' ')[0]})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signInWithGoogle();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 border border-cyan-400 rounded-xl shadow-md shadow-cyan-500/20"
                  >
                    <LogIn className="w-4 h-4 text-cyan-400" />
                    <span>Log In with Google</span>
                  </button>
                )
              )}

              {hasCompletedAssessment ? (
                <button
                  onClick={handleRestart}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-cyan-400" />
                  <span>Restart Assessment</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('assessment')}
                  className="w-full px-4 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-md transition-colors"
                >
                  Start Assessment →
                </button>
              )}
            </div>
          </motion.div>
        )}
      </header>

      {/* User Account Modal */}
      <UserAccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
      />
    </>
  );
};
