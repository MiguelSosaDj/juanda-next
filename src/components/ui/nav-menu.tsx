import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { href: '/nino-sano', label: 'Niño Sano' },
  { href: '/gestante', label: 'Gestante' },
  { href: '/lactante', label: 'Lactante' },
  { href: '/bajo-peso', label: 'Bajo Peso' },
  { href: '/sobre-peso', label: 'Sobre Peso' },
  { href: '/gemelar', label: 'Gemelar' },
  { href: '/alumno', label: 'Alumnos' },
];

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              🏠 Dashboard
            </Link>
            <div className="flex space-x-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.startsWith(route.href)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/profile"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Perfil
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}