import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import Section from './Section';
import { links } from '../data/links';

type State = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'mt-2 w-full rounded-none border-0 border-b border-[var(--line)] bg-transparent px-0 py-2.5 text-[var(--ink)] placeholder:text-[var(--mute)] focus:border-[var(--accent)] focus:outline-none focus:ring-0';

const Contact = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<State>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    try {
      const response = await fetch('https://formspree.io/f/xwpbjboa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setState('sent');
    } catch {
      setState('error');
    }
  };

  const contactLink = 'inline-flex items-center gap-3 text-lg text-[var(--ink)] transition-colors hover:text-[var(--accent)]';

  return (
    <Section id="contact" kicker={t('contact.kicker')} title={t('contact.title')} intro={t('contact.description')}>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <ul className="space-y-5">
          <li>
            <a href={`mailto:${links.email}`} className={contactLink}>
              <Mail className="h-5 w-5 text-[var(--mute)]" /> {links.email}
            </a>
          </li>
          <li>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={contactLink}>
              <Linkedin className="h-5 w-5 text-[var(--mute)]" /> linkedin.com/in/mcorpasmanzano
            </a>
          </li>
          <li>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className={contactLink}>
              <Github className="h-5 w-5 text-[var(--mute)]" /> github.com/macorman06
            </a>
          </li>
        </ul>

        <form onSubmit={handleSubmit} className="space-y-7">
          <label className="block text-sm font-semibold text-[var(--mute)]">
            {t('contact.form.name')}
            <input name="name" type="text" autoComplete="name" required className={field} />
          </label>
          <label className="block text-sm font-semibold text-[var(--mute)]">
            {t('contact.form.email')}
            <input name="email" type="email" autoComplete="email" required className={field} />
          </label>
          <label className="block text-sm font-semibold text-[var(--mute)]">
            {t('contact.form.message')}
            <textarea name="message" rows={4} required className={`${field} resize-none`} />
          </label>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="submit"
              disabled={state === 'sending'}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {state === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
            </button>
            <p role="status" className="text-sm text-[var(--mute)]">
              {state === 'sent' && t('contact.form.sent')}
              {state === 'error' && t('contact.form.error')}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default Contact;
