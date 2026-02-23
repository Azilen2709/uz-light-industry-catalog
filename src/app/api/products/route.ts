// ─── Products API ──────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const category = searchParams.get("category");
        const industry = searchParams.get("industry");
        const region = searchParams.get("region");
        const search = searchParams.get("search");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const companyId = searchParams.get("companyId");

        const products = await prisma.product.findMany({
            where: {
                ...(type && { type: type as "instock" | "whitelabel" | "rfq" }),
                ...(category && { categorySlug: category }),
                ...(industry && { industrySlug: industry }),
                ...(region && { region }),
                ...(companyId && { companyId: parseInt(companyId) }),
                ...(minPrice && { priceFrom: { gte: parseFloat(minPrice) } }),
                ...(maxPrice && { priceTo: { lte: parseFloat(maxPrice) } }),
                ...(search && {
                    OR: [
                        { title: { contains: search, mode: "insensitive" } },
                        { tags: { has: search } },
                    ],
                }),
            },
            include: {
                company: {
                    select: { id: true, name: true, slug: true, verified: true, region: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("GET /api/products error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
