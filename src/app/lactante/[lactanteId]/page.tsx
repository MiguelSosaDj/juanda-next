import { Metadata } from 'next';
import LactanteForm from "@/components/LactanteForm";

interface PageProps {
  params: { lactanteId: string }
}

async function getLactanteInfo(lactanteId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lactante/${lactanteId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getLactanteInfo(params.lactanteId);
  return { title: `Editar Lactante ${data.baseUserInfo.nombre}` };
}

export default async function Page({ params }: PageProps) {
  const data = await getLactanteInfo(params.lactanteId);
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Editar Lactante: {data.baseUserInfo.nombre}</h1>
      <LactanteForm data={data} />
    </div>
  );
}
