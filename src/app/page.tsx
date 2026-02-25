import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import HeroSection from "@/components/home/HeroSection";
import BannerStrip from "@/components/home/BannerStrip";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TopProductsSection from "@/components/home/TopProductsSection";
import TopFactoriesSection from "@/components/home/TopFactoriesSection";
import StatsSection from "@/components/home/StatsSection";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [topProducts, topCompanies, companiesCount, productsCount] = await Promise.all([
    prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { company: true }
    }),
    prisma.company.findMany({
      take: 4,
      orderBy: { rating: 'desc' }
    }),
    prisma.company.count(),
    prisma.product.count()
  ]);

  // Map products to match component expectations
  const mappedProducts = topProducts.map(p => {
    const cat = CATEGORIES.find(c => c.slug === p.categorySlug);
    return {
      ...p,
      title: { ru: p.titleRu, en: p.titleEn },
      category: { ru: cat?.label || p.categorySlug, en: cat?.labelEn || p.categorySlug },
      company: p.company.name,
      region: p.region,
    };
  });

  // Map companies to match component expectations
  const mappedCompanies = topCompanies.map(c => ({
    ...c,
    specialization: { ru: (c as any).specializationRu, en: (c as any).specializationEn },
  }));

  return (
    <>
      <HeroSection />
      <BannerStrip />
      <StatsSection companiesCount={companiesCount} productsCount={productsCount} />
      <CategoriesSection />
      <HowItWorksSection />
      <TopProductsSection initialProducts={mappedProducts} />
      <TopFactoriesSection initialCompanies={mappedCompanies} />
    </>
  );
}
