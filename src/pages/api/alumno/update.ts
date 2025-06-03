import { db } from "@/lib/db";
import { alumno } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { id, nombre, telefono, direccion } = req.body;

  try {
    await db.update(alumno).set({ nombre, telefono, direccion }).where(eq(alumno.id, id));
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
}
