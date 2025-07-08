import React, { useState } from 'react';
import { ExternalLink, Instagram, X, Github, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCardDetail from './ProjectCardDetail'; // Ruta correcta

export type ProjectStatus = 'En progreso' | 'Terminado' | 'Sin soporte';

export interface Project {
  title: string;
  description: string;
  cover: string;
  images: string[];
  tags: string[];
  instagram?: string;
  github?: string;
  live?: string;
  date: number;
  status: ProjectStatus;
}

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [activeCardProject, setActiveCardProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "Jesper3DMakes",
      description: "Lámparas y decoración 3D.",
      cover: "/projects/jesper/jesper_lamp_render.jpg",
      images: [
        "/projects/jesper/jesper_lamp_extra1.jpg",
        "/projects/jesper/jesper_lamp_extra2.jpg",
      ],
      tags: ["3D Printing", "Design"],
      instagram: "https://www.instagram.com/jesper3d.makes/",
      date: 2020,
      status: "En progreso",
    },
    {
      title: "Portfolio Website",
      description: "Mi web personal con React y Tailwind.",
      cover: "/projects/portfolio/portfolio.png",
      images: [],
      tags: ["React", "Tailwind CSS"],
      github: "https://github.com/macorman06/mcorpas.git",
      live: "/",
      date: 2025,
      status: "En progreso",
    },
    {
      title: "TFG - Rotaciones",
      description: "TFG optimización de rotaciones de aeronaves.",
      cover: "/projects/tfg/tfg_opti.png",
      images: [],
      tags: ["Aerolíneas", "Python"],
      live: "https://tfg-9db.pages.dev/",
      date: 2025,
      status: "Terminado",
    },
  ];

  const openGallery = (project: Project) => {
    setActiveProject(project);
    setIsOpen(true);
    setCurrentIndex(0);
  };

  const closeGallery = () => {
    setIsOpen(false);
    setActiveProject(null);
  };

  const nextSlide = () => {
    if (!activeProject) return;
    setCurrentIndex((currentIndex + 1) % activeProject.images.length);
  };

  const prevSlide = () => {
    if (!activeProject) return;
    setCurrentIndex((currentIndex - 1 + activeProject.images.length) % activeProject.images.length);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    return sortBy === 'name' ? a.title.localeCompare(b.title) : b.date - a.date;
  });

  return (
    <section className="min-h-screen flex pt-16 justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Mis proyectos</h2>
            <p className="text-base text-gray-600 dark:text-gray-300">Aquí muestro una colección de proyectos recientes.</p>
          </div>
          <button
            onClick={() => setSortBy(sortBy === 'date' ? 'name' : 'date')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Filter className="h-5 w-5 mr-2" />
            Ordenar por {sortBy === 'date' ? 'Nombre' : 'Fecha'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => setActiveCardProject(project)}
              className="relative cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-lg"
            >
              <img src={project.cover} alt={project.title} className="w-full h-48 object-cover" />
              <span className="absolute top-4 right-4 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full">
                {project.date}
              </span>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'En progreso'
                      ? 'bg-green-200 dark:bg-green-700 text-green-800'
                      : project.status === 'Terminado'
                      ? 'bg-blue-200 dark:bg-blue-700 text-blue-800'
                      : 'bg-red-200 dark:bg-red-700 text-red-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCardProject && (
        <ProjectCardDetail
          project={activeCardProject}
          onClose={() => setActiveCardProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
