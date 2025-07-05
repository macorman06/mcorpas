import React from 'react';
import { Helmet } from 'react-helmet';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contacto - Marcos Corpas</title>
        <meta name="description" content="¿Tienes un proyecto en mente? Contacta conmigo para discutir tu próximo desarrollo web o aplicación móvil." />
        <meta property="og:title" content="Contacto - Marcos Corpas" />
        <meta property="og:description" content="¿Tienes un proyecto en mente? Contacta conmigo para discutir tu próximo desarrollo web o aplicación móvil." />
      </Helmet>
      <div>
        <Contact />
      </div>
    </>
  );
};

export default ContactPage;