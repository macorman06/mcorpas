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
        "Desarrollo de APIs en Python.",
        "Automatización de procesos de planificación.",
        "Consultas y análisis de datos en SQL.",
        "Colaboración con frontend Angular."
      ],
      date: "2023 – Presente",
    },
    {
      icon: Users,
      title: "Monitor de tiempo libre y catequista",
      company: "Juveliber | Salesianos Parla",
      description:
        "Monitor de ocio educativo y voluntariado. Gestión de actividades para jóvenes, catequesis y trabajo en equipo.",
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
      company: "Ü Motorsport URJC",
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
            De la ingeniería al voluntariado: soluciones prácticas y trabajo con personas.
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
      </div>
    </section>
  );
};

export default Experience;
