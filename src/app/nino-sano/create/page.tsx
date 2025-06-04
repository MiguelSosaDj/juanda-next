import type { Metadata } from 'next';
import NinoSanoForm from '@/components/NinoSanoForm';

export const metadata: Metadata = {
  title: 'Crear Registro Niño Sano',
  description: 'Registrar nuevo niño sano en el sistema',
};

export default function CreateNinoSanoPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear Registro Niño Sano</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <NinoSanoForm data={{ id: 0, alimentacion: '' /* Add appropriate values for id and alimentacion */ }} />
      </div>
    </div>
  );
}