// ─── Company by Slug API ───────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const company = await prisma.company.findUnique({
            where: { slug },
            include: {
                products: {
                    orderBy: { createdAt: "desc" },
                    take: 20,
                },
            },
        });

        if (!company) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 });
        }

        return NextResponse.json(company);
    } catch (error) {
        console.error("GET /api/companies/[slug] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
