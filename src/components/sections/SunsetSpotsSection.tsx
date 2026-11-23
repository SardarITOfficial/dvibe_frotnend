import { useTranslations } from "next-intl";

import SunsetSpotCard from "@/components/sections/SunsetSpotCard";
import { SUNSET_SPOTS } from "@/mocks/sunsetSpots";

export default function SunsetSpotsSection() {
  const t = useTranslations("SunsetSpots");

  return (
    <section
      aria-labelledby="sunset-spots-heading"
      className="bg-section-bg py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <h2
          id="sunset-spots-heading"
          className="font-hero text-3xl font-bold leading-[1.125] text-accent sm:text-4xl"
        >
          {t("listTitle")}
        </h2>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUNSET_SPOTS.map((spot) => (
            <li key={spot.id}>
              <SunsetSpotCard spot={spot} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}