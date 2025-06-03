import { db } from "@/lib/db";
import { lactanteInfo } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lactanteId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const data = await db.query.lactanteInfo.findFirst({
      where: eq(lactanteInfo.baseUserInfoId, Number(lactanteId)),
      with: {
        baseUserInfo: true
      }
    });

    if (!data) {
      return res.status(404).json({ message: "No encontrado" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
}
