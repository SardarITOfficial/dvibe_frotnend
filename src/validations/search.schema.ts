import * as yup from "yup";

export const searchSchema = yup
  .object({
    location: yup.string().default(""),
    q: yup.string().trim().default(""),
  })
  .test(
    "location-or-query",
    "Select a location or enter a search term",
    (value) => Boolean(value.location || value.q),
  );