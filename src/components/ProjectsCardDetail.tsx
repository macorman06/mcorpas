import React, { useEffect } from 'react';
import { X, ExternalLink, Instagram, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './Projects';

interface ProjectCardDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectCardDetail: React.FC<ProjectCardDetailProps> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>

          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
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

          <div className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line leading-relaxed">
            {project.detailedDescription || project.description}
          </div>

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

          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {project.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4 mb-6">
            {project.instagram && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300"
              >
                <Instagram className="h-5 w-5 mr-1" /> Instagram
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Github className="h-5 w-5 mr-1" /> Código
              </a>
            )}
            {project.live && (
              <>
                {project.live === "/" ? (
                  <Link
                    to="/"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <ExternalLink className="h-5 w-5 mr-1" /> Ir al Home
                  </Link>
                ) : (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <ExternalLink className="h-5 w-5 mr-1" /> Ver Web
                  </a>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectCardDetail;
