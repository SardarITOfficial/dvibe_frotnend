import Image from "next/image";

import { getInitials } from "@/utils/restaurant";

type RestaurantLogoProps = {
  name: string;
  logo?: string;
};

export default function RestaurantLogo({ name, logo }: RestaurantLogoProps) {
  return (
    <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-accent-soft text-xl font-bold text-accent sm:size-20 sm:text-2xl">
      {logo ? (
        <Image src={logo} alt="" fill sizes="80px" className="object-cover" />
      ) : (
        <span aria-hidden>{getInitials(name)}</span>
      )}
    </div>
  );
}