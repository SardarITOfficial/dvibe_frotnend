import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Link } from "@/lib/i18n/navigation";
import { getPageItems } from "@/utils/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getHref: (page: number) => string;
  getPageLabel: (page: number) => string;
  navigationLabel: string;
  previousLabel: string;
  nextLabel: string;
};

const ITEM_CLASSES =
  "inline-flex size-10 items-center justify-center rounded-full border text-sm font-medium transition-colors";
const IDLE_CLASSES =
  "border-border bg-background text-charcoal hover:border-accent hover:text-accent";
const ACTIVE_CLASSES = "border-accent bg-accent text-background";
const DISABLED_CLASSES = "border-border text-subtle opacity-50";

export function Pagination({
  currentPage,
  totalPages,
  getHref,
  getPageLabel,
  navigationLabel,
  previousLabel,
  nextLabel,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label={navigationLabel}>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {hasPrevious ? (
            <Link
              href={getHref(currentPage - 1)}
              aria-label={previousLabel}
              className={`${ITEM_CLASSES} ${IDLE_CLASSES}`}
            >
              <FiChevronLeft size={18} aria-hidden />
            </Link>
          ) : (
            <span aria-hidden className={`${ITEM_CLASSES} ${DISABLED_CLASSES}`}>
              <FiChevronLeft size={18} />
            </span>
          )}
        </li>

        {getPageItems(currentPage, totalPages).map((item, index) =>
          item === "ellipsis" ? (
            <li key={`ellipsis-${index}`} aria-hidden className="px-1 text-subtle">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={getHref(item)}
                aria-label={getPageLabel(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={`${ITEM_CLASSES} ${
                  item === currentPage ? ACTIVE_CLASSES : IDLE_CLASSES
                }`}
              >
                {item}
              </Link>
            </li>
          ),
        )}

        <li>
          {hasNext ? (
            <Link
              href={getHref(currentPage + 1)}
              aria-label={nextLabel}
              className={`${ITEM_CLASSES} ${IDLE_CLASSES}`}
            >
              <FiChevronRight size={18} aria-hidden />
            </Link>
          ) : (
            <span aria-hidden className={`${ITEM_CLASSES} ${DISABLED_CLASSES}`}>
              <FiChevronRight size={18} />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}