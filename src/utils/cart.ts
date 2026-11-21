import type { CartLine, MenuCategory, MenuItem } from "@/types";

export type PricedCartLine = CartLine & {
  item: MenuItem;
  lineTotal: number;
};

export function findMenuItem(
  categories: MenuCategory[],
  menuItemId: string,
): MenuItem | undefined {
  return categories
    .flatMap((category) => category.items)
    .find((item) => item.id === menuItemId);
}

export function getPricedLines(
  lines: CartLine[],
  categories: MenuCategory[],
): PricedCartLine[] {
  return lines.flatMap((line) => {
    const item = findMenuItem(categories, line.menuItemId);

    return item
      ? [{ ...line, item, lineTotal: item.price * line.quantity }]
      : [];
  });
}

export function getCartTotal(lines: PricedCartLine[]): number {
  return lines.reduce((total, line) => total + line.lineTotal, 0);
}