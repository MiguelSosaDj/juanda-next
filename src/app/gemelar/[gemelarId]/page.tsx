import { type Metadata } from 'next'
import GemelarForm from "@/components/GemelarForm";

export const metadata: Metadata = {
  title: 'Editar Gemelar',
  description: 'Formulario para editar los datos de gemelar',
};

interface PageProps {
  params: { gemelarId: string }
}

async function getGemelarInfo(gemelarId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gemelar/${gemelarId}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function GemelarPage({ params }: PageProps) {
  const data = await getGemelarInfo(params.gemelarId);
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Editar Gemelar: {data.baseInfo.baseUserInfo.nombre}</h1>
      <GemelarForm data={data} />
    </div>
  );
}
