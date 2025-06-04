import type { Metadata } from 'next';
import GemelarForm from '@/components/GemelarForm';
import { fetchGemelarInfo } from '@/lib/api';

type GemelarInfo = {
  id: number;
  baseInfoId: number;
  gramosSemana: number;
  ganancia1Trimestre: number;
  ganancia2y3TrimestreGramos: number;
  ganancia2y3TrimestreKg: number;
  pesoTotalEmbarazo: number;
  imcSemana40: number;
  clasificacionGramos: string;
  imcPregestacional?: number;
  pesoPregestacional?: number;
  gananciaRecomendada?: number;
  gananciaMinima?: number;
  gananciaMaxima?: number;
  pesoActual?: number;
  semanasGestacion?: number;
  gananciaActual?: number;
  clasificacionGanancia?: string;
  gananciaSemanal?: number;
  pesoObjetivo?: number;
  semanasFaltantes?: number;
  gramosPorSemana?: number;
  requerimientoEnergetico?: number;
  proteinasRecomendadas?: number;
  hidratosRecomendados?: number;
  grasasRecomendadas?: number;
};

type Props = {
  params: { gemelarId: string }
};

export const metadata: Metadata = {
  title: 'Editar Registro Gemelar',
  description: 'Editar información del caso gemelar',
};

export default async function GemelarPage({ params }: Props) {
  const gemelarData: GemelarInfo = await fetchGemelarInfo(params.gemelarId);
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Registro Gemelar</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <GemelarForm data={gemelarData} gemelarId={params.gemelarId} />
      </div>
    </div>
  );
}
