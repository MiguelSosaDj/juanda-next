import type { Metadata } from 'next';
import BajoPesoForm from '@/components/BajoPesoForm';

export const metadata: Metadata = {
  title: 'Crear Registro Bajo Peso',
  description: 'Registrar nuevo paciente con bajo peso',
};

export default function CreateBajoPesoPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear Registro Bajo Peso</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <BajoPesoForm />
      </div>
    </div>
  );
}