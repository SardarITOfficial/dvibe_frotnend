import { useTranslations } from "next-intl";

import type { VibeHighlight } from "@/mocks/vibeEvents";

type VibeHighlightsProps = {
  highlights: VibeHighlight[];
};

export default function VibeHighlights({ highlights }: VibeHighlightsProps) {
  const t = useTranslations("Vibe.details");

  return (
    <section
      aria-labelledby="vibe-highlights-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="vibe-highlights-heading"
        className="font-hero text-2xl font-bold text-accent"
      >
        {t("whatToExpect")}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {highlights.map(({ title, description }) => (
          <li
            key={title}
            className="flex flex-col gap-1 rounded-xl bg-background p-4 shadow-md"
          >
            <h3 className="text-base font-semibold text-charcoal">{title}</h3>
            <p className="text-sm text-muted">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}