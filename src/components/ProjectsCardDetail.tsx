import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, ExternalLink, Instagram, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { Project } from '../types/project.types';

interface ProjectCardDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectCardDetail: React.FC<ProjectCardDetailProps> = ({ project, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-6"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="projects-surface relative w-full max-w-3xl max-h-[92vh] overflow-y-auto sm:rounded-sm shadow-none border border-[var(--proj-line)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2 text-[var(--proj-mute)] hover:text-[var(--proj-ink)] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-56 sm:h-72 object-cover"
        />

        <div className="p-6 sm:p-8 font-body">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
            <h3 className="font-display text-3xl font-semibold text-[var(--proj-ink)]">
              {project.title}
            </h3>
            <span className="text-sm tabular-nums text-[var(--proj-mute)]">{project.date}</span>
          </div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--proj-accent)] mb-6">
            {project.status}
          </p>

          <div className="text-[var(--proj-mute)] mb-8 leading-relaxed markdown-content">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="mb-4 text-[var(--proj-ink)]/80" {...props} />,
                h2: ({ node, ...props }) => (
                  <h2 className="font-display text-xl font-semibold text-[var(--proj-ink)] mt-6 mb-3" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="font-display text-lg font-semibold text-[var(--proj-ink)] mt-5 mb-2" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-[var(--proj-ink)]" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside my-4 space-y-1" {...props} />
                ),
                li: ({ node, ...props }) => <li className="my-1" {...props} />,
              }}
            >
              {project.detailedDescription || project.description}
            </ReactMarkdown>
          </div>

          {project.techIcons && project.techIcons.length > 0 && (
            <div className="mb-8">
              <h4 className="font-display text-lg font-semibold text-[var(--proj-ink)] mb-3">
                {t('projectsPage.tech')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techIcons.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-[var(--proj-line)] text-[var(--proj-ink)]"
                    title={tech.name}
                  >
                    {tech.icon.startsWith('/') || tech.icon.startsWith('http') ? (
                      <img src={tech.icon} alt="" className="w-4 h-4 object-contain" />
                    ) : (
                      <Icon icon={tech.icon} className="w-4 h-4" />
                    )}
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs tracking-wide border border-[var(--proj-line)] text-[var(--proj-mute)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {project.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-6 pt-2 border-t border-[var(--proj-line)]">
            {project.instagram && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--proj-ink)] hover:text-[var(--proj-accent)] transition-colors"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--proj-ink)] hover:text-[var(--proj-accent)] transition-colors"
              >
                <Github className="h-4 w-4" /> {t('projectsPage.code')}
              </a>
            )}
            {project.live &&
              (project.live === '/' ? (
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-[var(--proj-ink)] hover:text-[var(--proj-accent)] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" /> {t('projectsPage.home')}
                </Link>
              ) : (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--proj-ink)] hover:text-[var(--proj-accent)] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" /> {t('projectsPage.live')}
                </a>
              ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCardDetail;
