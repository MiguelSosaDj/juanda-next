'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface ActionMenuProps {
  actions: Action[];
}

export default function ActionMenu({ actions }: ActionMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
        <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-gray-800 border border-gray-700 shadow-lg focus:outline-none">
          <div className="py-1">
            {actions.map((action, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={action.onClick}
                    className={`
                      w-full text-left px-4 py-2 text-sm flex items-center space-x-2
                      ${active ? 'bg-gray-700' : ''}
                      ${action.variant === 'danger' 
                        ? 'text-red-400 hover:text-red-300' 
                        : 'text-gray-300 hover:text-white'
                      }
                    `}
                  >
                    {action.icon && <span className="h-5 w-5">{action.icon}</span>}
                    <span>{action.label}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}