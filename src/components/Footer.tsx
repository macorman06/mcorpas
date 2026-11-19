const Footer = () => {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 text-sm text-[var(--mute)] sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Marcos Corpas</p>
      </div>
    </footer>
  );
};

export default Footer;
