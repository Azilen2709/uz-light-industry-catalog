import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string, responseId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const role = (session.user as { role: string }).role;
        const userId = (session.user as { id: string }).id;
        const { id, responseId } = await params;
        const body = await request.json();
        const { status } = body; // ACCEPTED, REJECTED, VIEWED

        if (!status) {
            return NextResponse.json({ error: "Status is required" }, { status: 400 });
        }

        const rfq = await prisma.rfqRequest.findUnique({ where: { id } });
        if (!rfq || rfq.buyerId !== userId) {
            return NextResponse.json({ error: "RFQ not found or forbidden" }, { status: 403 });
        }

        const response = await prisma.rfqResponse.update({
            where: { id: responseId },
            data: { status },
        });

        // Optionally, if status is ACCEPTED, we can change the RFQ status to CLOSED with the winner
        if (status === "ACCEPTED") {
            await prisma.rfqRequest.update({
                where: { id },
                data: { status: "CLOSED" }
            });
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error("PATCH /api/rfq/[id]/responses/[responseId] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
