import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, Code, Cpu, Smartphone, User } from 'lucide-react';
import { cn } from '../lib/utils';
import TiltCard from './TiltCard';

export default function Hero({ profileImage = '/profile.jpg' }: { profileImage?: string }) {
  const { t } = useTranslation();

  const isDefaultImage = profileImage === '/profile.jpg' || !profileImage;

  const stats = [
    { label: 'Web Apps', value: '50+', icon: Code },
    { label: 'Mobile Apps', value: '20+', icon: Smartphone },
    { label: 'AI Projects', value: '15+', icon: Cpu },
  ];

  return (
    <section className="min-h-fit md:min-h-screen flex flex-col justify-center gap-8 md:gap-12 pt-20 md:pt-12 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="w-full md:flex-1 space-y-6 md:space-y-8 text-center md:text-left px-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium text-sm">
            <Sparkles size={16} />
            <span>Available for 2026 Projects</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-slate-400 font-light">
              {t('hero.greeting')} <span className="text-white font-semibold">{t('hero.name')}</span>
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight leading-tight sm:leading-relaxed md:leading-tight">
              {t('hero.title').split(' - ').map((part, i) => (
                <span key={i} className={cn(
                  "block break-words",
                  i === 0 ? 'neon-text' : 'text-lg sm:text-xl md:text-3xl text-slate-400 mt-2 font-mono tracking-widest sm:tracking-[0.2em]'
                )}>
                  {part}
                </span>
              ))}
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto md:mx-0 leading-[1.8] sm:leading-[1.8] md:leading-relaxed font-light">
            {t('hero.about')}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <motion.button 
              whileTap={{ scale: 0.92, transition: { duration: 0 } }}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg glow-cyan hover:scale-105 transition-all duration-75 transform-gpu touch-manipulation active:scale-[0.94] active:opacity-90"
            >
              Hire Me <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.92, transition: { duration: 0 } }}
              className="w-full sm:w-auto glass-button px-8 py-4 font-bold text-lg touch-manipulation transform-gpu"
            >
              View Resume
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          className="w-full md:flex-1 relative flex justify-center"
        >
          <TiltCard intensity={25} className="w-fit">
            {/* Futuristic Visual Asset Placeholder */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[480px] md:h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-[60px] md:blur-[100px] opacity-20 floating-element" />
              <div className="absolute inset-1 sm:inset-4 glass-card gradient-border gradient-border-glow flex flex-col items-center justify-center overflow-hidden">
                {isDefaultImage ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                    <div className="p-8 md:p-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 glow-cyan flex items-center justify-center">
                      <User size={64} className="text-cyan-400 opacity-40 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <img 
                    src={profileImage} 
                    alt="Hama Profile"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                
                {isDefaultImage && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="z-10 text-center space-y-2 md:space-y-4 pointer-events-none">
                      <div className="w-16 h-16 md:w-24 md:h-24 mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center floating-element">
                          <Cpu size={32} className="text-cyan-400 md:hidden" />
                          <Cpu size={48} className="text-cyan-400 hidden md:block" />
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold tracking-[0.2em] text-cyan-400">INTELLIGENCE</h3>
                    </div>
                  </>
                )}
              </div>
              
              {/* Orbiting Elements - Hidden on very small screens if they might overflow */}
              <div className="hidden xs:block">
                {[0, 120, 240].map((deg, i) => (
                  <div 
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-[spin_20s_linear_infinite]"
                    style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
                  >
                    <div 
                      className="absolute top-0 left-1/2 h-8 w-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-lg"
                      style={{ transform: "rotate(0deg)" }}
                    >
                        {i === 0 ? <Code size={16} /> : i === 1 ? <Smartphone size={16} /> : <Sparkles size={16} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            viewport={{ once: true }}
            className="glass-card p-8 flex items-center gap-6 group hover:bg-white/10 transition-all cursor-default"
          >
            <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
              <stat.icon size={32} />
            </div>
            <div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-slate-400 uppercase tracking-widest text-xs font-semibold">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
