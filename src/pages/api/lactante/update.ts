
import { db } from "@/lib/db";
import { lactanteInfo } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const {
    id, pesoActual, pesoPregestacional, imcActual, imcCat,
    diasPostParto, retencionPostParto, retencionPostPartoDetalle,
    tasaMetabolica, factorActividadFisica, descripcionActividadFisica,
    requerimientoEnergia, energiaExtraRequerida, requerimientoEnergiaTotal
  } = req.body;

  try {
    await db.update(lactanteInfo).set({
      pesoActual, pesoPregestacional, imcActual, imcCat,
      diasPostParto, retencionPostParto, retencionPostPartoDetalle,
      tasaMetabolica, factorActividadFisica, descripcionActividadFisica,
      requerimientoEnergia, energiaExtraRequerida, requerimientoEnergiaTotal
    }).where(eq(lactanteInfo.id, id));

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
}
