import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Code, Layers, Smartphone, Database, Settings, Palette, FileText } from 'lucide-react';

const Skills = () => {
  const { t } = useTranslation();

  const skillsData = [
    {
      icon: Code,
      title: t('skills.whatICanDo'),
      description: t('skills.whatICanDoDesc'),
      items: [
        t('skills.services.uiux'),
        t('skills.services.fullstack'),
        t('skills.services.mobile'),
        t('skills.services.database'),
        t('skills.services.api')
      ]
    },
    {
      icon: Layers,
      title: t('skills.toolsIUse'),
      description: t('skills.toolsIUseDesc'),
      items: [
        `${t('skills.tools.frontend')} ${t('skills.tools.frontendList')}`,
        `${t('skills.tools.backend')} ${t('skills.tools.backendList')}`,
        `${t('skills.tools.design')} ${t('skills.tools.designList')}`
      ]
    },
    {
      icon: Palette,
      title: t('skills.uiuxDesign'),
      description: t('skills.uiuxDesignDesc'),
      items: [
        t('skills.designSkills.userCentered'),
        t('skills.designSkills.modern'),
        t('skills.designSkills.responsive'),
        t('skills.designSkills.wireframes')
      ]
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('skills.title')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 text-left">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <skill.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {skill.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {skill.description}
              </p>
              <ul className="space-y-3">
                {skill.items.map((item, itemIndex) => (
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
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Ver Mis Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Skills;