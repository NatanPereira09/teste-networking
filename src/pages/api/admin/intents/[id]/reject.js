import prisma from "../../../../../lib/prisma";

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
    await prisma.intent.update({
      where: { id: parseInt(id) },
      data: { status: "REJECTED" },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao rejeitar intenção:", error);
    return res.status(500).json({ error: "Erro ao rejeitar intenção." });
  }
}
