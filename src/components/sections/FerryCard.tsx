import type { ReactNode } from "react";

type FerryCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
};

export default function FerryCard({
  icon,
  title,
  description,
  children,
}: FerryCardProps) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-xl border border-border bg-cream p-5 sm:p-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span aria-hidden className="text-sun">
            {icon}
          </span>
          <h3 className="text-2xl font-semibold text-charcoal">{title}</h3>
        </div>
        <p className="text-sm text-subtle">{description}</p>
      </header>
      {children}
    </article>
  );
}