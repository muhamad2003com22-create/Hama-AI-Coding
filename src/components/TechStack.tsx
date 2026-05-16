import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import TiltCard from './TiltCard';

export default function TechStack() {
  const { t } = useTranslation();

  const stack = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', glow: 'shadow-blue-500/50 text-blue-400' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', glow: 'shadow-orange-500/50 text-orange-400' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', glow: 'shadow-blue-600/50 text-blue-500' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', glow: 'shadow-yellow-500/50 text-yellow-400' },
  ];

  return (
    <section id="stack" className="py-24 space-y-12">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">{t('stack.title')}</h2>
        <div className="h-1 w-20 bg-cyan-500 rounded-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {stack.map((item, i) => (
          <TiltCard key={item.name} intensity={item.glow ? 20 : 10}>
             <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.96, transition: { duration: 0.075 } }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`glass-card p-6 flex flex-col items-center justify-center gap-4 group h-full transition-all duration-300 rounded-[32px] transform-gpu touch-manipulation active:scale-95 ${item.glow ? `border-white/20 bg-white/5 shadow-[0_0_30px_-10px] ${item.glow.split(' ')[0]}` : ''}`}
            >
              <div className={`w-14 h-14 grayscale group-hover:grayscale-0 transition-all duration-500 ${item.glow ? 'grayscale-0' : ''}`}>
                <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <span className={`text-[10px] font-bold tracking-[0.2em] transition-colors ${item.glow ? item.glow.split(' ')[1] : 'text-slate-500 group-hover:text-cyan-400'}`}>
                {item.name.toUpperCase()}
              </span>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
