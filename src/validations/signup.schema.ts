import * as yup from "yup";

import { loginSchema } from "./login.schema";

export const signupSchema = loginSchema.shape({
  name: yup.string().trim().min(2).required(),
  phone: yup
    .string()
    .trim()
    .matches(/^\+?[\d\s-]{7,20}$/)
    .required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),
});