export type ProjectStatus = 'En progreso' | 'Activo' | 'Terminado' | 'Terminado · 9,5' | 'Sin soporte';

export interface TechIcon {
  icon: string;
  name: string;
}

export interface Project {
  title: string;
  description: string;
  detailedDescription?: string;
  cover: string;
  images: string[];
  tags: string[];
  techIcons?: TechIcon[];
  instagram?: string;
  github?: string;
  live?: string;
  /** Same-origin PDF (e.g. thesis), not an external link */
  pdf?: string;
  date: number;
  status: ProjectStatus;
}
