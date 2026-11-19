import { ReactNode } from 'react';

interface Props {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
  intro?: ReactNode;
}

const Section = ({ id, kicker, title, intro, children }: Props) => (
  <section id={id} className="border-t border-[var(--line)] py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-[14rem_1fr] md:gap-16">
        <div>
          <p className="section-kicker md:sticky md:top-24">{kicker}</p>
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[var(--ink)] [text-wrap:balance] md:text-5xl">
            {title}
          </h2>
          {intro && <div className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--mute)]">{intro}</div>}
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </div>
  </section>
);

export default Section;
