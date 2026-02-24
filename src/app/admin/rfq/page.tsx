import { prisma } from "@/lib/prisma";
import RfqClient from "./RfqClient";

export default async function AdminRfqPage() {
    const rfqs = await prisma.rfqRequest.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            buyer: { select: { name: true, email: true } },
            _count: { select: { responses: true } }
        }
    });

    const formattedRfqs = rfqs.map(r => ({
        id: r.id,
        title: r.title,
        status: r.status,
        quantity: r.quantity,
        createdAt: r.createdAt.toISOString(),
        buyer: r.buyer,
        responsesCount: r._count.responses
    }));

    return <RfqClient initialRfqs={formattedRfqs} />;
}
