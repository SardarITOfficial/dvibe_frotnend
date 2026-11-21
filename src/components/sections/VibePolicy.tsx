import { useTranslations } from "next-intl";

import type { VibePolicyTerm } from "@/mocks/vibeEvents";

type VibePolicyProps = {
  policy: VibePolicyTerm[];
};

export default function VibePolicy({ policy }: VibePolicyProps) {
  const t = useTranslations("Vibe.details.policy");

  return (
    <section
      aria-labelledby="vibe-policy-heading"
      className="flex flex-col gap-4"
    >
      <h2
        id="vibe-policy-heading"
        className="font-hero text-2xl font-bold text-accent"
      >
        {t("title")}
      </h2>
      <ul className="flex flex-col gap-3">
        {policy.map(({ title, text }) => (
          <li key={title}>
            <details className="rounded-xl bg-background p-4 shadow-md">
              <summary className="cursor-pointer text-base font-semibold text-charcoal">
                {title}
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}