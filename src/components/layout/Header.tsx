"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiChevronDown, FiGlobe, FiMenu, FiUser, FiX } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { HEADER_CONFIG, NAV_LINKS } from "@/mocks/nav";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { brand, cta, language, menu } = HEADER_CONFIG;

  return (
    <header className="fixed inset-x-0 top-4 z-50 lg:top-7.5">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between rounded-full bg-background py-2 pl-5 pr-3 lg:h-21 lg:py-3 lg:pl-6">
          <Link href={brand.href} className="flex shrink-0 items-center">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={188}
              height={60}
              priority
              className="h-11 w-auto lg:h-15"
            />
          </Link>

          <nav className="hidden items-center gap-11.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="flex items-center gap-1 text-base font-semibold text-ink transition-opacity hover:opacity-70"
              >
                {link.name}
                {link.hasDropdown && <FiChevronDown size={16} />}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Button
              type="button"
              variant="soft"
              aria-label={language.label}
            >
              <FiGlobe size={20} />
              {language.code}
              <FiChevronDown size={20} />
            </Button>
 
            <Button href={cta.href} variant="accent">
              {cta.label}
              <FiUser size={24} />
            </Button>
          </div>

          <Button
            type="button"
            className="p-2 text-ink lg:hidden"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-label={isOpen ? menu.closeLabel : menu.openLabel}
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
            className="mt-2 rounded-3xl bg-background p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="text-base font-semibold text-ink transition-opacity hover:opacity-70"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Button
                href={cta.href}
                variant="accent"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                {cta.label}
                <FiUser size={24} />
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}