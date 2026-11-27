const LOCALE_NAMES: Record<string, string> = {
  kea: "Kriolu",
};

const LOCALE_BUTTON_LABELS: Record<string, string> = {
  kea: "KR",
};

export function getLocaleName(code: string): string {
  const name =
    LOCALE_NAMES[code] ??
    new Intl.DisplayNames([code], { type: "language" }).of(code) ??
    code;

  return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
}

export function getLocaleButtonLabel(code: string): string {
  return LOCALE_BUTTON_LABELS[code] ?? code.toUpperCase();
}