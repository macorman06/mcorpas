import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowDown, Download, Github, Linkedin } from 'lucide-react';
import { links } from '../data/links';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[100svh] items-center pt-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 lg:px-8">
        <div className="order-2 md:order-1">
          <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-[var(--ink)] [text-wrap:balance] md:text-5xl lg:text-6xl">
            {t('hero.greeting')}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--mute)]">{t('hero.description')}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--signal)] px-5 py-3 text-sm font-bold text-[var(--signal-ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)]"
            >
              <Download className="h-4 w-4" />
              {t('hero.cv')}
              <span className="font-normal opacity-70">· {t('hero.cvNote')}</span>
            </a>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 border border-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--surface)]"
            >
              {t('hero.viewProjects')}
              <ArrowDown className="h-4 w-4" />
            </Link>
            <span className="mx-1 hidden h-6 w-px bg-[var(--line)] sm:block" aria-hidden="true" />
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 text-[var(--mute)] transition-colors hover:text-[var(--ink)]">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 text-[var(--mute)] transition-colors hover:text-[var(--ink)]">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <img
            src="/profile/avatar.webp"
            alt={t('hero.avatarAlt')}
            width={960}
            height={960}
            decoding="async"
            className="mx-auto aspect-square w-full max-w-[22rem] rounded-full bg-[#181833] object-cover md:max-w-[26rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
