"use client";

import type { FormEvent, ReactNode } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiMessageSquare,
  FiNavigation,
  FiPhone,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import FormField from "@/components/common/FormField";
import { Button } from "@/components/ui/Button";
import { useFormErrors } from "@/hooks/useFormErrors";
import type { TaxiDriver } from "@/mocks/taxiDrivers";
import { getInvalidFields } from "@/utils/validation";
import { buildWhatsAppHref } from "@/utils/whatsapp";
import { taxiSchema } from "@/validations";

type TaxiBookingProps = {
  driver: TaxiDriver;
};

type FieldConfig = {
  name: string;
  type: string;
  icon: ReactNode;
  autoComplete?: string;
};

const TRIP_FIELDS: FieldConfig[] = [
  {
    name: "pickup",
    type: "text",
    icon: <FiMapPin size={16} strokeWidth={1.5} />,
  },
  {
    name: "dropoff",
    type: "text",
    icon: <FiNavigation size={16} strokeWidth={1.5} />,
  },
  {
    name: "date",
    type: "date",
    icon: <FiCalendar size={16} strokeWidth={1.5} />,
  },
  {
    name: "time",
    type: "time",
    icon: <FiClock size={16} strokeWidth={1.5} />,
  },
  {
    name: "passengers",
    type: "number",
    icon: <FiUsers size={16} strokeWidth={1.5} />,
  },
];

const CONTACT_FIELDS: FieldConfig[] = [
  {
    name: "name",
    type: "text",
    autoComplete: "name",
    icon: <FiUser size={16} strokeWidth={1.5} />,
  },
  {
    name: "phone",
    type: "tel",
    autoComplete: "tel",
    icon: <FiPhone size={16} strokeWidth={1.5} />,
  },
];

const VALUE_FIELDS = [
  ...TRIP_FIELDS,
  ...CONTACT_FIELDS,
  { name: "note" },
].map(({ name }) => name);

export default function TaxiBooking({ driver }: TaxiBookingProps) {
  const t = useTranslations("Taxi");
  const format = useFormatter();
  const { errors, setMultipleErrors, clearError } = useFormErrors();

  const clearFieldError = (field: string) => () => clearError(field);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      VALUE_FIELDS.map((field) => [field, String(data.get(field) ?? "").trim()]),
    );
    const invalid = getInvalidFields(taxiSchema, values);

    if (invalid.length > 0) {
      setMultipleErrors(
        Object.fromEntries(
          invalid.map((field) => [field, t(`booking.errors.${field}`)]),
        ),
      );
      return;
    }

    const message = [
      t("message.greeting", { driver: driver.name }),
      t("message.customer", { name: values.name, phone: values.phone }),
      t("message.route", { pickup: values.pickup, dropoff: values.dropoff }),
      t("message.schedule", {
        date: format.dateTime(new Date(`${values.date}T00:00:00Z`), {
          dateStyle: "long",
          timeZone: "UTC",
        }),
        time: values.time,
        passengers: values.passengers,
      }),
      values.note && t("message.note", { note: values.note }),
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      buildWhatsAppHref(driver.whatsapp, message),
      "_blank",
      "noopener,noreferrer",
    );
  }

  const renderField = ({ name, type, icon, autoComplete }: FieldConfig) => (
    <FormField
      key={name}
      name={name}
      type={type}
      autoComplete={autoComplete}
      label={t(`booking.fields.${name}`)}
      icon={icon}
      error={errors[name]}
      onChange={clearFieldError(name)}
    />
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-charcoal">
          {t("booking.tripTitle")}
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {TRIP_FIELDS.map(renderField)}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-charcoal">
          {t("booking.contactTitle")}
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {CONTACT_FIELDS.map(renderField)}
        </div>
        <FormField
          name="note"
          type="text"
          label={t("booking.fields.note")}
          icon={<FiMessageSquare size={16} strokeWidth={1.5} />}
          error={errors.note}
          onChange={clearFieldError("note")}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Button type="submit" variant="accent" className="w-full">
          <FaWhatsapp size={18} aria-hidden />
          {t("booking.submit")}
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted">
          {t("booking.direct")}
        </p>
      </div>
    </form>
  );
}