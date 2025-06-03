import { type Metadata } from 'next';
import SobrePesoForm from "@/components/SobrePesoForm";

export const metadata: Metadata = {
  title: 'Editar Sobrepeso',
  description: 'Formulario para editar sobrepeso',
};

interface PageProps {
  params: { sobrePesoId: string };
}

async function getSobrePesoInfo(sobrePesoId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sobre-peso/${sobrePesoId}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function SobrePesoPage(props: PageProps) {
  const { params } = await Promise.resolve(props);
  const data = await getSobrePesoInfo(params.sobrePesoId);
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Editar Sobrepeso: {data.baseInfo.baseUserInfo.nombre}</h1>
      <SobrePesoForm data={data} />
    </div>
  );
}
