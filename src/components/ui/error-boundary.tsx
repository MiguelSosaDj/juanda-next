import { useCallback } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const handleRetry = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-xl font-semibold text-red-400 mb-4">
        Algo salió mal
      </h2>
      <p className="text-gray-400 mb-4">
        {error.message || 'Ha ocurrido un error inesperado'}
      </p>
      <button
        onClick={handleRetry}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}