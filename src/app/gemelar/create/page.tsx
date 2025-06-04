import type { Metadata } from 'next';
import GemelarForm from '@/components/GemelarForm';

export const metadata: Metadata = {
  title: 'Crear Registro Gemelar',
  description: 'Registrar nuevo caso gemelar',
};

export default function CreateGemelarPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear Registro Gemelar</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <GemelarForm />
      </div>
    </div>
  );
}