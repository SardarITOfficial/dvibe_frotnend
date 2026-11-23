import { object, string } from "yup";

type OrderValues = { name: string; phone: string; note: string };

export const orderSchema = object({
  name: string().trim().min(2).required(),
  phone: string()
    .trim()
    .matches(/^\+?[\d\s-]{7,20}$/)
    .required(),
  note: string().trim().max(300),
});

export function isOrderFieldValid(
  field: keyof OrderValues,
  values: OrderValues,
): boolean {
  try {
    orderSchema.validateSyncAt(field, values);
    return true;
  } catch {
    return false;
  }
}
