import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, User, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (status: boolean) => void;
}

export default function AdminModal({ isOpen, onClose, onLogin }: AdminModalProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Hardcoded local credentials as requested
    const AUTH_USERNAME = 'hamait';
    const AUTH_PASSWORD = 'Hamawwe0770';

    setTimeout(() => {
      if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
        onLogin(true);
        onClose();
        setUsername('');
        setPassword('');
      } else {
        setError('Access Denied. Invalid Credentials.');
      }
      setIsLoading(false);
    }, 500);
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <div className="relative w-full max-w-md h-[500px] perspective-1000">
            <motion.div
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 260, damping: 20 }}
              className="w-full h-full relative preserve-3d"
            >
              {/* Front Side: Info Card */}
              <div className={cn(
                "absolute inset-0 backface-hidden glass-card p-10 flex flex-col items-center justify-center text-center gap-6 glow-cyan",
                isFlipped && "pointer-events-none"
              )}>
                <div className="p-4 rounded-full bg-cyan-500/20 text-cyan-400">
                  <ShieldCheck size={48} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Security Gateway</h2>
                <p className="text-slate-400">Access to the private 2026 Dashboard requires cryptographic authorization.</p>
                <button 
                  onClick={() => setIsFlipped(true)}
                  className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-8 py-3 rounded-xl font-bold hover:bg-cyan-500 hover:text-white transition-all duration-75 transform-gpu w-full mt-4 touch-manipulation active:scale-[0.98]"
                >
                  Initiate Authentication
                </button>
              </div>

              {/* Back Side: Login Form */}
              <div 
                className={cn(
                  "absolute inset-0 backface-hidden glass-card p-10 rotate-y-180 glow-cyan flex flex-col justify-center",
                  !isFlipped && "pointer-events-none"
                )}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold neon-text">Authorized Login</h2>
                  <button onClick={() => setIsFlipped(false)} className="text-cyan-400 text-xs font-bold uppercase tracking-widest active:scale-95 transition-all duration-75 transform-gpu touch-manipulation">Back</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-cyan-500 outline-none transition-all"
                        placeholder="Username"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-cyan-500 outline-none transition-all"
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs text-center bg-red-400/10 p-2 rounded">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full py-4 rounded-xl font-bold shadow-lg transition-all duration-75 transform-gpu touch-manipulation active:scale-[0.98] flex items-center justify-center gap-3",
                      isLoading 
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_#22d3ee]"
                    )}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck size={20} />
                        Login
                      </>
                    )}
                  </button>
                </form>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
