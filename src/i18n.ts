import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

export type Lang = 'es' | 'en';

const detect = (): Lang => {
  if (typeof window === 'undefined') return 'es';
  const prefix = window.location.pathname.split('/')[1];
  if (prefix === 'en' || prefix === 'es') return prefix;
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    /* ignore */
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
};

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: detect(),
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    interpolation: { escapeValue: false },
    backend: { loadPath: '/locales/{{lng}}/translation.json' },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem('lang', lng);
  } catch {
    /* ignore */
  }
});
document.documentElement.lang = i18n.language;

export const currentLang = (): Lang => (i18n.language?.startsWith('en') ? 'en' : 'es');

export default i18n;
