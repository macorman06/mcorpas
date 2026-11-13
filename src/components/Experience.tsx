import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import Section from './Section';
import { links } from '../data/links';

interface Job {
  role: string;
  org: string;
  date: string;
  items?: string[];
  note?: string;
}

const Row = ({ entry }: { entry: Job }) => (
  <li className="grid gap-1 border-t border-[var(--line)] py-7 first:border-t-0 first:pt-0 sm:grid-cols-[9.5rem_1fr] sm:gap-8">
    <p className="text-sm tabular-nums text-[var(--mute)] sm:pt-1">{entry.date}</p>
    <div>
      <h4 className="text-lg font-semibold leading-snug text-[var(--ink)]">{entry.role}</h4>
      <p className="text-[var(--accent)]">{entry.org}</p>
      {entry.note && <p className="mt-2 text-[var(--mute)]">{entry.note}</p>}
      {entry.items && (
        <ul className="mt-3 space-y-2 text-[var(--ink)]">
          {entry.items.map((item, i) => (
            <li key={i} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-[var(--mute)]">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  </li>
);

const Experience = () => {
  const { t } = useTranslation();
  const jobs = t('experience.jobs', { returnObjects: true }) as Job[];
  const education = t('experience.education', { returnObjects: true }) as Job[];

  return (
    <Section id="experience" kicker={t('experience.kicker')} title={t('experience.title')}>
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mute)]">{t('experience.workTitle')}</h3>
      <ol>{Array.isArray(jobs) && jobs.map((j, i) => <Row key={i} entry={j} />)}</ol>

      <h3 className="mb-6 mt-14 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--mute)]">{t('experience.educationTitle')}</h3>
      <ol>{Array.isArray(education) && education.map((j, i) => <Row key={i} entry={j} />)}</ol>

      <p className="mt-10 text-[var(--mute)]">{t('experience.languages')}</p>

      <a
        href={links.cv}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-0.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        <Download className="h-4 w-4" />
        {t('hero.cv')} · {t('hero.cvNote')}
      </a>
    </Section>
  );
};

export default Experience;
