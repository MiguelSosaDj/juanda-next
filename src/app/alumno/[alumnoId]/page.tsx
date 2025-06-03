import { type Metadata } from 'next';
import AlumnoForm from "@/components/AlumnoForm";

export const metadata: Metadata = {
  title: 'Editar Alumno',
  description: 'Formulario para editar los datos del alumno',
};

interface PageProps {
  params: { alumnoId: string };
}

async function getAlumno(alumnoId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/${alumnoId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function AlumnoPage(props: PageProps) {
  const { params } = await Promise.resolve(props);
  const data = await getAlumno(params.alumnoId);
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Editar Alumno: {data.nombre}</h1>
      <AlumnoForm data={data} />
    </div>
  );
}
