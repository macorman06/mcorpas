import React from 'react';
import { X, Instagram, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from './Projects'; // Ajusta la ruta

interface ProjectCardDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectCardDetail: React.FC<ProjectCardDetailProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl max-w-3xl w-full p-6 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        <img src={project.cover} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-blue-200 rounded-full text-xs">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCardDetail;
