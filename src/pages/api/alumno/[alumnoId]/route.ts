import { db } from "@/lib/db";
import { alumno } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { alumnoId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const data = await db.query.alumno.findFirst({
      where: eq(alumno.id, Number(alumnoId)),
    });

    if (!data) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
}
