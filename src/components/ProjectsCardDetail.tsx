import React, { useState } from 'react';
import { Instagram, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../Projects';

interface ProjectCardDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectCardDetail: React.FC<ProjectCardDetailProps> = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasGallery = project.images && project.images.length > 0;

  const nextSlide = () => {
    if (!hasGallery) return;
    setCurrentIndex((currentIndex + 1) % project.images.length);
  };

  const prevSlide = () => {
    if (!hasGallery) return;
    setCurrentIndex((currentIndex - 1 + project.images.length) % project.images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-3xl w-full p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Evita cerrar cuando clicas dentro
      >
        {/* Imagen superior siempre la cover */}
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Info principal */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
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
          <span className="ml-auto px-2 py-1 text-xs bg-gray-300 dark:bg-gray-700 rounded-full">
            {project.date}
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {project.instagram && (
            <a
              href={project.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300"
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
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <ExternalLink className="h-5 w-5 mr-1" />
                  Ir al Home
                </Link>
              ) : (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <ExternalLink className="h-5 w-5 mr-1" />
                  Ver Web
                </a>
              )}
            </>
          )}
        </div>

        {/* Carrusel final */}
        {hasGallery && (
          <div className="relative">
            <img
              src={project.images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full max-h-96 object-contain rounded-lg"
            />
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-full p-2"
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-full p-2"
            >
              &#10095;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCardDetail;
