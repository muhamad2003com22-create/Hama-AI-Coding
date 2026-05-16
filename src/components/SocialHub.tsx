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
    <section id="socials" className="py-24 space-y-12">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">{t('nav.socials')}</h2>
        <div className="h-1 w-20 bg-cyan-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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
                whileTap={{ scale: 0.96, transition: { duration: 0.075 } }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`glass-card p-10 flex flex-col items-center justify-center gap-6 group transition-all duration-300 h-full rounded-[40px] border-white/5 hover:border-white/20 transform-gpu touch-manipulation active:scale-95 ${social.color}`}
              >
                <div className="p-5 rounded-2xl bg-white/5 group-hover:bg-cyan-500/10 transition-all duration-500 shadow-inner">
                  <IconComponent size={40} className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <div className="text-center">
                  <span className="text-sm font-bold tracking-[0.1em] uppercase block">{social.name}</span>
                  <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">CONNECT</span>
                </div>
                <ExternalLink size={14} className="absolute top-6 right-6 opacity-0 group-hover:opacity-50 transition-opacity" />
              </motion.a>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
