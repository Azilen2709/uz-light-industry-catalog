// ─── Company by ID API ─────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const companyId = parseInt(id, 10);

        if (isNaN(companyId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const company = await prisma.company.findUnique({
            where: { id: companyId },
            include: {
                products: {
                    orderBy: { createdAt: "desc" },
                    take: 50,
                },
            },
        });

        if (!company) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 });
        }

        return NextResponse.json(company);
    } catch (error) {
        console.error("GET /api/companies/[id] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
