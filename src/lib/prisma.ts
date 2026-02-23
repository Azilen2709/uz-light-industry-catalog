// ─── Prisma Client Singleton ───────────────────────────────────────────────
// Prevents multiple instances during Next.js hot reload in development

import { PrismaClient } from "@prisma/client";

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Next.js hot reload fix + Prisma v7 init
const createPrismaClient = () => {
    const connectionString = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/b2b_portal?schema=public";
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
