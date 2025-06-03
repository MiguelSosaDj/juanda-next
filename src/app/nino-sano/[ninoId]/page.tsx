import { Metadata } from 'next';
import NinoSanoForm from "@/components/NinoSanoForm";

interface PageProps {
  params: { ninoId: string }
}

async function getNinoInfo(ninoId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nino-sano/${ninoId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getNinoInfo(params.ninoId);
  return { title: `Editar Niño Sano ${data.baseInfo.baseUserInfo.nombre}` };
}

export default async function Page({ params }: PageProps) {
  const data = await getNinoInfo(params.ninoId);
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Editar Niño Sano: {data.baseInfo.baseUserInfo.nombre}</h1>
      <NinoSanoForm data={data} />
    </div>
  );
}
