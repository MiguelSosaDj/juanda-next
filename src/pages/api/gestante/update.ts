import { db } from "@/lib/db";
import { gestanteInfo } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const {
    id, seleccionMultiple, semanaGestacion, pesoActual,
    pesoPregestacional, imcPregestacional, imcGestacional, imcPregestacionalCat
  } = req.body;

  try {
    await db.update(gestanteInfo).set({
      seleccionMultiple,
      semanaGestacion,
      pesoActual,
      pesoPregestacional,
      imcPregestacional,
      imcGestacional,
      imcPregestacionalCat
    }).where(eq(gestanteInfo.id, id));

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
}
