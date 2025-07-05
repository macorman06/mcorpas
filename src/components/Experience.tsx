import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Briefcase, Users, FlagCheckered, FileText } from 'lucide-react';

const Experience = () => {
  const { t } = useTranslation();

  const experienceData = [
    {
      icon: Briefcase,
      title: "Cisneria Engineering",
      description: "Backend Developer (Python) para Tail Assigner, optimizando asignación de aeronaves para Vueling y Air Nostrum. Análisis de datos, automatización de procesos y soporte básico en Angular y SQL.",
      items: [
        "Desarrollo de APIs en Python",
        "Automatización de planificación táctica",
        "Colaboración con frontend en Angular",
        "Consultas SQL básicas"
      ]
    },
    {
      icon: Users,
      title: "Centro Juvenil Salesianos Parla",
      description: "Animador juvenil y monitor de ocio desde 2018. Acompaño y apoyo a jóvenes en su desarrollo personal, organizo actividades y fomento el trabajo en equipo.",
      items: [
        "Mentoría y acompañamiento",
        "Organización de actividades",
        "Trabajo con jóvenes en riesgo de exclusión",
        "Voluntariado salesiano"
      ]
    },
    {
      icon: FlagCheckered,
      title: "Ü Motorsport - URJC",
      description: "Aerodynamics Designer del equipo de Formula Student. Diseño y optimización de piezas aerodinámicas con SolidWorks y simulaciones CFD en Ansys Fluent.",
      items: [
        "Diseño CAD de componentes",
        "Simulaciones CFD",
        "Optimización aerodinámica",
        "Trabajo en equipo multidisciplinar"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Experiencia
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 text-left">
            Un vistazo a mi trayectoria profesional, voluntariado y proyectos universitarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-2xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <exp.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {exp.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {exp.description}
              </p>
              <ul className="space-y-3">
                {exp.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
