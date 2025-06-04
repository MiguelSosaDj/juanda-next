import type { Metadata } from 'next';
import LactanteForm from '@/components/LactanteForm';
import { fetchLactanteInfo } from '@/lib/api';

type Props = {
  params: { lactanteId: string }
};

export const metadata: Metadata = {
  title: 'Editar Registro Lactante',
  description: 'Editar información del lactante',
};

export default async function LactantePage({ params }: Props) {
  const data = await fetchLactanteInfo(params.lactanteId);
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Registro Lactante</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <LactanteForm data={data} lactanteId={params.lactanteId} />
      </div>
    </div>
  );
}
