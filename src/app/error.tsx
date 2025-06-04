'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Algo salió mal
        </h2>
        <p className="text-gray-400 mb-8">
          {error.message || 'Ha ocurrido un error inesperado'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}