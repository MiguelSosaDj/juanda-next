import { db } from "@/lib/db";
import { ninoInfo, baseUserInfo } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db
      .select({
        id: ninoInfo.id,
        baseUserInfoId: ninoInfo.baseUserInfoId,
        nombre: baseUserInfo.nombre,
        identificacion: baseUserInfo.identificacion,
        sexo: ninoInfo.sexo,
        edad: baseUserInfo.edad,
        estatura: baseUserInfo.estatura,
        talla: ninoInfo.talla,
        peso: ninoInfo.peso,
        perimetroCefalico: ninoInfo.perimetroCefalico,
      })
      .from(ninoInfo)
      .innerJoin(baseUserInfo, eq(ninoInfo.baseUserInfoId, baseUserInfo.id));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al obtener lista de niños:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
