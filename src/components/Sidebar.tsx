import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Briefcase, 
  Share2, 
  Settings, 
  Globe, 
  LayoutDashboard,
  X,
  LogOut
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onAdminOpen: () => void;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Sidebar({ activeSection, setActiveSection, onAdminOpen, isAdmin, onLogout }: SidebarProps) {
  const { t, i18n } = useTranslation();
  const [isLangsOpen, setIsLangsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ku', label: 'کوردی', dir: 'rtl' },
    { code: 'ar', label: 'العربية', dir: 'rtl' },
    { code: 'fa', label: 'فارسی', dir: 'rtl' }
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangsOpen(false);
  };

  const navItems = [
    { id: 'home', icon: Home, label: t('nav.home') },
    { id: 'projects', icon: Briefcase, label: t('nav.projects') },
    { id: 'socials', icon: Share2, label: t('nav.socials') },
  ];

    const Logo = () => (
      <motion.div
        animate={{ 
          y: [0, -4, 0],
          rotate: [2, -2, 2]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="hidden md:flex w-16 h-16 items-center justify-center relative group"
      >
        {/* Ambient Glow background */}
        <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full scale-50 group-hover:scale-100 transition-transform duration-700" />
        
        <svg viewBox="0 0 100 100" className="w-12 h-12 relative z-10 transition-transform duration-500 group-hover:scale-110">
          <defs>
            <linearGradient id="hamaLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="logoGlowEffect" x="0" y="0" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feComponentTransfer in="blur" result="glow">
                <feFuncA type="linear" slope="2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Abstract H Monogram Elements */}
          <path 
            d="M25,20 L25,80" 
            stroke="url(#hamaLogoGradient)" 
            strokeWidth="8" 
            strokeLinecap="round"
            className="filter-[url(#logoGlowEffect)]"
          />
          <path 
            d="M75,20 L75,80" 
            stroke="url(#hamaLogoGradient)" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <path 
            d="M25,50 L75,50" 
            stroke="#22d3ee" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          
          {/* Cyber/Code Brackets */}
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            d="M15,40 L5,50 L15,60" 
            stroke="#22d3ee" 
            strokeWidth="3" 
            fill="none" 
          />
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            d="M85,40 L95,50 L85,60" 
            stroke="#22d3ee" 
            strokeWidth="3" 
            fill="none" 
          />
          
          {/* Central Pulsating AI Node */}
          <motion.circle 
            cx="50" cy="50" r="8" 
            fill="#22d3ee"
            animate={{ 
              r: [6, 10, 6],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ filter: 'drop-shadow(0 0 8px #22d3ee)' }}
          />
        </svg>
      </motion.div>
    );

  const sideClass = i18n.dir() === 'rtl' ? "md:right-4" : "md:left-4";

  return (
    <aside className={cn(
      "fixed z-50 transition-all duration-500",
      // Mobile: Bottom Bar
      "bottom-0 left-0 right-0 h-20 md:h-auto flex flex-row md:flex-col items-center justify-around md:justify-start px-2 sm:px-4 md:px-0 py-0 md:py-8 gap-0 md:gap-12 bg-[#020617]/90 backdrop-blur-3xl border-t md:border border-white/10 rounded-t-3xl md:rounded-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-2xl",
      // Desktop: Fixed Vertical Sidebar
      "md:top-6 md:bottom-6 md:w-24 px-2",
      sideClass
    )}>
      <Logo />

      <nav className="flex-1 flex flex-row md:flex-col gap-1 sm:gap-2 md:gap-6 items-center justify-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "flex flex-col md:flex-row items-center justify-center min-w-[64px] p-2 md:p-3 rounded-xl transition-all duration-75 transform-gpu relative group touch-manipulation active:scale-90",
              activeSection === item.id 
                ? "bg-white/10 text-cyan-400" 
                : "text-slate-400 hover:text-white"
            )}
            title={item.label}
          >
            <item.icon size={22} className="md:w-6 md:h-6" />
            <span className="text-[10px] mt-1 md:hidden font-medium opacity-80">{item.label}</span>
            {activeSection === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute md:right-0 bottom-0 md:top-1/4 h-0.5 md:h-1/2 w-8 md:w-1 bg-cyan-400 rounded-t-full md:rounded-l-full shadow-[0_0_10px_#22d3ee] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto"
              />
            )}
            <span className="hidden md:block absolute left-full ml-4 px-2 py-1 rounded bg-slate-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex flex-row md:flex-col gap-2 md:gap-6 items-center">
        <div className="relative">
          <button 
            onClick={() => setIsLangsOpen(!isLangsOpen)}
            className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-75 transform-gpu touch-manipulation active:scale-90"
            title="Switch Language"
          >
            <Globe size={24} />
          </button>
          
          <AnimatePresence>
            {isLangsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, md: { y: 0, x: 20 } }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 20, md: { y: 0, x: 20 } }}
                className={cn(
                  "absolute bottom-full md:bottom-0 mb-4 md:mb-0 glass-card p-2 min-w-[120px] z-[60]",
                  i18n.dir() === 'rtl' ? "left-0 md:right-full md:mr-4" : "right-0 md:left-full md:ml-4"
                )}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-75 transform-gpu touch-manipulation active:bg-white/10",
                      i18n.language === lang.code ? "bg-cyan-500/20 text-cyan-400" : "hover:bg-white/5 text-white"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isAdmin ? (
          <div className="flex flex-row md:flex-col gap-2 md:gap-4 items-center">
             <button 
              onClick={() => setActiveSection('admin')}
              className={cn(
                "p-3 rounded-xl transition-all duration-75 transform-gpu touch-manipulation active:scale-90",
                 activeSection === 'admin' ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-white/10"
              )}
            >
              <LayoutDashboard size={24} />
            </button>
            <button 
              onClick={onLogout}
              className="p-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-75 transform-gpu touch-manipulation active:scale-90"
            >
              <LogOut size={24} />
            </button>
          </div>
        ) : (
          <button 
            onClick={onAdminOpen}
            className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-75 transform-gpu touch-manipulation active:scale-90"
            title={t('nav.admin')}
          >
            <Settings size={24} />
          </button>
        )}
      </div>
    </aside>
  );
}
