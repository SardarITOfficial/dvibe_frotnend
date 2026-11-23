import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import cart from "@/messages/en/cart.json";
import common from "@/messages/en/common.json";
import home from "@/messages/en/home.json";
import restaurantProfile from "@/messages/en/restaurantProfile.json";
import sunsetSpots from "@/messages/en/sunsetSpots.json";
const messages = {
  ...common,
  ...home,
  ...restaurantProfile,
  ...cart,
  ...sunsetSpots,
};

export function renderWithIntl(ui: ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

export { messages };