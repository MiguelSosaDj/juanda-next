import { db } from "@/lib/db";
import { ninoSanoInfo } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API HIT: /api/nino-sano/update");
  console.log("HTTP Method:", req.method);

  if (req.method !== "PUT") {
    console.log("Método no permitido");
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const body = req.body;
    console.log("Body recibido:", body);

    const { id, alimentacion, pt, te, pce, clasificacionPt, clasificacionTe, clasificacionPce } = body;

    // Validaciones mínimas:
    if (!id) {
      console.error("Falta el ID");
      return res.status(400).json({ message: "El ID es requerido" });
    }

    console.log("Datos a actualizar:", {
      id,
      alimentacion,
      pt,
      te,
      pce,
      clasificacionPt,
      clasificacionTe,
      clasificacionPce
    });

    const result = await db.update(ninoSanoInfo).set({
      alimentacion,
      pt,
      te,
      pce,
      clasificacionPt,
      clasificacionTe,
      clasificacionPce
    }).where(eq(ninoSanoInfo.id, id));

    console.log("Resultado del update:", result);

    res.status(200).json({ success: true, updated: result });
  } catch (error) {
    console.error("Error durante el update:", error);
    res.status(500).json({ message: "Error interno", error });
  }
}
