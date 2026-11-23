import { ValidationError } from "yup";

type Validatable = {
  validateSync: (value: unknown, options?: { abortEarly?: boolean }) => unknown;
};

export function getInvalidFields(
  schema: Validatable,
  values: Record<string, string>,
): string[] {
  try {
    schema.validateSync(values, { abortEarly: false });
    return [];
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;

    return [
      ...new Set(
        error.inner
          .map(({ path }) => path)
          .filter((path): path is string => Boolean(path)),
      ),
    ];
  }
}