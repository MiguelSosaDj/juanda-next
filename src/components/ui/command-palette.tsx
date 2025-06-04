'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Combobox, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const actions = [
  { id: 1, name: 'Crear Alumno', href: '/alumno/create' },
  { id: 2, name: 'Crear Gestante', href: '/gestante/create' },
  { id: 3, name: 'Crear Lactante', href: '/lactante/create' },
  { id: 4, name: 'Crear Bajo Peso', href: '/bajo-peso/create' },
  { id: 5, name: 'Crear Sobre Peso', href: '/sobre-peso/create' },
  { id: 6, name: 'Crear Gemelar', href: '/gemelar/create' },
  { id: 7, name: 'Configuración', href: '/settings' },
  { id: 8, name: 'Perfil', href: '/profile' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const filteredActions = query === ''
    ? actions
    : actions.filter((action) =>
        action.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );

  const handleSelect = (action: typeof actions[0]) => {
    setIsOpen(false);
    router.push(action.href);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm" />
        </Transition.Child>

        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="relative max-w-xl mx-auto bg-gray-800 rounded-xl shadow-2xl ring-1 ring-gray-700"
            onChange={handleSelect}
          >
            <div className="flex items-center px-4">
              <MagnifyingGlassIcon
                className="h-6 w-6 text-gray-500"
                aria-hidden="true"
              />
              <Combobox.Input
                className="w-full border-0 bg-transparent px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Buscar..."
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>

            {filteredActions.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 overflow-y-auto border-t border-gray-700 py-4 text-sm"
              >
                {filteredActions.map((action) => (
                  <Combobox.Option
                    key={action.id}
                    value={action}
                    className={({ active }) =>
                      `px-4 py-2 cursor-pointer ${
                        active ? 'bg-gray-700 text-white' : 'text-gray-300'
                      }`
                    }
                  >
                    {action.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}