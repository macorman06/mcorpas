export type ProjectStatus = 'En progreso' | 'Activo' | 'Terminado' | 'Sin soporte';

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
  date: number;
  status: ProjectStatus;
}
