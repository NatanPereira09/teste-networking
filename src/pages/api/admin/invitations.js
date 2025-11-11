import { prisma } from "../../../lib/prisma";

const ADMIN_KEY = process.env.ADMIN_KEY || "DEV_ADMIN_KEY";

export default async function handler(req, res) {
  const adminKey = req.headers["x-admin-key"]; 
  if (adminKey !== ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const invites = await prisma.invitation.findMany({
      include: { Intention: true },
      orderBy: { createdAt: 'desc' }
    });
    const mapped = invites.map(i => ({
      id: i.id,
      token: i.token,
      email: i.Intention?.email ?? null,
      link: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/signup/${i.token}`,
      used: i.used,
      createdAt: i.createdAt
    }));
    return res.json(mapped);
  }

  res.setHeader("Allow", ["GET"]);
  res.status(405).end();
}
