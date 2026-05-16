import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SocialHub from './components/SocialHub';
import TechStack from './components/TechStack';
import AIBot from './components/AIBot';
import AdminModal from './components/AdminModal';
import AdminDashboard from './components/AdminDashboard';
import { Project, SocialLink } from './types';
import { cn } from './lib/utils';
import './lib/i18n';

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI Vision Hub',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    stack: ['Python', 'PyTorch', 'Next.js'],
    link: 'https://example.com/vision'
  },
  {
    id: '2',
    title: 'Neural Finance',
    image: 'https://images.unsplash.com/photo-1611974714652-962649067b66?auto=format&fit=crop&q=80&w=800',
    stack: ['Flutter', 'TensorFlow', 'Go'],
    link: 'https://example.com/finance'
  },
  {
    id: '3',
    title: 'Quantum Commerce',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    stack: ['React', 'Express', 'OpenAI'],
    link: 'https://example.com/commerce'
  },
  {
    id: '4',
    title: 'Ethereal Social',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    stack: ['Solidity', 'Web3.js', 'Vite'],
    link: 'https://example.com/social'
  }
];

const INITIAL_SOCIALS: SocialLink[] = [
  { id: '1', name: 'Instagram', icon: 'Instagram', color: 'hover:bg-pink-500/20 hover:text-pink-400', link: 'https://instagram.com' },
  { id: '2', name: 'Telegram', icon: 'Send', color: 'hover:bg-blue-400/20 hover:text-blue-400', link: 'https://t.me' },
  { id: '3', name: 'Facebook', icon: 'Facebook', color: 'hover:bg-blue-600/20 hover:text-blue-500', link: 'https://facebook.com' },
  { id: '4', name: 'Snapchat', icon: 'Ghost', color: 'hover:bg-yellow-400/20 hover:text-yellow-400', link: 'https://snapchat.com' },
  { id: '5', name: 'TikTok', icon: 'Music2', color: 'hover:bg-slate-800 hover:text-white', link: 'https://tiktok.com' },
  { id: '6', name: 'WhatsApp', icon: 'MessageCircle', color: 'hover:bg-green-500/20 hover:text-green-400', link: 'https://whatsapp.com' },
];

export default function App() {
  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // States managed by Admin
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [socials, setSocials] = useState<SocialLink[]>(INITIAL_SOCIALS);
  const [profileImage, setProfileImage] = useState('/profile.jpg');

  // Sync RTL/LTR direction based on current language
  useEffect(() => {
    const dir = ['en'].includes(i18n.language) ? 'ltr' : 'rtl';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleLogout = () => {
    setIsAdmin(false);
    setActiveSection('home');
  };

  const renderContent = () => {
    if (isAdmin && activeSection === 'admin') {
      return (
        <AdminDashboard 
          projects={projects} 
          setProjects={setProjects}
          socials={socials}
          setSocials={setSocials}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          onLogout={handleLogout}
        />
      );
    }

    switch (activeSection) {
      case 'home':
        return (
          <div className="flex flex-col gap-y-16 md:gap-y-24">
            <Hero profileImage={profileImage} />
            <TechStack />
            <Projects projects={projects} />
            <SocialHub socials={socials} />
          </div>
        );
      case 'projects':
        return <Projects projects={projects} />;
      case 'socials':
        return <SocialHub socials={socials} />;
      default:
        return <Hero profileImage={profileImage} />;
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-cyan-500/30">
      {/* Premium 3D Workspace Background */}
      <div className="bg-mesh" />
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none z-[-10]" />
      <div className="scanline absolute inset-0 z-[-10] opacity-20 pointer-events-none" />
      
      {/* Decorative Orbs */}
      <div className="fixed top-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse z-[-10]" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse z-[-10]" />
      
      {/* Interactive 3D Floating Shapes */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed top-1/4 right-1/4 w-32 h-32 border border-cyan-500/10 rounded-3xl backdrop-blur-3xl rotate-45 pointer-events-none z-[-10]"
      />
      <motion.div 
        animate={{ 
          y: [0, 50, 0],
          rotate: [360, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-1/4 left-1/3 w-24 h-24 border border-blue-500/10 rounded-full backdrop-blur-2xl pointer-events-none z-[-10]"
      />

      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onAdminOpen={() => setIsAdminOpen(true)}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      <main className={cn(
        "px-4 sm:px-6 md:px-12 lg:px-24 pb-32 md:pb-12 transition-all duration-500 relative z-10",
        i18n.dir() === 'rtl' ? "md:mr-28 lg:md:mr-32" : "md:ml-28 lg:md:ml-32"
      )}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection + i18n.language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AIBot />

      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onLogin={(status) => {
          setIsAdmin(status);
          if (status) setActiveSection('admin');
        }}
      />

      {/* Footer Branding */}
      <footer className={cn(
        "py-12 border-t border-white/5 mb-24 md:mb-0",
        i18n.dir() === 'rtl' ? "md:mr-28 lg:md:mr-32" : "md:ml-28 lg:md:ml-32"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 opacity-30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-[0.2em] font-mono">
          <span>&copy; 2026 HAMA PORTFOLIO</span>
          <span>BUILT WITH PRECISION & INTELLIGENCE</span>
          <span>EST. KURDISTAN</span>
        </div>
      </footer>
    </div>
  );
}

