import type { Metadata } from 'next';
import GestanteForm from '@/components/GestanteForm';

export const metadata: Metadata = {
  title: 'Crear Registro Gestante',
  description: 'Registrar nueva paciente gestante',
};

export default function CreateGestantePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear Registro Gestante</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <GestanteForm />
      </div>
    </div>
  );
}