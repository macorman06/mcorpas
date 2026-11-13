import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

interface Props {
  /** Section to open at, for legacy routes such as /projects and /contact. */
  section?: string;
}

const Home = ({ section }: Props) => {
  const { t, ready } = useTranslation();
  const location = useLocation();
  const target = location.hash.slice(1) || section;
  const firstJump = useRef(true);

  useEffect(() => {
    if (!ready) return;
    if (!target) {
      window.scrollTo({ top: 0 });
      return;
    }
    // Let translated sections and images lay out before jumping.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    // First jump is instant: a smooth scroll gets cancelled by layout shifts while loading.
    const id = window.setTimeout(() => {
      const behavior: ScrollBehavior = firstJump.current ? 'instant' : 'smooth';
      firstJump.current = false;
      document.getElementById(target)?.scrollIntoView({ behavior });
    }, 120);
    return () => window.clearTimeout(id);
  }, [target, ready, location.key]);

  const isProjects = section === 'projects';

  return (
    <>
      <Helmet>
        <title>{isProjects ? t('meta.projectsTitle') : t('meta.title')}</title>
        <meta name="description" content={isProjects ? t('meta.projectsDescription') : t('meta.description')} />
        <meta property="og:title" content={isProjects ? t('meta.projectsTitle') : t('meta.title')} />
        <meta property="og:description" content={isProjects ? t('meta.projectsDescription') : t('meta.description')} />
      </Helmet>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
