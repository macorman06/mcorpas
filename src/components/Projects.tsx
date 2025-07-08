import React, { useState } from 'react';
import { ExternalLink, Instagram, X, Github, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

type ProjectStatus = 'En progreso' | 'Terminado' | 'Sin soporte';

interface Project {
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

  const projects: Project[] = [
    {
      title: "Jesper3DMakes",
      description:
        "Lámparas, piezas decorativas y diseños creativos impresos en 3D. Proyectos personalizados para decoración y regalo.",
      cover: "/projects/jesper/jesper_lamp_render.jpg",
      images: [
        "/projects/jesper/jesper_lamp_extra1.jpg",
        "/projects/jesper/jesper_lamp_extra2.jpg",
        "/projects/jesper/jesper_lamp_extra3.jpg",
      ],
      tags: ["3D Printing", "Design", "Handmade", "Jesper3DMakes"],
      instagram: "https://www.instagram.com/jesper3d.makes/",
      date: 2020,
      status: "En progreso",
    },
    {
      title: "Portfolio Website",
      description:
        "Mi sitio web personal hecho con React, Tailwind y Vite. Responsive, multiidioma, SEO optimizado y con contacto funcional.",
      cover: "/projects/portfolio/portfolio.png",
      images: [],
      tags: ["React", "Tailwind CSS", "TypeScript", "Vite"],
      github: "https://github.com/macorman06/mcorpas.git",
      live: "/",
      date: 2025,
      status: "En progreso",
    },
    {
      title: "TFG - Optimización de Rotaciones",
      description:
        "Trabajo de Fin de Grado en Ingeniería Aeroespacial: herramienta para optimizar rotaciones de aeronaves de forma sostenible.",
      cover: "/projects/tfg/tfg_opti.png",
      images: [],
      tags: ["Aerolíneas", "Optimización", "Sostenibilidad", "Python"],
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
    setCurrentIndex(
      (currentIndex - 1 + activeProject.images.length) %
        activeProject.images.length
    );
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    }
    return b.date - a.date; // Más reciente primero
  });

  return (
    <section className="min-h-screen flex pt-16 justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Mis proyectos
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 text-left">
              Aquí muestro una colección de los proyectos, tanto de software como creativos, más recientes y exitosos.
            </p>
          </div>
          <div>
            <button
              onClick={() => setSortBy(sortBy === 'date' ? 'name' : 'date')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
            >
              <Filter className="h-5 w-5 mr-2" />
              Ordenar por {sortBy === 'date' ? 'Nombre' : 'Fecha'}
            </button>
          </div>
        </div>

        <div
          key={index}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-lg transition-shadow duration-300 relative"
        >
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          {/* Chip de fecha arriba derecha */}
          <span className="absolute top-4 right-4 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full">
            {project.date}
          </span>
        
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                project.status === 'En progreso'
                  ? 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200'
                  : project.status === 'Terminado'
                  ? 'bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200'
                  : 'bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            {/* ... resto igual */}
          </div>
        </div>

      {isOpen && activeProject && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <button
            onClick={closeGallery}
            className="absolute top-8 right-8 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={prevSlide}
            className="absolute left-8 text-white hover:text-gray-300 text-4xl"
          >
            &#10094;
          </button>
          <img
            src={activeProject.images[currentIndex]}
            alt="Gallery"
            className="max-h-[80vh] w-auto rounded-lg shadow-xl"
          />
          <button
            onClick={nextSlide}
            className="absolute right-8 text-white hover:text-gray-300 text-4xl"
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
