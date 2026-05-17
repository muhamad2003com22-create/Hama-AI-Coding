import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LogoComponent from './Logo';
import { 
  Home, 
  Briefcase, 
  Share2, 
  Settings, 
  Globe, 
  LayoutDashboard,
  LogOut,
  Moon,
  Sun
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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

  const sideClass = i18n.dir() === 'rtl' ? "lg:right-4" : "lg:left-4";

  return (
    <aside className={cn(
      "fixed z-50 transition-all duration-500",
      // Mobile: Bottom Bar
      "bottom-0 left-0 right-0 h-20 lg:h-auto flex flex-row lg:flex-col items-center justify-around lg:justify-start px-2 sm:px-4 lg:px-0 py-0 lg:py-8 gap-0 lg:gap-12 backdrop-blur-3xl border-t lg:border border-white/10 rounded-t-3xl lg:rounded-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] lg:shadow-2xl",
      // Desktop: Fixed Vertical Sidebar
      "lg:top-6 lg:bottom-6 lg:w-24 px-2",
      sideClass
    )}
    style={{ backgroundColor: `rgba(var(--bg-rgb, ${theme === 'dark' ? '2, 6, 23' : '248, 250, 252'}), 0.9)` }}
    >
      <div className="hidden lg:block">
        <LogoComponent className="w-16 h-16" />
      </div>

      <nav className="flex-1 flex flex-row lg:flex-col gap-1 sm:gap-2 lg:gap-6 items-center justify-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={cn(
              "flex flex-col lg:flex-row items-center justify-center min-w-[64px] p-2 lg:p-3 rounded-xl transition-all duration-75 transform-gpu relative group touch-manipulation active:scale-[0.92] select-none cursor-pointer",
              activeSection === item.id 
                ? "bg-white/10 text-cyan-400" 
                : "text-slate-400 hover:text-white"
            )}
            title={item.label}
          >
            <item.icon size={22} className="lg:w-6 lg:h-6" />
            <span className="text-[10px] mt-1 lg:hidden font-medium opacity-80">{item.label}</span>
            {activeSection === item.id && (
              <motion.div 
                layoutId="active-nav"
                transition={{ type: "spring", stiffness: 600, damping: 35 }}
                className="absolute lg:right-0 bottom-0 lg:top-1/4 h-0.5 lg:h-1/2 w-8 lg:w-1 bg-cyan-400 rounded-t-full lg:rounded-l-full shadow-[0_0_10px_#22d3ee] left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto"
              />
            )}
            <span className="hidden lg:block absolute left-full ml-4 px-2 py-1 rounded bg-slate-800 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="flex flex-row lg:flex-col gap-2 lg:gap-6 items-center">
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-75 transform-gpu touch-manipulation active:scale-90"
          title={theme === 'light' ? "Dark Mode" : "Light Mode"}
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>

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
                initial={{ opacity: 0, y: 20, lg: { y: 0, x: 20 } }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 20, lg: { y: 0, x: 20 } }}
                className={cn(
                  "absolute bottom-full lg:bottom-0 mb-4 lg:mb-0 glass-card p-2 min-w-[120px] z-[60]",
                  i18n.dir() === 'rtl' ? "left-0 lg:right-full lg:mr-4" : "right-0 lg:left-full lg:ml-4"
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
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-4 items-center">
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
