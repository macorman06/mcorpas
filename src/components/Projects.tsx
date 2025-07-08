import React from 'react';
import { X, Instagram, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../Projects'; // Ajusta ruta según tu estructura

interface ProjectCardDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectCardDetail: React.FC<ProjectCardDetailProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-3xl w-full p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

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
        </div>
      </div>
    </div>
  );
};

export default ProjectCardDetail;
