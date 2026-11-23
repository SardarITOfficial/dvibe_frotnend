import { useTranslations } from "next-intl";

import BeachCard from "@/components/sections/BeachCard";
import { BEACHES } from "@/mocks/beaches";

export default function BeachesSection() {
  const t = useTranslations("Beaches");

  return (
    <section
      aria-labelledby="beaches-heading"
      className="bg-section-bg py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <h2
          id="beaches-heading"
          className="font-hero text-3xl font-bold leading-[1.125] text-accent sm:text-4xl"
        >
          {t("listTitle")}
        </h2>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BEACHES.map((beach) => (
            <li key={beach.id}>
              <BeachCard beach={beach} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}