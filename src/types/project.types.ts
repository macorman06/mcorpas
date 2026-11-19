export interface Localized {
  es: string;
  en: string;
}

export type ProjectKind = 'engineering' | 'personal';

export interface Project {
  id: string;
  title: string;
  kind: ProjectKind;
  /** Free text so it can be a range ("2024 – hoy") or omitted when unknown. */
  year?: string;
  status: Localized;
  /** One line: what it is. Shown in the list. */
  summary: Localized;
  /** Two to four short facts, shown in the detail panel. */
  facts: Localized[];
  /** What I actually did, stated plainly. */
  role: Localized;
  /** Built mostly through AI-assisted coding: shown as a visible label. */
  aiAssisted?: boolean;
  stack: string[];
  cover?: string;
  /** Alt text for the cover image. */
  coverAlt?: Localized;
  images?: string[];
  links?: {
    pdf?: string;
    instagram?: string;
    github?: string;
    live?: string;
  };
}
