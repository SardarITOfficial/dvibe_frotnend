import { useTranslations } from "next-intl";

import CategorySlider from "@/components/sections/CategorySlider";
import TodayInMindelo from "@/components/sections/TodayInMindelo";
import { CATEGORIES_CONFIG } from "@/mocks/categories";

export default function CategoriesSection() {
  const t = useTranslations("Categories");

  const categories = CATEGORIES_CONFIG.categories.map((category) => ({
    ...category,
    label: t(`items.${category.id}`),
  }));

  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-section-bg py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <CategorySlider
          eyebrow={t("eyebrow")}
          title={t("title")}
          prevLabel={t("slider.prevLabel")}
          nextLabel={t("slider.nextLabel")}
          categories={categories}
        />
        <TodayInMindelo />
      </div>
    </section>
  );
}