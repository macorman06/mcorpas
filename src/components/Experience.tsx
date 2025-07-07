import React from 'react';
import { Briefcase, Users, Flag } from 'lucide-react';
import ExperienceCard from './ExperienceCard';

const Experience = () => {
  const experienceData = [
    {
      icon: Briefcase,
      title: "Cisneria Engineering",
      description:
        "Backend Developer (Python) para Tail Assigner. Optimización de asignación de aeronaves para Vueling y Air Nostrum. Análisis de datos y automatización de procesos.",
      items: [
        "Desarrollo de APIs en Python",
        "Automatización de planificación táctica",
        "Consultas SQL básicas",
        "Soporte en frontend Angular"
      ],
    },
    {
      icon: Users,
      title: "Centro Juvenil Salesianos Parla",
      description:
        "Animador juvenil y monitor de ocio educativo. Desde 2018 acompaño a jóvenes en su desarrollo personal y organizo actividades de ocio y tiempo libre.",
      items: [
        "Mentoría y acompañamiento",
        "Organización de actividades",
        "Trabajo en equipo",
        "Voluntariado salesiano"
      ],
    },
    {
      icon: FlagCheckered,
      title: "Ü Motorsport - URJC",
      description:
        "Aerodynamics Designer en el equipo de Formula Student. Diseño y optimización de piezas aerodinámicas para monoplazas eléctricos.",
      items: [
        "Diseño CAD (SolidWorks)",
        "Simulaciones CFD (Ansys Fluent)",
        "Optimización aerodinámica",
        "Trabajo en equipo multidisciplinar"
      ],
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
            Un resumen de mi trayectoria profesional, voluntaria y universitaria.
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
      </div>
    </section>
  );
};

export default Experience;
