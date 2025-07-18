import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import 'flag-icons/css/flag-icons.min.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      location.pathname === `/es${path}` ||
      location.pathname === `/en${path}`
    );
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-lg font-bold text-gray-900 dark:text-white"
          >
            <i className="pi pi-send text-blue-600 dark:text-blue-400 text-xl"></i>
            <span>MCorpas</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-medium transition-colors ${
                isActive('/projects')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {t('nav.projects')}
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              {/* Bandera del idioma seleccionado */}
              <span className={`fi ${i18n.language === 'es' ? 'fi-es' : 'fi-gb'} w-5 h-5`}></span>

              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="
                  appearance-none
                  px-2 py-2
                  text-sm rounded-lg
                  bg-gray-100 dark:bg-gray-800
                  text-gray-900 dark:text-gray-100
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors shadow-sm
                "
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            <button
              onClick={toggleTheme}
              className="
                p-2 rounded-lg
                bg-gray-100 dark:bg-gray-800
                hover:bg-gray-200 dark:hover:bg-gray-700
                text-gray-700 dark:text-gray-300
                transition-colors shadow-sm
              "
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
