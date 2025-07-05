import React from 'react';
import { Helmet } from 'react-helmet';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Proyectos - Marcos Corpas</title>
        <meta name="description" content="Explora mis proyectos de desarrollo web y aplicaciones móviles. Trabajos realizados con React, Node.js, TypeScript y más." />
        <meta property="og:title" content="Proyectos - Marcos Corpas" />
        <meta property="og:description" content="Explora mis proyectos de desarrollo web y aplicaciones móviles. Trabajos realizados con React, Node.js, TypeScript y más." />
      </Helmet>
      <div className="pt-16">
        <Projects />
      </div>
    </>
  );
};

export default ProjectsPage;