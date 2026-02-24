import { prisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            company: { select: { name: true, slug: true } }
        }
    });

    return <ProductsClient initialProducts={products as any} />;
}
