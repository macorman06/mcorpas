import React from 'react';
import { Helmet } from 'react-helmet';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Proyectos - Marcos Corpas</title>
        <meta name="description" content="Proyectos de Marcos Corpas: optimización, backend Python, web y diseño 3D." />
        <meta property="og:title" content="Proyectos - Marcos Corpas" />
        <meta property="og:description" content="Proyectos de Marcos Corpas: optimización, backend Python, web y diseño 3D." />
      </Helmet>
      <div className="pt-16">
        <Projects />
      </div>
    </>
  );
};

export default ProjectsPage;