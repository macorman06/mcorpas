import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Github, Dribbble, Linkedin, Twitter, Mail, FileText } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"
      style={{ backgroundImage: 'url(/backgrounds/light_background.png)' }}
    >
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-0 overflow-x-hidden">
        <div className="mb-8 w-full">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <img
              src="/profile/avatar_mcorpas.png"
              alt="Marcos Corpas"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto md:mx-0"
            />
            <div>
              <h1 className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white">
                {t('hero.greeting')}
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Marcos
                </span>{' '}
                
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {t('hero.title')}
                </span>
              </h2>
            </div>
          </div>
          <p className="mt-6 text-base md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
            {t('hero.description')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-6">
          {/* Botones */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-1.5 border border-gray-600 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 transition-colors"
            >
              <Mail className="h-6 w-5 mr-2" />
              {t('hero.contactMe')}
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center px-4 py-1.5 border border-gray-600 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 transition-colors"
            >
              <FileText className="h-6 w-5 mr-2" />
              {t('hero.viewProjects')}
            </Link>
          </div>
        
          {/* Separador */}
          <span className="hidden sm:block w-px h-6 bg-gray-400"></span>
        
          {/* Redes */}
          <div className="flex justify-center gap-8">
            <a href="https://github.com/macorman06/macorman06" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/marcos-corpas-manzano-8146391aa/" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>



      </div>
    </section>
  );
};

export default Hero;