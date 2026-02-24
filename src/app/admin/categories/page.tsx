import { INDUSTRY_TAXONOMY } from "@/lib/taxonomy";
import CategoriesClient from "./CategoriesClient";

export default async function AdminCategoriesPage() {
    // Transform taxonomy to a flat serializable format for the client
    const taxonomyData = INDUSTRY_TAXONOMY.map(industry => ({
        slug: industry.slug,
        code: industry.code,
        labelRu: industry.label.ru,
        labelEn: industry.label.en,
        icon: industry.icon,
        color: industry.color,
        categories: industry.categories.map(cat => ({
            slug: cat.slug,
            code: cat.code,
            labelRu: cat.label.ru,
            labelEn: cat.label.en,
            icon: cat.icon,
            subcategories: cat.subcategories.map(sub => ({
                slug: sub.slug,
                code: sub.code,
                labelRu: sub.label.ru,
                labelEn: sub.label.en,
                icon: sub.icon || "📦",
            }))
        }))
    }));

    return <CategoriesClient initialTaxonomy={taxonomyData} />;
}
