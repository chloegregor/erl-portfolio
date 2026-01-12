// lib/prisma.ts
import { PrismaClient as DevClient } from "../src/generated/client/dev";
import { PrismaClient as ProdClient } from "../src/generated/client/prod";

let prismaInstance: any; // On utilise une variable intermédiaire

if (process.env.NODE_ENV === "production") {
  prismaInstance = new ProdClient();
} else {
  const globalForPrisma = globalThis as unknown as {
    prisma: DevClient | undefined;
  };

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new DevClient();
  }
  prismaInstance = globalForPrisma.prisma;
}

// On exporte l'instance en la castant vers DevClient
// Cela permet à TypeScript d'utiliser ton schéma (tables, relations)
// sans se soucier du conflit entre SQLite et Postgres.
export const prisma = prismaInstance as DevClient;

export default prisma;
