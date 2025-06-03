import { db } from "@/lib/db";
import { gemelarInfo } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gemelarId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const data = await db.query.gemelarInfo.findFirst({
      where: eq(gemelarInfo.baseInfoId, Number(gemelarId)),
      with: {
        baseInfo: { with: { baseUserInfo: true } }
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
