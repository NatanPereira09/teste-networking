import prisma from "../../../../../lib/prisma";
import { randomBytes } from "crypto";

export default async function handler(req, res) {
  const key = req.headers["x-admin-key"];

  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Chave incorreta ou falha na API." });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const { id } = req.query;

  try {

    const intent = await prisma.intent.update({
      where: { id: parseInt(id) },
      data: { status: "APPROVED" },
    });

    const token = randomBytes(16).toString("hex");

    const invitation = await prisma.invitation.create({
      data: {
        token,
        email: intent.email,
        name: intent.name,
        company: intent.company || null,
      },
    });

    const invitationLink = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/signup?token=${token}`;

    return res.status(200).json({ success: true, invitationLink });
  } catch (error) {
    console.error("Erro ao aprovar intenção:", error);
    return res.status(500).json({ error: "Erro ao aprovar intenção." });
  }
}
