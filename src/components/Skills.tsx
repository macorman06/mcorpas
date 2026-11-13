import { useTranslation } from 'react-i18next';
import Section from './Section';

interface Group {
  title: string;
  items: string;
}

const Skills = () => {
  const { t } = useTranslation();
  const groups = t('skills.groups', { returnObjects: true }) as Group[];

  return (
    <Section id="skills" kicker={t('skills.kicker')} title={t('skills.title')}>
      <dl className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
        {Array.isArray(groups) &&
          groups.map((g) => (
            <div key={g.title} className="border-t border-[var(--ink)] pt-4">
              <dt className="font-semibold text-[var(--ink)]">{g.title}</dt>
              <dd className="mt-2 leading-relaxed text-[var(--mute)]">{g.items}</dd>
            </div>
          ))}
      </dl>
    </Section>
  );
};

export default Skills;
