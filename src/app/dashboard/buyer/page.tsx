export const dynamic = 'force-dynamic';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BuyerDashboardClient from "./BuyerDashboardClient";
import { redirect } from "next/navigation";

export default async function BuyerDashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/auth/login");
    }

    const user = session.user as any;

    if (user.role !== "BUYER") {
        redirect("/auth/login");
    }

    // Fetch buyer's RFQs and orders in parallel
    const [myRfqs, myOrders] = await Promise.all([
        prisma.rfqRequest.findMany({
            where: { buyerId: user.id },
            include: { responses: { select: { id: true } } },
            orderBy: { createdAt: "desc" },
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prisma as any).order?.findMany({
            where: { buyerId: user.id },
            include: {
                product: { select: { id: true, titleRu: true, titleEn: true } },
                seller: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: "desc" },
        }).catch(() => []) ?? [],
    ]);

    return <BuyerDashboardClient user={{ name: user.name, email: user.email }} myRfqs={myRfqs} myOrders={myOrders} />;
}

