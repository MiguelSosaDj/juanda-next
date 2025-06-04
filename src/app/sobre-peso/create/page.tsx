import type { Metadata } from 'next';
import SobrePesoForm from '@/components/SobrePesoForm';

export const metadata: Metadata = {
  title: 'Crear Registro Sobre Peso',
  description: 'Registrar nuevo paciente con sobre peso',
};

export default function CreateSobrePesoPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear Registro Sobre Peso</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <SobrePesoForm />
      </div>
    </div>
  );
}