import GestanteForm from "@/components/GestanteForm";

async function getGestanteInfo(gestanteId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gestante/${gestanteId}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function GestantePage({ params }: { params: { gestanteId: string } }) {
  const data = await getGestanteInfo(params.gestanteId);
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Editar Gestante: {data.baseUserInfo.nombre}</h1>
      <GestanteForm data={data} />
    </div>
  );
}
