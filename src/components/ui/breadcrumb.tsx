'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

const pathNames: Record<string, string> = {
  'alumno': 'Alumnos',
  'gestante': 'Gestantes',
  'lactante': 'Lactantes',
  'bajo-peso': 'Bajo Peso',
  'sobre-peso': 'Sobre Peso',
  'gemelar': 'Gemelar',
  'create': 'Crear',
  'edit': 'Editar',
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname ? pathname.split('/').filter(Boolean) : [];

  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const label = pathNames[path] || path;
    const isLast = index === paths.length - 1;

    return { href, label, isLast };
  });

  return (
    <nav className="mb-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <HomeIcon className="h-4 w-4" />
          </Link>
        </li>
        {breadcrumbs.map(({ href, label, isLast }) => (
          <li key={href} className="flex items-center">
            <ChevronRightIcon className="h-4 w-4 text-gray-600 mx-1" />
            {isLast ? (
              <span className="text-white font-medium">{label}</span>
            ) : (
              <Link
                href={href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}