import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">🏥 Sistema Nutricional</h1>

      <div className="grid grid-cols-2 gap-6 text-blue-700 font-medium">
        <Link href="/nino-sano/1" className="hover:underline">🧒 Niño Sano</Link>
        <Link href="/gestante/1" className="hover:underline">🤰 Gestante</Link>
        <Link href="/lactante/1" className="hover:underline">🍼 Lactante</Link>
        <Link href="/bajo-peso/1" className="hover:underline">⚖️ Bajo Peso</Link>
        <Link href="/sobre-peso/1" className="hover:underline">📊 Sobre Peso</Link>
        <Link href="/gemelar/1" className="hover:underline">👶👶 Gemelar</Link>
        <Link href="/alumno/1" className="hover:underline">🏋️‍♂️ Alumnos</Link>
      </div>

      <p className="mt-8 text-sm text-gray-500">* Los ID son de ejemplo, luego conectaremos listados dinámicos.</p>
    </div>
  );
}
