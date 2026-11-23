import { beforeEach, describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import CartView from "@/components/sections/CartView";
import { store } from "@/state/redux/store";
import { addItem, clearCart } from "@/state/redux/slices/cartSlice";
import { messages, renderWithIntl } from "@/test/utils/renderWithIntl";

const t = messages.Cart;
const DISH = "Cuscuz with Milk";

const renderCart = () =>
  renderWithIntl(
    <Provider store={store}>
      <CartView />
    </Provider>,
  );

describe("CartView", () => {
  beforeEach(() => {
    store.dispatch(clearCart());
  });

  it("should render the empty state when the cart has no items", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { level: 1, name: t.empty.title }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t.empty.cta })).toBeInTheDocument();
  });

  it("should render the cart items and the pickup form", async () => {
    store.dispatch(
      addItem({ restaurantId: "casa-tchicau", menuItemId: "cuscuz" }),
    );
    renderCart();

    expect(
      await screen.findByRole("heading", { level: 1, name: t.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(DISH)).toBeInTheDocument();
    expect(screen.getByLabelText(t.form.nameLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(t.form.phoneLabel)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: t.form.submit })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("should show a message for each invalid field on submit", async () => {
    const user = userEvent.setup();

    store.dispatch(
      addItem({ restaurantId: "casa-tchicau", menuItemId: "cuscuz" }),
    );
    renderCart();

    await user.click(
      await screen.findByRole("button", { name: t.form.submit }),
    );

    expect(screen.getByText(t.form.nameError)).toBeInTheDocument();
    expect(screen.getByText(t.form.phoneError)).toBeInTheDocument();
    expect(screen.getByLabelText(t.form.nameLabel)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("should clear a field error when the user types in that field", async () => {
    const user = userEvent.setup();

    store.dispatch(
      addItem({ restaurantId: "casa-tchicau", menuItemId: "cuscuz" }),
    );
    renderCart();

    await user.click(
      await screen.findByRole("button", { name: t.form.submit }),
    );
    await user.type(screen.getByLabelText(t.form.nameLabel), "Ana");

    expect(screen.queryByText(t.form.nameError)).not.toBeInTheDocument();
  });

  it("should show the empty state after removing the last item", async () => {
    const user = userEvent.setup();

    store.dispatch(
      addItem({ restaurantId: "casa-tchicau", menuItemId: "cuscuz" }),
    );
    renderCart();

    await user.click(
      await screen.findByRole("button", {
        name: t.removeLabel.replace("{dish}", DISH),
      }),
    );

    expect(
      screen.getByRole("heading", { level: 1, name: t.empty.title }),
    ).toBeInTheDocument();
  });
});
