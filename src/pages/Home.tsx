import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Marcos Corpas - Desarrollador Full Stack</title>
        <meta name="description" content="Desarrollador Full Stack especializado en React, Node.js y diseño UI/UX. Creando experiencias digitales modernas y funcionales." />
        <meta property="og:title" content="Marcos Corpas - Desarrollador Full Stack" />
        <meta property="og:description" content="Desarrollador Full Stack especializado en React, Node.js y diseño UI/UX. Creando experiencias digitales modernas y funcionales." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marcoscorpas.dev" />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>
      <Hero />
      <Skills />
      <div className="border-t border-gray-200 dark:border-gray-700 my-12 mx-auto w-1/2"></div>
      <Experience />

    </>
  );
};

export default Home;