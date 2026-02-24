// ─── Companies API ─────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const region = searchParams.get("region");
        const category = searchParams.get("category");
        const industry = searchParams.get("industry");
        const flow = searchParams.get("flow");
        const verified = searchParams.get("verified");
        const search = searchParams.get("search");

        const companies = await prisma.company.findMany({
            where: {
                ...(region && { region }),
                ...(industry && { industrySlugs: { has: industry } }),
                ...(category && { categories: { has: category } }),
                ...(flow && { flows: { has: flow as "instock" | "whitelabel" | "rfq" } }),
                ...(verified === "true" && { verified: true }),
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: "insensitive" } },
                        { descriptionRu: { contains: search, mode: "insensitive" } },
                        { descriptionEn: { contains: search, mode: "insensitive" } },
                        { specializationRu: { contains: search, mode: "insensitive" } },
                        { specializationEn: { contains: search, mode: "insensitive" } },
                    ],
                }),
            },
            orderBy: { rating: "desc" },
        });

        return NextResponse.json(companies);
    } catch (error) {
        console.error("GET /api/companies error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
