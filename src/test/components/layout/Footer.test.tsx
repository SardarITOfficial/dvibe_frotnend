import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";

import Footer from "@/components/layout/Footer";
import { FOOTER_COLUMNS } from "@/mocks/footer";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Footer;

describe("Footer", () => {
  it("should render the logo and tagline", () => {
    renderWithIntl(<Footer />);

    expect(screen.getByAltText(t.logoAlt)).toBeInTheDocument();
    expect(screen.getByText(t.tagline)).toBeInTheDocument();
  });

  it("should render every column with its links", () => {
    renderWithIntl(<Footer />);

    FOOTER_COLUMNS.forEach(({ id, links }) => {
      const column = t.columns[id as keyof typeof t.columns];
      const nav = within(
        screen.getByRole("navigation", { name: column.title }),
      );

      expect(
        screen.getByRole("heading", { level: 2, name: column.title }),
      ).toBeInTheDocument();

      links.forEach(({ id: linkId, href }) => {
        expect(
          nav.getByRole("link", {
            name: column.links[linkId as keyof typeof column.links],
          }),
        ).toHaveAttribute("href", href);
      });
    });
  });

  it("should render the copyright and closing line", () => {
    renderWithIntl(<Footer />);

    expect(
      screen.getByText(
        t.copyright.replace("{year}", String(new Date().getFullYear())),
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(t.madeWith)).toBeInTheDocument();
  });
});