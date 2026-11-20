"use client";

import { useCallback, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Link } from "@/lib/i18n/navigation";

interface NavDropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
}

export default function NavDropdown({ label, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(containerRef, close);

  return (
    <div
      ref={containerRef}
      className="relative"
      onKeyDown={(event) => event.key === "Escape" && close()}
    >
      <Button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex cursor-pointer items-center gap-1 text-base font-semibold text-ink transition-opacity hover:opacity-70"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        {label}
        <FiChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <ul className="absolute left-0 top-full mt-4 min-w-48 rounded-2xl bg-background p-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl px-4 py-2 text-base font-semibold text-ink transition-opacity hover:opacity-70"
                onClick={close}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}