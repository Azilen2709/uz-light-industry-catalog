import { prisma } from "@/lib/prisma";
import CompaniesClient from "./CompaniesClient";

export default async function AdminCompaniesPage() {
    const companies = await prisma.company.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { users: true, products: true }
            }
        }
    });

    const formattedCompanies = companies.map(c => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        region: c.region,
        industry: c.industry,
        verified: c.verified,
        rating: c.rating,
        userCount: c._count.users,
        productCount: c._count.products
    }));

    return <CompaniesClient initialCompanies={formattedCompanies} />;
}
