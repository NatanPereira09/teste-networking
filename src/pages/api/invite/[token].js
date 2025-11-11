import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token ausente." });
  }

  try {

    const invite = await prisma.invitation.findUnique({
      where: { token },
    });

    if (!invite) {
      return res.status(404).json({ error: "Convite não encontrado ou expirado." });
    }

    if (invite.status !== "ACTIVE") {
      return res.status(400).json({ error: "Convite expirado ou já utilizado." });
    }

    return res.status(200).json({
      success: true,
      email: invite.email,
      company: invite.company,
      name: invite.name,
      createdAt: invite.createdAt,
    });
  } catch (error) {
    console.error("Erro ao validar convite:", error);
    return res.status(500).json({ error: "Erro interno ao validar o convite." });
  }
}
