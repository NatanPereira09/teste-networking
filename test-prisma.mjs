import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("Modelos disponíveis no Prisma Client:");
console.log(Object.keys(prisma));

await prisma.$disconnect();
