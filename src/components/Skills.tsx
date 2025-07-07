import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { Code, Layers, Palette, FileText } from 'lucide-react';

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
        {
          category: 'Frontend',
          icons: [
            { icon: 'logos:react', name: 'React' },
            { icon: 'logos:tailwindcss-icon', name: 'Tailwind CSS' },
            { icon: 'logos:typescript-icon', name: 'TypeScript' }
          ]
        },
        {
          category: 'Backend',
          icons: [
            { icon: 'logos:python', name: 'Python' },
            { icon: 'logos:postgresql', name: 'PostgreSQL' },
            { icon: 'logos:postman-icon', name: 'Postman' },
            { icon: 'logos:api', name: 'ApiDog' }
          ]
        },
        {
          category: 'Diseño',
          icons: [
            { icon: 'logos:figma', name: 'Figma' },
            { icon: 'logos:adobe-illustrator', name: 'Adobe Illustrator' },
            { icon: 'simple-icons:autodesk', name: 'Fusion 360' }
          ]
        }
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
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-2xl hover:shadow-lg transition-shadow duration-300"
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

              {/* Render agrupado solo para herramientas */}
              {skill.title === t('skills.toolsIUse') ? (
                <div className="space-y-6">
                  {skill.items.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {group.category}
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {group.icons.map((tool, toolIndex) => (
                          <Icon
                            key={toolIndex}
                            icon={tool.icon}
                            className="w-8 h-8"
                            title={tool.name}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-1.5 border border-gray-600 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 transition-colors"
          >
            <FileText className="h-6 w-5 mr-2" />
            {t('hero.viewProjects')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Skills;
