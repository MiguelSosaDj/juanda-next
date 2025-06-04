import type { Metadata } from 'next';
import LactanteForm from '@/components/LactanteForm';

export const metadata: Metadata = {
  title: 'Crear Registro Lactante',
  description: 'Registrar nuevo lactante en el sistema',
};

export default function CreateLactantePage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear Registro Lactante</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <LactanteForm />
      </div>
    </div>
  );
}