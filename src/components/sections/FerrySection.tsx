import { useTranslations } from "next-intl";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { LuShip, LuUtensils } from "react-icons/lu";

import FerryCard from "@/components/sections/FerryCard";
import { Button } from "@/components/ui/Button";
import { FERRY_CONFIG } from "@/mocks/ferry";

type PillListProps = {
  items: { id: string; label: string }[];
};

function PillList({ items }: PillListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map(({ id, label }) => (
        <li
          key={id}
          className="flex items-center gap-3 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-charcoal"
        >
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-sun" />
          {label}
        </li>
      ))}
    </ul>
  );
}

export default function FerrySection() {
  const t = useTranslations("Ferry");

  const beforeItems = FERRY_CONFIG.before.items.map((id) => ({
    id,
    label: t(`before.items.${id}`),
  }));

  const afterItems = FERRY_CONFIG.after.items.map((id) => ({
    id,
    label: t(`after.items.${id}`),
  }));

  return (
    <section
      aria-labelledby="ferry-heading"
      className="py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:gap-12">
        <div className="flex flex-col gap-3 sm:gap-4">
          <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-accent sm:text-base">
            {t("eyebrow")}
          </p>
          <h2
            id="ferry-heading"
            className="font-hero text-3xl font-bold leading-[1.125] text-charcoal sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <FerryCard
            icon={<LuUtensils size={28} />}
            title={t("before.title")}
            description={t("before.description")}
          >
            <PillList items={beforeItems} />
            <Button
              variant="outline"
              href={FERRY_CONFIG.before.href}
              className="mt-auto w-full"
            >
              {t("before.cta")}
              <FiArrowRight size={14} aria-hidden />
            </Button>
          </FerryCard>

          <FerryCard
            icon={<LuShip size={28} />}
            title={t("schedules.title")}
            description={t("schedules.description")}
          >
            <ul className="flex flex-col gap-3">
              {FERRY_CONFIG.schedules.routes.map(
                ({ id, from, to, time, operator }) => (
                  <li
                    key={id}
                    className="flex items-center gap-3 rounded-3xl border border-border bg-background px-4 py-3"
                  >
                    <LuShip
                      size={24}
                      aria-hidden
                      className="shrink-0 text-accent"
                    />
                    <span className="flex flex-1 flex-col">
                      <span className="text-sm font-semibold text-charcoal">
                        {from} → {to}
                      </span>
                      <span className="text-xs text-subtle">
                        {t("schedules.departure")} · {operator}
                      </span>
                    </span>
                    <span className="text-base font-semibold text-charcoal">
                      {time}
                    </span>
                  </li>
                ),
              )}
            </ul>
            <Button
              variant="accent"
              href={FERRY_CONFIG.schedules.href}
              className="mt-auto w-full"
            >
              {t("schedules.cta")}
              <FiArrowRight size={14} aria-hidden />
            </Button>
          </FerryCard>

          <FerryCard
            icon={<FiMapPin size={28} />}
            title={t("after.title")}
            description={t("after.description")}
          >
            <PillList items={afterItems} />
            <Button
              variant="outline"
              href={FERRY_CONFIG.after.href}
              className="mt-auto w-full"
            >
              {t("after.cta")}
              <FiArrowRight size={14} aria-hidden />
            </Button>
          </FerryCard>
        </div>
      </div>
    </section>
  );
}