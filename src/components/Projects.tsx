import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Layers } from 'lucide-react';
import TiltCard from './TiltCard';
import { Project } from '../types';
import { formatURL } from '../lib/utils';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">{t('projects.title')}</h2>
          <div className="h-1 w-20 bg-cyan-500 rounded-full" />
        </div>
        <button className="text-cyan-400 font-medium hover:underline flex items-center gap-2">
          View All <Layers size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, i) => (
          <TiltCard key={project.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative glass-card overflow-hidden h-full rounded-[40px]"
            >
              <div className="aspect-video overflow-hidden relative">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-purple-600/10 flex items-center justify-center">
                    <Layers size={48} className="text-cyan-500 opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-80" />
              </div>

              <div className="p-4 md:p-6 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 text-[9px] font-bold tracking-widest uppercase text-cyan-400">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold group-hover:neon-text transition-all">{project.title}</h3>
                
                <div className="flex gap-4">
                  <motion.a 
                    href={formatURL(project.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95, transition: { duration: 0.075 } }}
                    className="flex-1 bg-white text-[#020617] py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all duration-75 transform-gpu touch-manipulation active:scale-95 active:opacity-90"
                  >
                    {t('projects.visit')} <ExternalLink size={16} />
                  </motion.a>
                  <motion.button 
                    whileTap={{ scale: 0.95, transition: { duration: 0.075 } }}
                    className="w-10 h-10 glass-button !p-0 touch-manipulation transform-gpu"
                  >
                    <Github size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
