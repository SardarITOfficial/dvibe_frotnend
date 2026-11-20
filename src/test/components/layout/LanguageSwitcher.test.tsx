import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useRouter } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const trigger = { name: messages.Header.languageLabel };

describe("LanguageSwitcher", () => {
  it("should be closed by default", () => {
    renderWithIntl(<LanguageSwitcher />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should list every configured locale when opened", async () => {
    const user = userEvent.setup();

    renderWithIntl(<LanguageSwitcher />);

    await user.click(screen.getByRole("button", trigger));

    expect(screen.getAllByRole("listitem")).toHaveLength(
      routing.locales.length,
    );
  });

  it("should switch the language and close the dropdown", async () => {
    const user = userEvent.setup();
    const { replace } = useRouter();

    renderWithIntl(<LanguageSwitcher />);

    await user.click(screen.getByRole("button", trigger));
    await user.click(screen.getByRole("button", { name: "Português" }));

    expect(replace).toHaveBeenCalledWith("/", { locale: "pt" });
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should close when clicking outside", async () => {
    const user = userEvent.setup();

    renderWithIntl(<LanguageSwitcher />);

    await user.click(screen.getByRole("button", trigger));
    await user.click(document.body);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should render every locale as a button in the inline variant", () => {
    renderWithIntl(<LanguageSwitcher variant="inline" />);

    expect(screen.getAllByRole("button")).toHaveLength(routing.locales.length);
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("should switch language and call onSelect in the inline variant", async () => {
    const user = userEvent.setup();
    const { replace } = useRouter();
    const handleSelect = vi.fn();

    renderWithIntl(
      <LanguageSwitcher variant="inline" onSelect={handleSelect} />,
    );

    await user.click(screen.getByRole("button", { name: "Português" }));

    expect(replace).toHaveBeenCalledWith("/", { locale: "pt" });
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});