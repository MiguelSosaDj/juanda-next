import type { Metadata } from 'next';
import BajoPesoForm from '@/components/BajoPesoForm';

type BajoPesoInfo = {
  id: number;
  name: string;
  weight: number;
  age: number;
  imcSaludable: number;
  pesoPregestacionalSaludable: number;
  gramosSemana: number;
  ganancia1Trimestre: number;
  ganancia2y3TrimestreGramos: number;
  ganancia2y3TrimestreKg: number;
  pesoTotalEmbarazo: number;
  pesoFinal: number;
  gananciaPesoEmbarazo: number;
  gananciaPesoClasificacion: string;
  gananciaPrimerTrimestre: number;
  ganancia2y3TrimestreGsem: number;
  pesoInicial: number;
  pesoActual: number;
  pesoIdeal: number;
  pesoMeta: number;
  pesoTotalEmbarazoTitulo4: number;
  imcSemana40: number;
  gananciaTipo: string;
  gano: number;
  debioGanar: number;
  pesoAGanar: number;
  semanasFaltantes: number;
  gramosPorSemana: number;
  semanasEmbarazo: number;
  imc: number;
  altura: number;
  fechaParto: string;
  fechaUltimoPeriodo: string;
  clasificacionGramos: string;
  tasaMetabolica: number;
  factorActividadFisica: number;
  requerimientoEnergiaTotal: number;
  energiaBasal: number;
  energiaActividadFisica: number;
  energiaTotal: number;
  clasificacionEnergia: string;
  adicionGestante: number;
  totalEnergiaAdicion: number;
  metodo1GDia: number;
  metodo1Kcal: number;
  metodo2GDia: number;
  metodo2Kcal: number;
  metodo3GDia: number;
  metodo3Kcal: number;
  metodo1Amdr: number;
  metodo2Amdr: number;
};

type Props = {
  params: { bajoPesoId: string }
};

export const metadata: Metadata = {
  title: 'Editar Registro Bajo Peso',
  description: 'Editar información del paciente con bajo peso',
};

async function fetchBajoPesoInfo(bajoPesoId: string): Promise<BajoPesoInfo> {
  // Simulate fetching data from an API or database
  const response = await fetch(`/api/bajo-peso/${bajoPesoId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data for bajoPesoId: ${bajoPesoId}`);
  }

  const data: BajoPesoInfo = await response.json();
  return data;
}

export default async function BajoPesoPage({ params }: Props) {
  const data = await fetchBajoPesoInfo(params.bajoPesoId);
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Registro Bajo Peso</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <BajoPesoForm data={data} bajoPesoId={params.bajoPesoId} />
      </div>
    </div>
  );
}

