import { Listbox } from '@headlessui/react'
import { Check, ChevronUpDown } from 'lucide-react'

const languages = [
  { id: 'es', name: 'Español', flag: 'fi fi-es' },
  { id: 'en', name: 'English', flag: 'fi fi-gb' },
]

export default function LanguageSelector({ language, setLanguage }) {
  return (
    <Listbox value={language} onChange={setLanguage}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-800 py-2 pl-8 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <span className="block truncate">{languages.find(l => l.id === language).name}</span>
          <span className="absolute inset-y-0 left-2 flex items-center">
            <span className={languages.find(l => l.id === language).flag + " w-5 h-5"}></span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg z-50">
          {languages.map((lang) => (
            <Listbox.Option
              key={lang.id}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-8 pr-4 ${
                  active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-gray-100'
                }`
              }
              value={lang.id}
            >
              {({ selected }) => (
                <>
                  <span className="block truncate">{lang.name}</span>
                  <span className="absolute inset-y-0 left-2 flex items-center">
                    <span className={`${lang.flag} w-5 h-5`}></span>
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 right-2 flex items-center">
                      <Check className="h-5 w-5" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
