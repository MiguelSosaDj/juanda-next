import type { Metadata } from 'next';
import NinoSanoForm from '@/components/NinoSanoForm';
import { fetchNinoSanoInfo } from '@/lib/api';

type Props = {
  params: { ninoId: string }
};

export const metadata: Metadata = {
  title: 'Editar Registro Niño Sano',
  description: 'Editar información del niño sano',
};

export default async function NinoSanoPage({ params }: Props) {
  const rawData = await fetchNinoSanoInfo(params.ninoId);
  const data = {
    ...rawData,
    pt: rawData.pt ?? undefined,
    te: rawData.te ?? undefined,
    pce: rawData.pce ?? undefined,
    clasificacionPt: rawData.clasificacionPt ?? undefined,
    clasificacionTe: rawData.clasificacionTe ?? undefined,
    clasificacionPce: rawData.clasificacionPce ?? undefined,
    fechaCreacion: rawData.fechaCreacion ?? undefined,
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Registro Niño Sano</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <NinoSanoForm data={data} ninoId={params.ninoId} />
      </div>
    </div>
  );
}
