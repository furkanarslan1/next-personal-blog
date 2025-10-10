// lib/prisma.ts

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// export default prisma;

import { PrismaClient } from "@prisma/client";

// globalThis: NodeJS global objesi
// TypeScript için tip belirtiyoruz
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Eğer daha önce bir prisma client yoksa oluşturuyoruz
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Development modda hot reload sırasında yeni client yaratılmasını engelle
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
