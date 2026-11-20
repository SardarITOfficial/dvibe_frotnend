import CategorySlider from "@/components/sections/CategorySlider";
import TodayInMindelo from "@/components/sections/TodayInMindelo";
import { CATEGORIES_CONFIG } from "@/mocks/categories";

export default function CategoriesSection() {
  const { eyebrow, title, slider, categories } = CATEGORIES_CONFIG;

  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-section-bg py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <CategorySlider
          eyebrow={eyebrow}
          title={title}
          prevLabel={slider.prevLabel}
          nextLabel={slider.nextLabel}
          categories={categories}
        />
        <TodayInMindelo />
      </div>
    </section>
  );
}