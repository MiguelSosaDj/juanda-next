import type { Metadata } from 'next';
import AlumnoForm from '@/components/AlumnoForm';

export const metadata: Metadata = {
  title: 'Crear Nuevo Alumno',
  description: 'Registrar un nuevo alumno en el sistema',
};

export default function CreateAlumnoPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Alumno</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <AlumnoForm />
      </div>
    </div>
  );
}