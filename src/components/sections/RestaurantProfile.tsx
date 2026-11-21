import RestaurantCartBar from "@/components/sections/RestaurantCartBar";
import RestaurantMenuSection from "@/components/sections/RestaurantMenuSection";
import RestaurantProfileHeader from "@/components/sections/RestaurantProfileHeader";
import type { RestaurantItem } from "@/mocks/restaurants";
import type { RestaurantMenu } from "@/types";

type RestaurantProfileProps = {
  restaurant: RestaurantItem;
  menu: RestaurantMenu;
};

export default function RestaurantProfile({
  restaurant,
  menu,
}: RestaurantProfileProps) {
  return (
    <>
      <RestaurantProfileHeader
        restaurant={restaurant}
        whatsapp={menu.whatsapp}
      />
      <RestaurantMenuSection menu={menu} />
      <RestaurantCartBar
        restaurantId={menu.restaurantId}
        categories={menu.categories}
      />
    </>
  );
}