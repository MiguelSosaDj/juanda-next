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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block p-6 bg-gray-800 rounded-lg shadow-xl hover:bg-gray-700 transition-colors border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-2">{section.label}</h2>
            <p className="text-gray-400">{section.description}</p>
            <div className="mt-4 flex justify-end">
              <span className="text-blue-400 text-sm">Crear nuevo registro →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
