"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import CarRentalBooking from "@/components/sections/CarRentalBooking";
import CarRentalCard from "@/components/sections/CarRentalCard";
import { Modal } from "@/components/ui/Modal";
import type { CarRental } from "@/mocks/carRentals";

type CarRentalListProps = {
  cars: CarRental[];
};

export default function CarRentalList({ cars }: CarRentalListProps) {
  const t = useTranslations("CarRental");
  const [selected, setSelected] = useState<CarRental | null>(null);

  const closeModal = useCallback(() => setSelected(null), []);

  const sortedCars = [...cars].sort(
    (a, b) => Number(b.isAvailable) - Number(a.isAvailable),
  );

  return (
    <section
      aria-labelledby="car-rental-list-heading"
      className="bg-section-bg py-12 font-hero lg:py-15"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4">
        <div className="flex flex-col gap-3">
          <h2
            id="car-rental-list-heading"
            className="text-3xl font-bold leading-[1.125] text-charcoal sm:text-4xl"
          >
            {t("cars.title")}
          </h2>
          <p className="text-base text-muted">{t("cars.description")}</p>
        </div>

        {sortedCars.length === 0 ? (
          <p role="status" className="text-base text-muted">
            {t("cars.empty")}
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedCars.map((car) => (
              <CarRentalCard key={car.id} car={car} onSelect={setSelected} />
            ))}
          </ul>
        )}
      </div>

      <Modal
        isOpen={selected !== null}
        title={selected ? t("booking.title", { car: selected.name }) : ""}
        closeLabel={t("booking.closeLabel")}
        onClose={closeModal}
      >
        {selected && <CarRentalBooking car={selected} />}
      </Modal>
    </section>
  );
}