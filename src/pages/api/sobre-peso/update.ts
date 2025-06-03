import { db } from "@/lib/db";
import { sobrePesoInfo } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const body = req.body;

  try {
    await db.update(sobrePesoInfo).set(body).where(eq(sobrePesoInfo.id, body.id));
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
}
