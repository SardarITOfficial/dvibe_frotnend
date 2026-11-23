import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  children?: ReactNode;
};

export default function PageHero({
  id,
  eyebrow,
  title,
  description,
  image,
  children,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby={id}
      className="relative overflow-hidden bg-background_deep pb-16 pt-28 font-hero lg:pb-24 lg:pt-36"
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-background_deep via-background_deep/70 to-background_deep/40"
            aria-hidden
          />
        </>
      )}
      <div className="relative container mx-auto flex flex-col gap-4 px-4">
        <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-sun sm:text-base">
          {eyebrow}
        </p>
        <h1
          id={id}
          className="font-hero text-4xl font-bold leading-[1.125] text-background lg:text-5xl"
        >
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-base text-background/80">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}