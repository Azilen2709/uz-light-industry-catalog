// ─── Products API ──────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const category = searchParams.get("category");
        const subcategory = searchParams.get("subcategory");
        const industry = searchParams.get("industry");
        const region = searchParams.get("region");
        const search = searchParams.get("search");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const companyId = searchParams.get("companyId");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "50");
        const skip = (page - 1) * limit;

        // Log search analytics (fire and forget)
        if (search && search.trim().length > 1) {
            const q = search.trim().toLowerCase();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (prisma as any).searchQuery?.upsert({
                where: { query: q },
                update: { count: { increment: 1 } },
                create: { query: q, count: 1 },
            }).catch(() => {/* ignore until prisma generate */ });
        }

        const where = {
            ...(type && { type: type as "instock" | "whitelabel" | "rfq" }),
            ...(category && { categorySlug: category }),
            ...(subcategory && { subCategorySlug: subcategory }),
            ...(industry && { industrySlug: industry }),
            ...(region && { region }),
            ...(companyId && { companyId: parseInt(companyId) }),
            ...(minPrice && { priceFrom: { gte: parseFloat(minPrice) } }),
            ...(maxPrice && { priceTo: { lte: parseFloat(maxPrice) } }),
            ...(search && {
                OR: [
                    { titleRu: { contains: search, mode: "insensitive" as const } },
                    { titleEn: { contains: search, mode: "insensitive" as const } },
                    { tags: { has: search } },
                ],
            }),
        };

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: {
                    company: {
                        select: { id: true, name: true, slug: true, verified: true, region: true },
                    },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.product.count({ where }),
        ]);

        return NextResponse.json({ products, total, page, limit });
    } catch (error) {
        console.error("GET /api/products error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
