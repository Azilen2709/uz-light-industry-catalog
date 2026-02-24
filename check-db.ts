
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/b2b_portal?schema=public";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    try {
        const productCount = await prisma.product.count();
        console.log("Product count:", productCount);
        const companyCount = await prisma.company.count();
        console.log("Company count:", companyCount);
        process.exit(0);
    } catch (e) {
        console.error("Connection error:", e);
        process.exit(1);
    }
}

main();
