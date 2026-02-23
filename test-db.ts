import { prisma } from "./src/lib/prisma";

async function test() {
    try {
        const companies = await prisma.company.findMany();
        console.log("Success! Found companies:", companies.length);
    } catch (e) {
        console.error("Prisma error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

test();
