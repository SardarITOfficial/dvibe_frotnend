import { useTranslations } from "next-intl";

export default function VibeHero() {
  const t = useTranslations("Vibe");

  return (
    <section
      aria-labelledby="vibe-page-heading"
      className="bg-background_deep py-16 font-hero lg:py-24"
    >
      <div className="container mx-auto flex flex-col gap-4 px-4">
        <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-sun sm:text-base">
          {t("eyebrow")}
        </p>
        <h1
          id="vibe-page-heading"
          className="font-hero text-4xl font-bold leading-[1.125] text-background lg:text-6xl"
        >
          {t("page.title")}
        </h1>
        <p className="max-w-2xl text-base text-background/80">
          {t("page.description")}
        </p>
      </div>
    </section>
  );
}