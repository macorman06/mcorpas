import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ExperienceCardProps {
  icon: LucideIcon;
  title: string;
  company: string;
  description: string;
  items: string[];
  date: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  icon: Icon,
  title,
  company,
  description,
  items,
  date,
}) => {
  return (
    <div className="relative flex flex-col bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-2xl hover:shadow-xl transition-shadow duration-300">
      {/* Encabezado: Icono + Título + Fecha */}
      <div className="flex flex-wrap items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-full font-medium mt-2 md:mt-0">
          {date}
        </span>
      </div>

      {/* Empresa debajo */}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        {company}
      </p>

      {/* Descripción */}
      <p className="text-gray-600 dark:text-gray-200 mb-4">{description}</p>

      {/* Tareas */}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start text-gray-700 dark:text-gray-200"
          >
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceCard;
