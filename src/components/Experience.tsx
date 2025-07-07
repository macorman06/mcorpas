import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Briefcase, Users, FlagCheckered, FileText } from 'lucide-react';
import ExperienceCard from './ExperienceCard';

const Experience = () => {
  const { t } = useTranslation();

  const experienceData = [
    {
      icon: Briefcase,
      title: "Cisneria Engineering",
      description: "Aquí irá la descripción de Cisneria...",
      items: [
        "Responsabilidad 1",
        "Responsabilidad 2",
        "Responsabilidad 3"
      ],
    },
    {
      icon: Users,
      title: "Centro Juvenil",
      description: "Aquí irá la descripción del centro juvenil...",
      items: [
        "Responsabilidad 1",
        "Responsabilidad 2",
        "Responsabilidad 3"
      ],
    },
    {
      icon: FlagCheckered,
      title: "Ü Motorsport",
      description: "Aquí irá la descripción de Ü Motorsport...",
      items: [
        "Responsabilidad 1",
        "Responsabilidad 2",
        "Responsabilidad 3"
      ],
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('skills.title') || "Mi Experiencia"}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 text-left">
            {t('skills.subtitle') || "Un resumen de mi trayectoria profesional, voluntaria y académica."}
          </p>
        </div>

        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={index}
              icon={exp.icon}
              title={exp.title}
              description={exp.description}
              items={exp.items}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-1.5 border border-gray-600 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 transition-colors"
          >
            <FileText className="h-6 w-5 mr-2" />
            {t('hero.viewProjects') || "Ver Proyectos"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Experience;
