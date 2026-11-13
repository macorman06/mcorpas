import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Github, Globe, Instagram, X } from 'lucide-react';
import { Project } from '../types/project.types';
import { currentLang } from '../i18n';

interface Props {
  project: Project;
  onClose: () => void;
}

const ProjectDetail = ({ project, onClose }: Props) => {
  const { t } = useTranslation();
  const lang = currentLang();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [onClose]);

  const linkClass =
    'inline-flex items-center gap-1.5 font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent)]';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t('projectsPage.close')}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)] text-[var(--mute)] transition-colors hover:text-[var(--ink)]"
        >
          <X className="h-5 w-5" />
        </button>

        {project.cover && <img src={project.cover} alt="" className="h-52 w-full object-cover sm:h-64" />}

        <div className="p-6 sm:p-9">
          <p className="text-sm tabular-nums text-[var(--mute)]">
            {project.year ? `${project.year} · ` : ''}
            <span className="text-[var(--accent)]">{project.status[lang]}</span>
          </p>
          <h3 id="project-title" className="mt-1 pr-8 font-display text-2xl font-semibold leading-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-lg leading-relaxed">{project.summary[lang]}</p>

          {project.facts.length > 0 && (
            <ul className="mt-6 space-y-3 text-[var(--mute)]">
              {project.facts.map((f, i) => (
                <li key={i} className="relative pl-4 leading-relaxed before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-2 before:bg-[var(--accent)]">
                  {f[lang]}
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-8 grid gap-5 border-t border-[var(--line)] pt-6 sm:grid-cols-[8rem_1fr]">
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--mute)]">{t('projectsPage.role')}</dt>
            <dd className="leading-relaxed">{project.role[lang]}</dd>
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--mute)]">{t('projectsPage.stack')}</dt>
            <dd className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="border border-[var(--line)] px-2.5 py-1 text-sm">
                  {s}
                </span>
              ))}
            </dd>
          </dl>

          {project.images && project.images.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-2">
              {project.images.map((src, i) => (
                <img key={src} src={src} alt={`${project.title} ${i + 1}`} loading="lazy" className="aspect-square w-full object-cover" />
              ))}
            </div>
          )}

          {project.links && (
            <div className="mt-8 flex flex-wrap gap-6 border-t border-[var(--line)] pt-6 text-sm">
              {project.links.pdf && (
                <a href={project.links.pdf} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <FileText className="h-4 w-4" /> {t('projectsPage.pdf')}
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Globe className="h-4 w-4" /> Web
                </a>
              )}
              {project.links.instagram && (
                <a href={project.links.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
