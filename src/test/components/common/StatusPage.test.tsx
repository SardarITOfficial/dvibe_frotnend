import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import StatusPage from "@/components/common/StatusPage";
import ErrorPage from "@/app/[locale]/error";
import NotFound from "@/app/[locale]/not-found";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Status;

describe("StatusPage", () => {
  it("should render the title, description and a home link", () => {
    renderWithIntl(
      <StatusPage code="404" title="Title" description="Description" />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.home })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.queryByRole("button", { name: t.retry }),
    ).not.toBeInTheDocument();
  });
});

describe("NotFound", () => {
  it("should render the not found message", () => {
    renderWithIntl(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: t.notFound.title }),
    ).toBeInTheDocument();
  });
});

describe("ErrorPage", () => {
  it("should render the error message and the reference", () => {
    renderWithIntl(
      <ErrorPage error={Object.assign(new Error("x"), { digest: "abc123" })} reset={vi.fn()} />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: t.error.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Error reference: abc123")).toBeInTheDocument();
  });

  it("should call reset when the user tries again", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();

    renderWithIntl(<ErrorPage error={new Error("x")} reset={reset} />);

    await user.click(screen.getByRole("button", { name: t.retry }));

    expect(reset).toHaveBeenCalledTimes(1);
  });
});