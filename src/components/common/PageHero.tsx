type PageHeroProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({
  id,
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby={id}
      className="bg-background_deep pb-16 pt-28 font-hero lg:pb-24 lg:pt-36"
    >
      <div className="container mx-auto flex flex-col gap-4 px-4">
        <p className="text-sm font-medium uppercase leading-4 tracking-[2.4px] text-sun sm:text-base">
          {eyebrow}
        </p>
        <h1
          id={id}
          className="font-hero text-4xl font-bold leading-[1.125] text-background lg:text-6xl"
        >
          {title}
        </h1>
        <p className="max-w-2xl text-base text-background/80">{description}</p>
      </div>
    </section>
  );
}