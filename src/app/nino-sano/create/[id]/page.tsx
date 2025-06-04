import { db } from "@/lib/db";
import { ninoInfo, baseUserInfo } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import NinoSanoForm from "@/components/NinoSanoForm";

interface Props {
  params: { id: string };
}

export default async function FormPage({ params }: Props) {
  const id = parseInt(params.id);

  const nino = await db
    .select({
      id: ninoInfo.id,
      nombre: baseUserInfo.nombre,
      sexo: ninoInfo.sexo,
      edad: baseUserInfo.edad,
      talla: ninoInfo.talla,
      peso: ninoInfo.peso,
      perimetroCefalico: ninoInfo.perimetroCefalico,
    })
    .from(ninoInfo)
    .innerJoin(baseUserInfo, eq(ninoInfo.baseUserInfoId, baseUserInfo.id))
    .where(eq(ninoInfo.id, id))
    .then(res => res[0]);

  if (!nino) {
    return <div>Niño no encontrado</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Formulario Niño Sano</h1>
      <NinoSanoForm baseInfo={nino} />
    </div>
  );
}
