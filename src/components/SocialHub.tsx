import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import * as LucideIcons from 'lucide-react';
import { 
  ExternalLink
} from 'lucide-react';
import TiltCard from './TiltCard';
import { SocialLink } from '../types';
import { formatURL } from '../lib/utils';

interface SocialHubProps {
  socials: SocialLink[];
}

export default function SocialHub({ socials }: SocialHubProps) {
  const { t } = useTranslation();

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name];
    return Icon || LucideIcons.Share2;
  };

  return (
    <section id="socials" className="py-12 md:py-24 space-y-6 md:space-y-12">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">{t('nav.socials')}</h2>
        <div className="h-1 w-20 bg-cyan-500 rounded-full" />
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-6">
        {socials.map((social, i) => {
          const IconComponent = getIcon(social.icon);
          return (
            <TiltCard key={social.id} className="h-full">
              <motion.a
                href={formatURL(social.link)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.92, transition: { duration: 0 } }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                viewport={{ once: true }}
                className={`glass-card gradient-border gradient-border-glow p-4 sm:p-10 flex flex-col items-center justify-center gap-2 sm:gap-6 group transition-all duration-300 h-full rounded-[20px] sm:rounded-[40px] border-white/5 hover:border-white/20 transform-gpu touch-manipulation active:scale-[0.94] select-none cursor-pointer ${social.color}`}
              >
                <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 group-hover:bg-cyan-500/10 transition-all duration-500 shadow-inner">
                  <IconComponent size={24} className="sm:w-10 sm:h-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <div className="text-center">
                  <span className="text-[10px] sm:text-sm font-bold tracking-[0.1em] uppercase block">{social.name}</span>
                  <span className="hidden sm:block text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">CONNECT</span>
                </div>
                <ExternalLink size={12} className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-50 transition-opacity" />
              </motion.a>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
