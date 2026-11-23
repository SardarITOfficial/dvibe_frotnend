import { useId } from "react";
import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  children: ReactNode;
};

export default function SectionCard({ title, children }: SectionCardProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-7"
    >
      <h2
        id={headingId}
        className="font-hero text-xl font-bold text-accent sm:text-2xl"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}