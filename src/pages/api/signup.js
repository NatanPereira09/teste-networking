import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const { name, email, phone, company, token } = req.body;

  if (!token || !email || !name) {
    return res.status(400).json({ error: "Dados incompletos." });
  }

  try {

    const invite = await prisma.invitation.findUnique({ where: { token } });

    if (!invite || invite.status.toUpperCase() !== "ACTIVE") {
      return res.status(400).json({ error: "Convite inválido ou expirado." });
    }

    const member = await prisma.member.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || invite.company || null,
      },
    });

    await prisma.invitation.update({
      where: { token },
      data: { status: "USED" },
    });

    return res.status(201).json({
      success: true,
      message: "Cadastro concluído com sucesso!",
      member,
    });
  } catch (error) {
    console.error("Erro ao concluir cadastro:", error);

    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Já existe um membro cadastrado com este email.",
      });
    }

    return res.status(500).json({
      error: "Erro interno ao concluir cadastro.",
      details: error.message,
    });
  }
}
