import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogOut, Award, Calendar, CheckCircle2, Shield, History, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserAssessments, SavedAssessment } from '../services/assessmentStorage';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSavedAssessment?: (saved: SavedAssessment) => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  onSelectSavedAssessment,
}) => {
  const { user, logout } = useAuth();
  const [assessments, setAssessments] = useState<SavedAssessment[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen && user) {
      setLoadingHistory(true);
      getUserAssessments(user.uid)
        .then((items) => {
          setAssessments(items || []);
        })
        .catch((err) => {
          console.error('Failed to load assessments:', err);
        })
        .finally(() => {
          setLoadingHistory(false);
        });
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const handleSignOut = async () => {
    await logout();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg cyber-card rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,245,255,0.25)] z-10 overflow-hidden"
        >
          {/* Top subtle laser beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent shadow-[0_0_10px_#00f5ff]" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* User Profile Card Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)]">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_#10b981]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white truncate">
                  {user.displayName || 'Cyber Operator'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
              <div className="text-[11px] text-cyan-400 font-mono mt-1 flex items-center gap-1">
                <Shield className="w-3 h-3 text-cyan-400" />
                <span>Protected Account</span>
              </div>
            </div>
          </div>

          {/* Assessment History Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-cyan-400" />
                <span>Saved Assessment History</span>
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                {assessments.length} {assessments.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>

            <div className="max-h-52 overflow-y-auto space-y-2.5 pr-1">
              {loadingHistory ? (
                <div className="py-6 text-center text-xs text-slate-400 animate-pulse">
                  Retrieving encrypted defense records...
                </div>
              ) : assessments.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
                  <p className="text-xs text-slate-400">
                    No assessment records saved yet. Take an assessment to store your hygiene score in your account!
                  </p>
                </div>
              ) : (
                assessments.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-black text-cyan-300 text-sm">
                        {item.overallScore}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{item.level} Hygiene</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{new Date(item.completedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {onSelectSavedAssessment && (
                      <button
                        onClick={() => {
                          onSelectSavedAssessment(item);
                          onClose();
                        }}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
