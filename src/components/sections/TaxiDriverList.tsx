"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import TaxiBooking from "@/components/sections/TaxiBooking";
import TaxiDriverCard from "@/components/sections/TaxiDriverCard";
import { Modal } from "@/components/ui/Modal";
import type { TaxiDriver } from "@/mocks/taxiDrivers";

type TaxiDriverListProps = {
  drivers: TaxiDriver[];
};

export default function TaxiDriverList({ drivers }: TaxiDriverListProps) {
  const t = useTranslations("Taxi");
  const [selected, setSelected] = useState<TaxiDriver | null>(null);

  const closeModal = useCallback(() => setSelected(null), []);

  const sortedDrivers = [...drivers].sort(
    (a, b) => Number(b.isAvailable) - Number(a.isAvailable),
  );

  return (
    <section
      aria-labelledby="taxi-drivers-heading"
      className="bg-section-bg py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-3">
          <h2
            id="taxi-drivers-heading"
            className="text-3xl font-bold leading-[1.125] text-charcoal sm:text-4xl"
          >
            {t("drivers.title")}
          </h2>
          <p className="text-base text-muted">{t("drivers.description")}</p>
        </div>

        {sortedDrivers.length === 0 ? (
          <p role="status" className="text-base text-muted">
            {t("drivers.empty")}
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedDrivers.map((driver) => (
              <TaxiDriverCard
                key={driver.id}
                driver={driver}
                onSelect={setSelected}
              />
            ))}
          </ul>
        )}
      </div>

      <Modal
        isOpen={selected !== null}
        title={
          selected ? t("booking.title", { driver: selected.name }) : ""
        }
        closeLabel={t("booking.closeLabel")}
        onClose={closeModal}
      >
        {selected && <TaxiBooking driver={selected} />}
      </Modal>
    </section>
  );
}