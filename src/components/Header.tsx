import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { currentLang } from '../i18n';

const sections = ['about', 'experience', 'projects', 'contact'] as const;

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const lang = currentLang();

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const switchLanguage = () => {
    const next = lang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    const match = location.pathname.match(/^\/(es|en)(\/.*)?$/);
    if (match) navigate(`/${next}${match[2] ?? ''}${location.hash}`, { replace: true });
  };

  const linkClass =
    'text-sm font-medium text-[var(--mute)] transition-colors hover:text-[var(--ink)]';

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-[var(--ink)]">
          Marcos Corpas
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {sections.map((id) => (
            <Link key={id} to={`/#${id}`} className={linkClass}>
              {t(`nav.${id}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={switchLanguage}
            aria-label={t('nav.language')}
            className="h-9 rounded-md px-2.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--surface)]"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--ink)] transition-colors hover:bg-[var(--surface)]"
          >
            {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t('nav.menu')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--ink)] transition-colors hover:bg-[var(--surface)] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Principal" className="border-t border-[var(--line)] bg-[var(--bg)] md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {sections.map((id) => (
              <li key={id}>
                <Link to={`/#${id}`} className="block py-3 text-base font-medium text-[var(--ink)]">
                  {t(`nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
