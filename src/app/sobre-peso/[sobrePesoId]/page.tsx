import type { Metadata } from 'next';
import SobrePesoForm from '@/components/SobrePesoForm';
import { fetchSobrePesoInfo } from '@/lib/api';

type Props = {
  params: { sobrePesoId: string }
};

export const metadata: Metadata = {
  title: 'Editar Registro Sobre Peso',
  description: 'Editar información del paciente con sobre peso',
};

export default async function SobrePesoPage({ params }: Props) {
  const data = await fetchSobrePesoInfo(params.sobrePesoId);
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Registro Sobrepeso</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <SobrePesoForm data={data} sobrePesoId={params.sobrePesoId} />
      </div>
    </div>
  );
}
