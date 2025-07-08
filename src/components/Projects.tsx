import React, { useState } from 'react';
import { ExternalLink, Instagram, X, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
  {
    title: "Jesper3DMakes",
    description: "...",
    cover: "...",
    images: [...],
    tags: ["3D Printing", "Design", "Handmade", "Jesper3DMakes"],
    instagram: "...",
    startDate: "2020",
    status: "In Progress"
  },
  {
    title: "Portfolio Website",
    description: "...",
    cover: "...",
    images: [],
    tags: ["React", "Tailwind CSS", "TypeScript", "Vite"],
    github: "...",
    live: "/",
    startDate: "2025",
    status: "In Progress"
  },
  {
    title: "TFG - Optimización de Rotaciones",
    description: "...",
    cover: "...",
    images: [],
    tags: ["Aerolíneas", "Optimización", "Sostenibilidad", "Python"],
    live: "...",
    startDate: "2025",
    status: "Completed"
  },
];


  const openGallery = (project: any) => {
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

  return (
    <section className="min-h-screen flex pt-16 justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Mis proyectos
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 text-left">
            Aquí muestro una colección de los proyectos, tanto de software como creativos, más recientes y exitosos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  {project.instagram && (
                    <a
                      href={project.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 transition-colors"
                    >
                      <Instagram className="h-5 w-5 mr-1" />
                      Instagram
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Github className="h-5 w-5 mr-1" />
                      Código
                    </a>
                  )}

                  {project.live && (
                    <>
                      {project.live === "/" ? (
                        <Link
                          to="/"
                          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5 mr-1" />
                          Ir al Home
                        </Link>
                      ) : (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5 mr-1" />
                          Ver Web
                        </a>
                      )}
                    </>
                  )}

                  {project.images && project.images.length > 0 && (
                    <button
                      onClick={() => openGallery(project)}
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 mr-1" />
                      Ver Galería
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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
