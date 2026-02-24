import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        if (body.status !== "CANCELLED") {
            return NextResponse.json({ error: "Only Cancellation is allowed from Admin panel" }, { status: 400 });
        }

        const updated = await prisma.rfqRequest.update({
            where: { id },
            data: { status: "CANCELLED" }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating RFQ:", error);
        return NextResponse.json({ error: "Failed to update RFQ" }, { status: 500 });
    }
}
