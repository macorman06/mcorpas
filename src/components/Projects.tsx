import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Section from './Section';
import ProjectDetail from './ProjectsCardDetail';
import { projects } from '../data/projects';
import { Project } from '../types/project.types';
import { currentLang } from '../i18n';

const ease = [0.22, 1, 0.36, 1] as const;

const Projects = () => {
  const { t } = useTranslation();
  const lang = currentLang();
  const [active, setActive] = useState<Project | null>(null);

  const featured = projects.filter((p) => p.kind === 'engineering');
  const personal = projects.filter((p) => p.kind === 'personal');

  return (
    <Section id="projects" kicker={t('projectsPage.kicker')} title={t('projectsPage.title')} intro={t('projectsPage.subtitle')}>
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mute)]">{t('projectsPage.engineering')}</h3>
      {featured.map((p) => (
        <motion.button
          key={p.id}
          type="button"
          onClick={() => setActive(p)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease }}
          className="group grid w-full gap-6 text-left md:grid-cols-[1.15fr_1fr] md:gap-10"
        >
          {p.cover && (
            <div className="aspect-[16/10] overflow-hidden bg-[var(--surface)]">
              <img
                src={p.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-sm tabular-nums text-[var(--mute)]">
              {p.year} · <span className="text-[var(--accent)]">{p.status[lang]}</span>
            </p>
            <h4 className="mt-2 font-display text-2xl font-semibold leading-tight text-[var(--ink)] decoration-[var(--accent)] decoration-2 underline-offset-4 group-hover:underline md:text-3xl">
              {p.title}
            </h4>
            <p className="mt-3 leading-relaxed text-[var(--mute)]">{p.summary[lang]}</p>
            <p className="mt-4 text-sm text-[var(--mute)]">{p.stack.join(' · ')}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink)]">
              {t('projectsPage.open')} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </motion.button>
      ))}

      <h3 className="mb-3 mt-20 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mute)]">{t('projectsPage.personal')}</h3>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--mute)]">{t('projectsPage.aiNote')}</p>

      <ul className="border-b border-[var(--line)]">
        {personal.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.05, ease }}
            className="border-t border-[var(--line)]"
          >
            <button
              type="button"
              onClick={() => setActive(p)}
              className="group grid w-full gap-x-8 gap-y-2 py-6 text-left sm:grid-cols-[12rem_1fr_auto] sm:items-baseline"
            >
              <span className="font-display text-xl font-semibold text-[var(--ink)] decoration-[var(--accent)] decoration-2 underline-offset-4 group-hover:underline">
                {p.title}
              </span>
              <span className="leading-relaxed text-[var(--mute)]">
                {p.summary[lang]}
                {p.aiAssisted && (
                  <span className="ml-2 inline-flex items-center gap-1 whitespace-nowrap align-middle text-xs text-[var(--accent)]">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {t('projectsPage.aiLabel')}
                  </span>
                )}
              </span>
              <span className="whitespace-nowrap text-sm text-[var(--mute)]">
                {p.year ? `${p.year} · ` : ''}
                {p.status[lang]}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>{active && <ProjectDetail key={active.id} project={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </Section>
  );
};

export default Projects;
