import React, { useState } from 'react';
import { ExternalLink, Instagram, Github, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import ProjectCardDetail from './ProjectsCardDetail';
import { Project } from '../types/project.types';
import projectsData from '../data/projectsData.json';

const Projects = () => {
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');
  const [activeCardProject, setActiveCardProject] = useState<Project | null>(null);

  const projects: Project[] = projectsData;

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
            className="inline-flex items-center px-4 py-1.5 border border-gray-600 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 transition-colors"
          >
            <Filter className="h-6 w-5 mr-2" />
            Ordenar por {sortBy === 'date' ? 'Nombre' : 'Fecha'}
          </button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveCardProject(project)}
                className="relative cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <img src={project.cover} alt={project.title} className="w-full h-48 object-cover" />
                <span className="absolute top-4 right-4 px-2 py-1 bg-gray-300 dark:bg-gray-700 text-xs rounded-full text-gray-800 dark:text-gray-200">
                  {project.date}
                </span>

                {/* Content wrapper with flex-grow to push links to bottom */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Title and Status Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">{project.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                      project.status === 'En progreso'
                        ? 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200'
                        : project.status === 'Activo'
                          ? 'bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-emerald-200'
                          : project.status === 'Terminado'
                            ? 'bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200'
                            : 'bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

                  {/* Technology Icons Preview - First 4 */}
                  {project.techIcons && project.techIcons.length > 0 && (
                    <div className="flex items-center gap-3 mb-4">
                      {project.techIcons.slice(0, 4).map((tech, i) => (
                        <div
                          key={i}
                          className="group relative"
                          title={tech.name}
                        >
                          {tech.icon.startsWith('/') || tech.icon.startsWith('http') ? (
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="w-8 h-8 transition-transform duration-200 group-hover:scale-110 object-contain"
                            />
                          ) : (
                            <Icon
                              icon={tech.icon}
                              className="w-8 h-8 transition-transform duration-200 group-hover:scale-110"
                            />
                          )}
                        </div>
                      ))}
                      {project.techIcons.length > 4 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{project.techIcons.length - 4} más
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-xs rounded-full text-blue-800 dark:text-blue-200">{tag}</span>
                    ))}
                  </div>

                  {/* Spacer to push links to bottom */}
                  <div className="flex-grow"></div>

                  {/* Links aligned to the right and at the bottom */}
                  <div className="flex flex-wrap gap-4 justify-end mt-auto">
                    {project.instagram && (
                      <a
                        href={project.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            <ExternalLink className="h-5 w-5 mr-1" /> Ir al Home
                          </Link>
                        ) : (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            <ExternalLink className="h-5 w-5 mr-1" /> Ver Web
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {activeCardProject && (
        <ProjectCardDetail project={activeCardProject} onClose={() => setActiveCardProject(null)} />
      )}
    </section>
  );
};

export default Projects;
