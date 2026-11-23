import { useTranslations } from "next-intl";

import TourCard from "@/components/sections/TourCard";
import { TOURS } from "@/mocks/tours";

export default function ToursSection() {
  const t = useTranslations("Tours");

  return (
    <section
      aria-labelledby="tours-heading"
      className="bg-section-bg py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <h2
          id="tours-heading"
          className="font-hero text-3xl font-bold leading-[1.125] text-accent sm:text-4xl"
        >
          {t("listTitle")}
        </h2>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOURS.map((tour) => (
            <li key={tour.id}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}