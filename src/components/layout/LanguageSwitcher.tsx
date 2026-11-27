"use client";

import { useCallback, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FiCheck, FiChevronDown, FiGlobe } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";
import { Select } from "@/components/ui/Select";
import { getLocaleButtonLabel, getLocaleName } from "@/lib/i18n/locales";
interface LanguageSwitcherProps {
  variant?: "dropdown" | "inline";
  onSelect?: () => void;
}



export default function LanguageSwitcher({
  variant = "dropdown",
  onSelect,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(containerRef, close);

  function handleSelect(code: string) {
    close();
    router.replace(pathname, { locale: code });
    onSelect?.();
  }

  if (variant === "inline") {
    return (
      <Select
        name="language"
        variant="field"
        icon={<FiGlobe size={16} strokeWidth={1.5} />}
        aria-label={t("languageLabel")}
        options={routing.locales.map((code) => ({
          value: code,
          label: getLocaleName(code),
        }))}
        value={locale}
        onChange={handleSelect}
      />
    );
  }
  return (
    <div
      ref={containerRef}
      className="relative"
      onKeyDown={(event) => event.key === "Escape" && close()}
    >
      <Button
        type="button"
        variant="soft"
        aria-label={t("languageLabel")}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <FiGlobe size={20} />
        {getLocaleButtonLabel(locale)}
        <FiChevronDown
          size={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <ul className="absolute right-0 top-full mt-2 min-w-44 rounded-2xl bg-background p-2">
          {routing.locales.map((code) => (
            <li key={code}>
              <Button
                type="button"
                aria-current={code === locale}
                className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-2 text-base font-semibold text-ink transition-opacity hover:opacity-70"
                onClick={() => handleSelect(code)}
              >
                {getLocaleName(code)}
                {code === locale && <FiCheck size={16} />}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
