'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Algo salió mal
        </h2>
        <p className="text-gray-400 mb-8">
          {error.message || 'Ha ocurrido un error inesperado'}
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Volver al inicio
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    </div>
  );
}