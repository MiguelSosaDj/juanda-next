import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-400 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}