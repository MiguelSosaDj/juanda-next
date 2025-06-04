import type { Metadata } from 'next';
import GestanteForm from '@/components/GestanteForm';
import { fetchGestanteInfo } from '@/lib/api';

type Props = {
  params: { gestanteId: string }
};

export const metadata: Metadata = {
  title: 'Editar Registro Gestante',
  description: 'Editar información de paciente gestante',
};

export default async function GestantePage({ params }: Props) {
  const data = await fetchGestanteInfo(params.gestanteId);
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Registro Gestante</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <GestanteForm data={data} gestanteId={params.gestanteId} />
      </div>
    </div>
  );
}
