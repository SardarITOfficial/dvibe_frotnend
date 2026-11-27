"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiMenu, FiUser, FiX } from "react-icons/fi";
import { useClickOutside } from "@/hooks/useClickOutside";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import NavDropdown from "@/components/layout/NavDropdown";
import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/i18n/navigation";
import { HEADER_CONFIG, NAV_LINKS } from "@/mocks/nav";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useClickOutside(containerRef, closeMenu);
  const t = useTranslations("Header");

  const { brand, cta } = HEADER_CONFIG;

  return (
    <header className="fixed inset-x-0 top-2 z-50 sm:top-4 lg:top-7.5">
      <div ref={containerRef} className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between rounded-full bg-background py-1.5 pl-5 pr-3 shadow-md sm:h-16 sm:py-2 lg:py-3 lg:pl-6">
          <Link href={brand.href} className="flex shrink-0 items-center">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={150}
              height={60}
              priority
              className="h-11 w-auto lg:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-11.5 lg:flex">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <NavDropdown
                  key={link.path}
                  label={t(`nav.${link.key}`)}
                  items={link.children.map((child) => ({
                    label: t(`${link.key}Menu.${child.key}`),
                    href: child.path,
                  }))}
                />
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className="flex items-center gap-1 text-base font-semibold text-ink transition-opacity hover:opacity-70"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />

            <Button href={cta.href} variant="accent">
              {t("cta")}
              <FiUser size={24} />
            </Button>
          </div>

          <Button
            type="button"
            className="p-2 text-ink lg:hidden"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </Button>
        </div>

        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 max-h-[calc(100svh-5rem)] overflow-y-auto rounded-3xl bg-background p-5 shadow-md sm:p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-3 sm:gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-base font-semibold text-ink transition-opacity hover:opacity-70"
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}

              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-subtle">
                  {t("languageLabel")}
                </p>
                <LanguageSwitcher
                  variant="inline"
                  onSelect={() => setIsOpen(false)}
                />
              </div>

              <Button
                href={cta.href}
                variant="accent"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                {t("cta")}
                <FiUser size={24} />
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
