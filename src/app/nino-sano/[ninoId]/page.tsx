import NinoSanoForm from "@/components/NinoSanoForm";

async function getNinoInfo(ninoId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nino-sano/${ninoId}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function NinoSanoPage({ params }: { params: { ninoId: string } }) {
  const data = await getNinoInfo(params.ninoId);
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Editar Niño Sano: {data.baseInfo.baseUserInfo.nombre}</h1>
      <NinoSanoForm data={data} />
    </div>
  );
}
