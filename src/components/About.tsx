import { useTranslation } from 'react-i18next';
import Section from './Section';

const About = () => {
  const { t } = useTranslation();
  const body = t('about.body', { returnObjects: true }) as string[];

  return (
    <Section id="about" kicker={t('about.kicker')} title={t('about.title')}>
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--ink)]">
        {Array.isArray(body) && body.map((p, i) => <p key={i}>{p}</p>)}
        <p className="text-base text-[var(--mute)]">{t('about.hobbies')}</p>
      </div>
    </Section>
  );
};

export default About;
