import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "@/components/sections/LoginForm";
import { login } from "@/lib/api/auth";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const push = vi.hoisted(() => vi.fn());

vi.mock("@/lib/i18n/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/lib/api/auth", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/api/auth")>()),
  login: vi.fn(),
}));

const t = messages.Auth;

describe("LoginForm", () => {
  beforeEach(() => {
    vi.mocked(login).mockReset();
    push.mockReset();
  });

  it("should show an error for each invalid field on submit", async () => {
    const user = userEvent.setup();

    renderWithIntl(<LoginForm />);
    await user.click(screen.getByRole("button", { name: t.login.submit }));

    expect(screen.getByText(t.errors.email)).toBeInTheDocument();
    expect(screen.getByText(t.errors.password)).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });

  it("should log in and go to the homepage with valid data", async () => {
    const user = userEvent.setup();

    vi.mocked(login).mockResolvedValue(undefined);
    renderWithIntl(<LoginForm />);

    await user.type(screen.getByLabelText(t.fields.email), "ana@example.com");
    await user.type(screen.getByLabelText(t.fields.password), "Password123!");
    await user.click(screen.getByRole("button", { name: t.login.submit }));

    expect(login).toHaveBeenCalledWith({
      email: "ana@example.com",
      password: "Password123!",
    });
    expect(push).toHaveBeenCalledWith("/");
  });

  it("should toggle the password visibility", async () => {
    const user = userEvent.setup();

    renderWithIntl(<LoginForm />);

    const password = screen.getByLabelText(t.fields.password);

    expect(password).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: t.showPassword }));

    expect(password).toHaveAttribute("type", "text");
  });
});