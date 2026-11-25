import { string } from "yup";

import { getTodayDateString } from "@/utils/taxi";

import { orderSchema } from "./order.schema";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const carRentalSchema = orderSchema.shape({
  pickup: string().trim().min(2).required(),
  startDate: string()
    .required()
    .matches(DATE_PATTERN)
    .test(
      "not-in-past",
      "Date cannot be in the past",
      (value) => (value ?? "") >= getTodayDateString(),
    ),
  endDate: string()
    .required()
    .matches(DATE_PATTERN)
    .test(
      "after-start",
      "End date cannot be before start date",
      (value, context) =>
        (value ?? "") >= String(context.parent.startDate ?? ""),
    ),
});