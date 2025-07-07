import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Flag, FileText } from 'lucide-react';
import ExperienceCard from './ExperienceCard';

const Experience = () => {
  const experienceData = [
    {
      icon: Briefcase,
      title: "Backend Developer",
      company: "Cisneria Engineering",
      description:
        "Desarrollo backend en Tail Assigner, una herramienta de optimización para asignación de aeronaves. Soporte a Vueling y Air Nostrum.",
      items: [
        "Desarrollo de APIs en Python",
        "Automatización de procesos de planificación",
        "Consultas y análisis de datos en SQL",
        "Colaboración con frontend Angular"
      ],
      date: "2022 – Presente",
    },
    {
      icon: Users,
      title: "Monitor de tiempo libre y catequista",
      company: "Centro Juvenil Salesianos Parla",
      description:
        "Animador de ocio educativo y voluntariado desde 2018. Coordinación de actividades para jóvenes, mentoría y trabajo en equipo.",
      items: [
        "Organización de actividades de tiempo libre.",
        "Acompañamiento de jóvenes y adolescentes.",
        "Voluntariado en proyectos salesianos."
      ],
      date: "2018 – Presente",
    },
    {
      icon: Flag,
      title: "Aerodynamics Designer",
      company: "Ü Motorsport – URJC",
      description:
        "Diseñador de aerodinámica para monoplazas de Formula Student. Diseño CAD y simulaciones CFD.",
      items: [
        "Diseño de piezas con SolidWorks.",
        "Simulación CFD con Ansys Fluent.",
        "Optimización aerodinámica de componentes.",
      ],
      date: "2021 – 2022",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Mi Experiencia
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 text-left">
            Un resumen de mi trayectoria profesional, voluntaria y académica.
          </p>
        </div>

        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={index}
              icon={exp.icon}
              title={exp.title}
              company={exp.company}
              description={exp.description}
              items={exp.items}
              date={exp.date}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-1.5 border border-gray-600 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 transition-colors"
          >
            <FileText className="h-6 w-5 mr-2" />
            Ver Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Experience;
