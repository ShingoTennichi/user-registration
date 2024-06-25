// * to avoid making multiple Prisma Client, check following url
// *　https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const globalPrisma: PrismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

export type globalPrisma = PrismaClient;
