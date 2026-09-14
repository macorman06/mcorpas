import React, { useState } from 'react';
import { Instagram, FileText, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCardDetail from './ProjectsCardDetail';
import { Project } from '../types/project.types';
import projectsData from '../data/projectsData.json';

const Projects = () => {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [activeCardProject, setActiveCardProject] = useState<Project | null>(null);

  const projects: Project[] = projectsData;

  const sortedProjects = [...projects].sort((a, b) => {
    return sortBy === 'name' ? a.title.localeCompare(b.title) : b.date - a.date;
  });

  return (
    <section className="projects-surface min-h-screen flex pt-8 justify-center font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-[var(--proj-line)] pb-8">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-[var(--proj-ink)] mb-3">
              {t('projectsPage.title')}
            </h2>
            <p className="text-base md:text-lg text-[var(--proj-mute)] leading-relaxed">
              {t('projectsPage.subtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSortBy(sortBy === 'date' ? 'name' : 'date')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--proj-ink)] border-b border-[var(--proj-ink)] pb-0.5 hover:text-[var(--proj-accent)] hover:border-[var(--proj-accent)] transition-colors"
          >
            <ArrowUpDown className="h-4 w-4" />
            {t('projectsPage.sortBy')}{' '}
            {sortBy === 'date' ? t('projectsPage.sortName') : t('projectsPage.sortDate')}
          </button>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          <AnimatePresence>
            {sortedProjects.map((project, index) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveCardProject(project)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative overflow-hidden mb-5 aspect-[16/10] bg-[var(--proj-line)]">
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-display text-2xl font-semibold text-[var(--proj-ink)] underline-offset-4 decoration-[var(--proj-accent)] decoration-2 group-hover:underline">
                    {project.title}
                  </h3>
                  <span className="text-sm tabular-nums text-[var(--proj-mute)] shrink-0">
                    {project.date}
                  </span>
                </div>

                <p className="text-[var(--proj-mute)] text-base leading-relaxed mb-3 line-clamp-2">
                  {project.description}
                </p>

                <p className="text-xs uppercase tracking-[0.14em] text-[var(--proj-accent)] mb-4">
                  {project.status}
                </p>

                <div className="mt-auto flex flex-wrap gap-5 text-sm">
                  {project.pdf && (
                    <a
                      href={project.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-[var(--proj-mute)] hover:text-[var(--proj-accent)] transition-colors"
                    >
                      <FileText className="h-4 w-4" /> {t('projectsPage.pdf')}
                    </a>
                  )}
                  {project.instagram && (
                    <a
                      href={project.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-[var(--proj-mute)] hover:text-[var(--proj-accent)] transition-colors"
                    >
                      <Instagram className="h-4 w-4" /> Instagram
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {activeCardProject && (
        <ProjectCardDetail
          project={activeCardProject}
          onClose={() => setActiveCardProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
