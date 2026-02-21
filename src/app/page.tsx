import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TopProductsSection from "@/components/home/TopProductsSection";
import TopFactoriesSection from "@/components/home/TopFactoriesSection";
import StatsSection from "@/components/home/StatsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <HowItWorksSection />
      <TopProductsSection />
      <TopFactoriesSection />
    </>
  );
}
