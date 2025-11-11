import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fromMemberId, toMemberId, title, description } = req.body;
    if (!fromMemberId || !toMemberId || !title) return res.status(400).json({ error: 'missing fields' });
    const ind = await prisma.indication.create({
      data: { fromMemberId, toMemberId, title, description, status: 'OPEN' }
    });
    return res.status(201).json(ind);
  }

  if (req.method === 'GET') {
    const list = await prisma.indication.findMany();
    return res.json(list);
  }

  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end();
}
