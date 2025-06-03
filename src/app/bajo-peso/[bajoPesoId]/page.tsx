import { type Metadata } from 'next';
import BajoPesoForm from "@/components/BajoPesoForm";

export const metadata: Metadata = {
  title: 'Editar Bajo Peso',
  description: 'Formulario para editar bajo peso',
};

interface PageProps {
  params: { bajoPesoId: string };
}

async function getBajoPesoInfo(bajoPesoId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bajo-peso/${bajoPesoId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function BajoPesoPage(props: PageProps) {
  const { params } = await Promise.resolve(props);
  const data = await getBajoPesoInfo(params.bajoPesoId);
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Editar Bajo Peso: {data.baseInfo.baseUserInfo.nombre}</h1>
      <BajoPesoForm data={data} />
    </div>
  );
}
