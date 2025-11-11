import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const key = req.headers["x-admin-key"];

  if (!key) {
    return res.status(400).json({ error: "Chave de acesso ausente." });
  }

  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Chave incorreta ou falha na API." });
  }

  if (req.method === "GET") {
    try {
      const intents = await prisma.intent.findMany({
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json(intents);
    } catch (error) {
      console.error("Erro ao buscar intenções:", error);
      return res.status(500).json({ error: "Erro ao buscar intenções." });
    }
  }

  return res.status(405).json({ error: "Método não permitido." });
}
