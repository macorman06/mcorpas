import 'flag-icons/css/flag-icons.min.css';
import { i18n } from '../i18n'; // o tu setup de i18n

const changeLanguage = (lng) => i18n.changeLanguage(lng);

<div className="flex items-center space-x-4">
  <button
    onClick={() => changeLanguage('es')}
    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
  >
    <span className="fi fi-es w-5 h-5"></span>
  </button>

  <button
    onClick={() => changeLanguage('en')}
    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
  >
    <span className="fi fi-gb w-5 h-5"></span>
  </button>

  <button
    onClick={toggleTheme}
    className="
      p-2 rounded-lg
      bg-gray-100 dark:bg-gray-800
      hover:bg-gray-200 dark:hover:bg-gray-700
      text-gray-700 dark:text-gray-300
      transition-colors shadow-sm
    "
  >
    {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
  </button>
</div>
