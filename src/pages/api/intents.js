import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, company, message } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Nome e e-mail são obrigatórios." });
      }

      const existing = await prisma.intent.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: "Intenção já enviada para este e-mail." });
      }

      const intent = await prisma.intent.create({
        data: {
          name,
          email,
          company: company || null,
          message: message || null,
        },
      });

      return res.status(201).json({ success: true, intent });
    } catch (error) {
      console.error("Erro ao salvar intenção:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }

  return res.status(405).json({ error: "Método não permitido." });
}
