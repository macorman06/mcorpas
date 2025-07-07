import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Marcos Corpas | Ingeniero Aeroespacial & Desarrollador Python</title>
        <meta
          name="description"
          content="Marcos Corpas, Ingeniero Aeroespacial apasionado por la tecnología. Desarrollo backend en Python, aplicaciones fullstack con React y diseño 3D creativo. Uniendo funcionalidad, diseño y utilidad en cada proyecto."
        />
      
        <meta property="og:title" content="Marcos Corpas | Ingeniero Aeroespacial & Desarrollador Python" />
        <meta
          property="og:description"
          content="Marcos Corpas, Ingeniero Aeroespacial apasionado por la tecnología. Desarrollo backend en Python, aplicaciones fullstack con React y diseño 3D creativo."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mcorpas.pages.dev/" />
        <meta property="og:site_name" content="Marcos Corpas" />
        <meta property="og:image" content="https://mcorpas.pages.dev/profile/avatar_mcorpas.png" />

      </Helmet>
      <Hero />
      <div className="border-t border-gray-200 dark:border-gray-700 w-full"></div>
      <Skills />
      <div className="border-t border-gray-200 dark:border-gray-700 w-full"></div>
      <Experience />

    </>
  );
};

export default Home;