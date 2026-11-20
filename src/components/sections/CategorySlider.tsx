"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import type { CategoryItem } from "@/mocks/categories";

type CategorySliderProps = {
  eyebrow: string;
  title: string;
  prevLabel: string;
  nextLabel: string;
  categories: CategoryItem[];
};

const CARD_GAP = 20;

export default function CategorySlider({
  eyebrow,
  title,
  prevLabel,
  nextLabel,
  categories,
}: CategorySliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;

    if (!track || !card) {
      return;
    }

    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + CARD_GAP),
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-accent sm:text-base">
            {eyebrow}
          </p>
          <h2
            id="categories-heading"
            className="font-hero text-3xl font-bold leading-[1.125] text-charcoal sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-4.25">
          <Button
            type="button"
            variant="outline"
            size="icon-wide"
            aria-label={prevLabel}
            onClick={() => scrollByCard(-1)}
          >
            <FiArrowLeft size={34} strokeWidth={1.5} />
          </Button>

          <Button
            type="button"
            variant="accent"
            size="icon-wide"
            aria-label={nextLabel}
            onClick={() => scrollByCard(1)}
          >
            <FiArrowRight size={34} strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map(({ id, label, href, image }) => (
          <li
            key={id}
            className="w-56 shrink-0 snap-start sm:w-62 lg:w-[calc((100%-5rem)/5)]"
          >
            <Link
              href={href}
              className="relative block h-40 overflow-hidden rounded-xl"
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, 248px"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-b from-transparent to-black/50"
              />
              <span className="absolute bottom-3.25 left-6 text-base font-semibold leading-8 text-background">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}