import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 text-sm text-[var(--mute)] sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Marcos Corpas</p>
        <p>{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
