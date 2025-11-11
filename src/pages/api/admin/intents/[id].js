import { prisma } from "../../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { simulateSendEmail } from "../../../../utils/emailSimulator";

const ADMIN_KEY = process.env.ADMIN_KEY || "DEV_ADMIN_KEY";

export default async function handler(req, res) {
  const adminKey = req.headers["x-admin-key"]; 
  if (adminKey !== ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;
  if (req.method === "POST") {
    const { action } = req.body;
    const intent = await prisma.intention.findUnique({ where: { id: Number(id) }});
    if (!intent) return res.status(404).json({ error: "Not found" });

    if (action === "approve") {
      const token = uuidv4();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (Number(process.env.TOKEN_EXPIRES_DAYS || 7)));
      await prisma.invitation.create({
        data: {
          token,
          intentionId: intent.id,
          expiresAt
        }
      });
      await prisma.intention.update({ where: { id: intent.id }, data: { status: "APPROVED", processedAt: new Date() }});
      const link = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/signup/${token}`;
      simulateSendEmail(intent.email, "Convite - finalize seu cadastro", `Acesse: ${link}`);
      return res.json({ ok: true, invitationLink: link, token });
    } else if (action === "reject") {
      await prisma.intention.update({ where: { id: intent.id }, data: { status: "REJECTED", processedAt: new Date() }});
      return res.json({ ok: true });
    }

    return res.status(400).json({ error: "invalid action" });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end();
}
