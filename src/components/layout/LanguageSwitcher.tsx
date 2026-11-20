"use client";

import { useCallback, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FiCheck, FiChevronDown, FiGlobe } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";

interface LanguageSwitcherProps {
  variant?: "dropdown" | "inline";
  onSelect?: () => void;
}

function getLanguageName(code: string) {
  const name =
    new Intl.DisplayNames([code], { type: "language" }).of(code) ?? code;

  return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
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
      <ul aria-label={t("languageLabel")} className="flex flex-wrap gap-2">
        {routing.locales.map((code) => (
          <li key={code}>
            <Button
              type="button"
              variant={code === locale ? "accent" : "soft"}
              size="md"
              aria-pressed={code === locale}
              className="py-2"
              onClick={() => handleSelect(code)}
            >
              {getLanguageName(code)}
            </Button>
          </li>
        ))}
      </ul>
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
        {locale.toUpperCase()}
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
                {getLanguageName(code)}
                {code === locale && <FiCheck size={16} />}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}