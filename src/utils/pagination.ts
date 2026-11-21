export type PageItem = number | "ellipsis";

export function parsePage(value?: string | string[]): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(raw ?? "", 10);

  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    currentPage,
    totalPages,
  };
}

export function getPageItems(
  currentPage: number,
  totalPages: number,
): PageItem[] {
  const pages = [
    ...new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]),
  ]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return pages.flatMap((page, index): PageItem[] => {
    const gap = index === 0 ? 0 : page - pages[index - 1];

    if (gap === 2) return [page - 1, page];
    if (gap > 2) return ["ellipsis", page];

    return [page];
  });
}