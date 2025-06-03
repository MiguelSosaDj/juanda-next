import { db } from "@/lib/db";
import { entrenamiento } from "@/drizzle/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { alumnoId, semana, peso, tipoEntrenamiento, altura } = req.body;

  try {
    await db.insert(entrenamiento).values({
      alumnoId,
      semana,
      peso,
      tipoEntrenamiento,
      altura
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
}
