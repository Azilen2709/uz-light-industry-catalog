import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import RfqDetailClient from "./RfqDetailClient";
import { redirect } from "next/navigation";

export default async function RfqDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/auth/login");
    }

    const { id } = await params;
    const user = session.user as any;

    const rfq = await prisma.rfqRequest.findUnique({
        where: { id },
        include: {
            buyer: { select: { id: true, name: true, email: true, company: { select: { name: true, region: true } } } },
            responses: {
                include: {
                    seller: {
                        select: {
                            id: true, name: true, email: true,
                            company: { select: { id: true, name: true, region: true, verified: true, rating: true } }
                        }
                    }
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!rfq) {
        return (
            <div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "100px 24px", textAlign: "center" }}>
                <h2>RFQ Not Found</h2>
            </div>
        );
    }

    // Security check
    if (user.role === "BUYER" && rfq.buyerId !== user.id) {
        return (
            <div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "100px 24px", textAlign: "center" }}>
                <h2>Forbidden</h2>
                <p>You can only access your own RFQs.</p>
            </div>
        );
    }

    if (user.role === "SELLER") {
        rfq.responses = rfq.responses.filter(r => r.sellerId === user.id);
    }

    return <RfqDetailClient rfq={rfq} currentUser={user} />;
}
