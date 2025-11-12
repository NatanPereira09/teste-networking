import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {

      const indications = await prisma.indication.findMany({
        include: {
          fromMember: true,
          toMember: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json(indications);
    }

    if (req.method === "POST") {
      const { fromMemberId, toMemberEmail, description } = req.body;

      if (!fromMemberId || !toMemberEmail || !description) {
        return res.status(400).json({ error: "Dados incompletos." });
      }

      let toMember = await prisma.member.findUnique({
        where: { email: toMemberEmail },
      });

      if (!toMember) {
        toMember = await prisma.member.create({
          data: {
            name: "Indicado",
            email: toMemberEmail,
          },
        });
      }

      const indication = await prisma.indication.create({
        data: {
          fromMemberId: Number(fromMemberId),
          toMemberId: toMember.id,
          description,
        },
      });

      return res.status(201).json(indication);
    }

    return res.status(405).json({ error: "Método não permitido." });
  } catch (error) {
    console.error("Erro na API de Indicações:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}
