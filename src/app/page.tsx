import Link from "next/link";

export default function DashboardPage() {
  const sections = [
    { href: "/nino-sano/create", label: "Niño Sano", description: "Gestionar registros de niños sanos" },
    { href: "/gestante/create", label: "Gestante", description: "Control y seguimiento de gestantes" },
    { href: "/lactante/create", label: "Lactante", description: "Registro y control de lactantes" },
    { href: "/bajo-peso/create", label: "Bajo Peso", description: "Seguimiento de casos de bajo peso" },
    { href: "/sobre-peso/create", label: "Sobre Peso", description: "Control de pacientes con sobre peso" },
    { href: "/gemelar/create", label: "Gemelar", description: "Gestión de casos gemelares" },
    { href: "/alumno/create", label: "Alumnos", description: "Administración de alumnos" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col p-4">
        <div className="text-2xl font-bold text-blue-600 mb-8">Dashboard</div>
        <nav className="flex flex-col gap-3">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-600 dark:hover:text-white transition">
              {section.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Bienvenido al Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{section.label}</h2>
              <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-blue-600 dark:text-blue-400 text-sm">Crear nuevo registro →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
