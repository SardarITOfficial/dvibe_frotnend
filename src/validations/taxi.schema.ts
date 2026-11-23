import { string } from "yup";

import { TAXI_MAX_PASSENGERS } from "@/constants/taxi";
import { getTodayDateString } from "@/utils/taxi";

import { orderSchema } from "./order.schema";

export const taxiSchema = orderSchema.shape({
  pickup: string().trim().min(2).required(),
  dropoff: string().trim().min(2).required(),
  date: string()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .test(
      "not-in-past",
      "Date cannot be in the past",
      (value) => (value ?? "") >= getTodayDateString(),
    ),
  time: string()
    .required()
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/),
  passengers: string()
    .required()
    .test(
      "passengers-range",
      "Passengers out of range",
      (value) => {
        const count = Number(value);

        return (
          Number.isInteger(count) && count >= 1 && count <= TAXI_MAX_PASSENGERS
        );
      },
    ),
});