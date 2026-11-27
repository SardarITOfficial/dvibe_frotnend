import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "@/lib/i18n/navigation";
import Header from "@/components/layout/Header";
import { HEADER_CONFIG, NAV_LINKS } from "@/mocks/nav";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Header;

describe("Header", () => {
  it("should render the brand logo", () => {
    renderWithIntl(<Header />);

    expect(screen.getByAltText(HEADER_CONFIG.brand.name)).toBeInTheDocument();
  });

  it("should render all navigation items", () => {
    renderWithIntl(<Header />);

    NAV_LINKS.forEach((link) => {
      const name = t.nav[link.key as keyof typeof t.nav];
      const role = link.children ? "button" : "link";

      expect(screen.getByRole(role, { name })).toBeInTheDocument();
    });
  });

  it("should render the CTA link", () => {
    renderWithIntl(<Header />);

    expect(screen.getAllByRole("link", { name: t.cta }).length).toBeGreaterThan(
      0,
    );
  });

  it("should render the language button with the current locale", () => {
    renderWithIntl(<Header />);

    expect(
      screen.getByRole("button", { name: t.languageLabel }),
    ).toHaveTextContent("EN");
  });

  it("should open the mobile navigation menu", async () => {
    const user = userEvent.setup();

    renderWithIntl(<Header />);

    await user.click(screen.getByRole("button", { name: t.openMenu }));

    expect(document.getElementById("mobile-navigation")).toBeInTheDocument();
  });

  it("should close the mobile navigation menu", async () => {
    const user = userEvent.setup();

    renderWithIntl(<Header />);

    await user.click(screen.getByRole("button", { name: t.openMenu }));
    await user.click(screen.getByRole("button", { name: t.closeMenu }));

    expect(
      screen.queryByRole("button", { name: t.closeMenu }),
    ).not.toBeInTheDocument();
  });

  it("should close the mobile menu after clicking a navigation link", async () => {
    const user = userEvent.setup();

    renderWithIntl(<Header />);

    await user.click(screen.getByRole("button", { name: t.openMenu }));

    const mobileMenu = document.getElementById("mobile-navigation");

    await user.click(
      within(mobileMenu!).getByRole("link", { name: t.nav.vibe }),
    );

    expect(
      screen.getByRole("button", { name: t.openMenu }),
    ).toBeInTheDocument();
  });
  it("should switch language from the mobile menu and close it", async () => {
    const user = userEvent.setup();
    const { replace } = useRouter();

    renderWithIntl(<Header />);

    await user.click(screen.getByRole("button", { name: t.openMenu }));

    const mobileMenu = document.getElementById("mobile-navigation");

    await user.click(within(mobileMenu!).getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Português" }));

    expect(replace).toHaveBeenCalledWith("/", { locale: "pt" });
    expect(
      document.getElementById("mobile-navigation"),
    ).not.toBeInTheDocument();
  });
});
