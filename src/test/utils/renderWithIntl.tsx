import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import cart from "@/messages/en/cart.json";
import common from "@/messages/en/common.json";
import home from "@/messages/en/home.json";
import restaurantProfile from "@/messages/en/restaurantProfile.json";
import sunsetSpots from "@/messages/en/sunsetSpots.json";
import tours from "@/messages/en/tours.json";
import status from "@/messages/en/status.json";
import auth from "@/messages/en/auth.json";
import taxi from "@/messages/en/taxi.json";
import beaches from "@/messages/en/beaches.json";
const messages = {
  ...common,
  ...home,
  ...restaurantProfile,
  ...cart,
  ...sunsetSpots,
  ...beaches,
  ...tours,
  ...status,
  ...auth,
  ...taxi,
};

export function renderWithIntl(ui: ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

export { messages };