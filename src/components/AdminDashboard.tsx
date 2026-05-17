import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { Plus, Trash2, Edit2, BarChart3, Globe, Share2, Share, Save, X, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Project, SocialLink } from '../types';
import { sanitizeInput, isValidSecureURL, formatURL } from '../lib/utils';

interface AdminDashboardProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  socials: SocialLink[];
  setSocials: (socials: SocialLink[]) => void;
  profileImage: string;
  setProfileImage: (img: string) => void;
  onLogout: () => void;
}

export default function AdminDashboard({ 
  projects, 
  setProjects, 
  socials, 
  setSocials, 
  profileImage, 
  setProfileImage, 
  onLogout 
}: AdminDashboardProps) {
  const { t } = useTranslation();

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name];
    return Icon || LucideIcons.Share2;
  };

  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddSocialOpen, setIsAddSocialOpen] = useState(false);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Inactivity timeout logic (15 minutes) remains for security
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onLogout();
      }, 15 * 60 * 1000); // 15 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(timeout);
    };
  }, [onLogout]);

  const [newProject, setNewProject] = useState({ title: '', link: '', stack: '', image: '' });
  const [newSocial, setNewSocial] = useState({ link: '' });

  const stats = [
    { label: 'Total Visits', value: '1,284', icon: Globe },
    { label: 'Project Clicks', value: '452', icon: BarChart3 },
    { label: 'Social Leads', value: '89', icon: Share2 },
  ];

  const detectSocialPlatform = (url: string) => {
    const lowercaseUrl = url.toLowerCase();
    if (lowercaseUrl.includes('instagram.com')) return { name: 'Instagram', icon: 'Instagram' };
    if (lowercaseUrl.includes('t.me') || lowercaseUrl.includes('telegram')) return { name: 'Telegram', icon: 'Send' };
    if (lowercaseUrl.includes('facebook.com')) return { name: 'Facebook', icon: 'Facebook' };
    if (lowercaseUrl.includes('tiktok.com')) return { name: 'TikTok', icon: 'Music2' };
    if (lowercaseUrl.includes('snapchat.com')) return { name: 'Snapchat', icon: 'Ghost' };
    if (lowercaseUrl.includes('wa.me') || lowercaseUrl.includes('whatsapp')) return { name: 'WhatsApp', icon: 'MessageCircle' };
    return { name: 'Social Link', icon: 'Share2' };
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject({ ...newProject, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formattedLink = formatURL(newProject.link);

    if (!isValidSecureURL(formattedLink)) {
      setError('Invalid URL. Only secure https:// links are allowed.');
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      title: sanitizeInput(newProject.title),
      link: formattedLink,
      image: newProject.image || '',
      stack: sanitizeInput(newProject.stack).split(',').map(s => s.trim())
    };

    setProjects([project, ...projects]);
    setNewProject({ title: '', link: '', stack: '', image: '' });
    setIsAddProjectOpen(false);
  };

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formattedLink = formatURL(newSocial.link);

    if (!isValidSecureURL(formattedLink)) {
      setError('Invalid URL. Only secure https:// links are allowed.');
      return;
    }

    const { name, icon } = detectSocialPlatform(formattedLink);
    
    if (editingSocialId) {
      setSocials(socials.map(s => s.id === editingSocialId ? { 
        ...s, 
        name, 
        link: formattedLink, 
        icon 
      } : s));
      setEditingSocialId(null);
    } else {
      const social: SocialLink = {
        id: Date.now().toString(),
        name,
        link: formattedLink,
        icon,
        color: 'hover:bg-cyan-500/20 hover:text-cyan-400'
      };
      setSocials([...socials, social]);
    }
    
    setNewSocial({ link: '' });
    setIsAddSocialOpen(false);
  };

  const handleEditSocial = (social: SocialLink) => {
    setNewSocial({
      link: social.link,
    });
    setEditingSocialId(social.id);
    setIsAddSocialOpen(true);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const deleteSocial = (id: string) => {
    setSocials(socials.filter(s => s.id !== id));
  };


  const isDefaultImage = profileImage === '/profile.jpg' || !profileImage;

  return (
    <section className="py-12 space-y-12">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold neon-text">{t('admin.dashboard')}</h2>
          <p className="text-slate-400 text-sm">Welcome back, Hama. Management Matrix Active.</p>
        </div>
      </div>

      {/* Update Profile Picture Section */}
      <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border-cyan-500/20">
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-2 border-cyan-500/30 glow-cyan">
            {isDefaultImage ? (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <LucideIcons.User size={48} className="text-cyan-400 opacity-30" />
              </div>
            ) : (
              <img src={profileImage} alt="Current Profile" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl pointer-events-none">
            <LucideIcons.Camera className="text-white" size={32} />
          </div>
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Update Profile Picture</h3>
            <p className="text-sm text-slate-400">Upload a professional headshot to represent Hama vertically.</p>
          </div>
          <label className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl cursor-pointer hover:bg-cyan-500 hover:text-white transition-all duration-75 transform-gpu font-bold touch-manipulation active:scale-[0.98]">
            <LucideIcons.Upload size={18} />
            Choose New Photo
            <input type="file" accept="image/*" onChange={handleProfileUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-6 flex items-center gap-4 border-cyan-500/10">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-slate-500 text-xs uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projects Section */}
        <div className="glass-card p-4 md:p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Globe size={18} className="text-cyan-400" /> {t('nav.projects')}
            </h3>
            <button 
              onClick={() => setIsAddProjectOpen(true)}
              className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-75 transform-gpu touch-manipulation active:scale-90"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {projects.map((proj) => (
              <motion.div 
                key={proj.id} 
                whileTap={{ scale: 0.98, transition: { duration: 0.075 } }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-all duration-75 transform-gpu touch-manipulation gap-4"
              >
                <div className="flex items-center gap-4 text-sm font-medium">
                   {proj.image ? (
                     <img src={proj.image} className="w-10 h-10 rounded object-cover flex-shrink-0" alt="" />
                   ) : (
                     <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                       <Globe size={14} />
                     </div>
                   )}
                   <div className="min-w-0">
                     <p className="truncate">{proj.title}</p>
                     <p className="text-[10px] text-slate-500 font-mono italic truncate">{proj.stack.join(', ')}</p>
                   </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end border-t border-white/5 sm:border-0 pt-2 sm:pt-0">
                  <button 
                    onClick={() => deleteProject(proj.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors bg-white/5 sm:bg-transparent rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Socials Section */}
        <div className="glass-card p-4 md:p-8 space-y-6">
          <div className="flex justify-between items-center">
             <h3 className="text-xl font-bold flex items-center gap-2">
              <Share2 size={18} className="text-cyan-400" /> {t('nav.socials')}
            </h3>
            <button 
              onClick={() => setIsAddSocialOpen(true)}
              className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-75 transform-gpu touch-manipulation active:scale-90"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {socials.map((social) => (
              <motion.div 
                key={social.id} 
                whileTap={{ scale: 0.98, transition: { duration: 0.075 } }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-all duration-75 transform-gpu touch-manipulation gap-4"
              >
                <span className="font-medium text-sm flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    {React.createElement(getIcon(social.icon), { size: 16 })}
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <p className="truncate">{social.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{social.link}</p>
                  </div>
                </span>
                <div className="flex gap-2 w-full sm:w-auto justify-end border-t border-white/5 sm:border-0 pt-2 sm:pt-0">
                  <button 
                    onClick={() => handleEditSocial(social)}
                    className="p-2 text-slate-400 hover:text-cyan-400 transition-colors bg-white/5 sm:bg-transparent rounded-lg"
                    title="Edit Social"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteSocial(social.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors bg-white/5 sm:bg-transparent rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {isAddProjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddProjectOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md glass-card p-8 border-cyan-500/30"
            >
              <h3 className="text-xl font-bold mb-6">Deploy New Project</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                {error && <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded">{error}</p>}
                <input 
                  required placeholder="Project Title"
                  value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500"
                />
                <input 
                  required placeholder="Tech Stack (comma separated)"
                  value={newProject.stack} onChange={e => setNewProject({...newProject, stack: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500"
                />
                
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 uppercase tracking-widest font-bold">Project Image</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label 
                        className="w-full bg-white/5 border border-dashed border-white/20 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-cyan-500/50 transition-all"
                      >
                        <Plus size={20} className="text-slate-400" />
                        <span className="text-xs text-slate-400">Click to Upload Image</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="hidden" 
                        />
                      </label>
                    </div>
                    {newProject.image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                        <img src={newProject.image} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>

                <input 
                  required placeholder="Target URL"
                  value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500"
                />
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setIsAddProjectOpen(false)} className="flex-1 glass-button py-2 transition-all duration-75 transform-gpu active:scale-95">Cancel</button>
                  <button type="submit" className="flex-1 bg-cyan-500 rounded-lg font-bold transition-all duration-75 transform-gpu active:scale-95 active:bg-cyan-600">Add Project</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {isAddSocialOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddSocialOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md glass-card p-8 border-cyan-500/30"
            >
              <h3 className="text-xl font-bold mb-6">
                {editingSocialId ? 'Update Social Node' : 'Initialize Social Node'}
              </h3>
              <form onSubmit={handleAddSocial} className="space-y-4">
                {error && <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded">{error}</p>}
                <input 
                  required placeholder="Paste Social Media Link"
                  value={newSocial.link} onChange={e => setNewSocial({...newSocial, link: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500"
                />
                <p className="text-[10px] text-slate-500 italic">Platform and icon will be auto-detected.</p>
                <div className="flex gap-4 mt-6">
                  <button 
                    type="button" 
                    onClick={() => {
                      setIsAddSocialOpen(false);
                      setEditingSocialId(null);
                      setNewSocial({ link: '' });
                    }} 
                    className="flex-1 glass-button py-2 transition-all duration-75 transform-gpu active:scale-95"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 bg-cyan-500 rounded-lg font-bold transition-all duration-75 transform-gpu active:scale-95 active:bg-cyan-600">
                    {editingSocialId ? 'Save Changes' : 'Connect Social'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
