import type { Metadata } from 'next';
import AlumnoForm from '@/components/AlumnoForm';

type Props = {
  params: { alumnoId: string }
};

export const metadata: Metadata = {
  title: 'Editar Alumno',
  description: 'Editar información del alumno',
};

export default async function AlumnoPage({ params }: Props) {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Alumno</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <AlumnoForm alumnoId={params.alumnoId} />
      </div>
    </div>
  );
}
