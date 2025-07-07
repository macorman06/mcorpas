import React from 'react';
import { FileText, Briefcase, Users, Flag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ExperienceCard from './ExperienceCard';

const Experience = () => {
  const { t } = useTranslation();

  const experienceData = t('experience.jobs', { returnObjects: true });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('experience.title')}
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 text-left">
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {experienceData.map((exp: any, index: number) => (
            <ExperienceCard
              key={index}
              icon={
                index === 0 ? Briefcase : index === 1 ? Users : Flag
              }
              title={exp.title}
              company={exp.company}
              description={exp.description}
              items={exp.items}
              date={exp.date}
            />
          ))}
        </div>

        <div className="text-center mt-16 flex flex-wrap justify-center gap-4">
          <a
            href="/CV_MarcosCorpas_ES.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-1.5 border border-gray-600 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 transition-colors"
          >
            🇪🇸
            <span className="ml-2">Ver CV Español</span>
          </a>
          <a
            href="/CV_MarcosCorpas_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-1.5 border border-gray-600 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 transition-colors"
          >
            🇬🇧
            <span className="ml-2">View CV English</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Experience;
