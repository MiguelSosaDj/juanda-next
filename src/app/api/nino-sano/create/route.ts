import { db } from "@/lib/db";
import { ninoSanoInfo } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verificamos si ya existe un registro para este baseInfoId
    const existente = await db
      .select()
      .from(ninoSanoInfo)
      .where(eq(ninoSanoInfo.baseInfoId, body.baseInfoId))
      .then(res => res[0]);

    if (existente) {
      // Si ya existe, actualizamos
      await db
        .update(ninoSanoInfo)
        .set({
          alimentacion: body.alimentacion,
          pt: body.pt,
          te: body.te,
          pce: body.pce,
          gananciaPesoGr: body.gananciaPesoGr,
          calorias1gTejido: body.calorias1gTejido,
          vecesQueGane: body.vecesQueGane,
          caloriasCrecimiento: body.caloriasCrecimiento,
          ajusteDeficit: body.ajusteDeficit,
          kcalTotales: body.kcalTotales,
          lecheMaternaExclusiva: body.lecheMaternaExclusiva,
          formulaInfantil: body.formulaInfantil,
          lecheMaternaYFormula: body.lecheMaternaYFormula,
          rango118Anos: body.rango118Anos,
        })
        .where(eq(ninoSanoInfo.baseInfoId, body.baseInfoId));
      
      return NextResponse.json({ message: "Datos actualizados correctamente" });
    } else {
      // Si no existe, insertamos
      const result = await db.insert(ninoSanoInfo).values({
        baseInfoId: body.baseInfoId,
        alimentacion: body.alimentacion,
        pt: body.pt,
        te: body.te,
        pce: body.pce,
        gananciaPesoGr: body.gananciaPesoGr,
        calorias1gTejido: body.calorias1gTejido,
        vecesQueGane: body.vecesQueGane,
        caloriasCrecimiento: body.caloriasCrecimiento,
        ajusteDeficit: body.ajusteDeficit,
        kcalTotales: body.kcalTotales,
        lecheMaternaExclusiva: body.lecheMaternaExclusiva,
        formulaInfantil: body.formulaInfantil,
        lecheMaternaYFormula: body.lecheMaternaYFormula,
        rango118Anos: body.rango118Anos,
      });

      return NextResponse.json({ message: "Datos guardados correctamente", result });
    }

  } catch (error) {
    console.error("Error al guardar Niño Sano:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
