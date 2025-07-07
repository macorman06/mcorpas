import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ExperienceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  icon: Icon,
  title,
  description,
  items,
}) => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="flex-shrink-0 flex items-start justify-center md:mr-6 mb-4 md:mb-0">
        <Icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start text-gray-700 dark:text-gray-300"
            >
              <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
