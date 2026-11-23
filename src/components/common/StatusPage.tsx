import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { Link } from "@/lib/i18n/navigation";

type StatusPageProps = {
  code: string;
  title: string;
  description: string;
  reference?: string;
  onRetry?: () => void;
};

export default function StatusPage({
  code,
  title,
  description,
  reference,
  onRetry,
}: StatusPageProps) {
  const t = useTranslations("Status");

  return (
    <section
      aria-labelledby="status-heading"
      className="flex min-h-screen items-center bg-section-bg pb-16 pt-32 font-hero"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 rounded-2xl border border-border bg-background px-6 py-14 text-center shadow-sm">
          <p aria-hidden className="text-7xl font-bold leading-none text-accent/20 sm:text-8xl">
            {code}
          </p>
          <h1
            id="status-heading"
            className="text-2xl font-bold text-charcoal sm:text-3xl"
          >
            {title}
          </h1>
          <p className="text-base leading-relaxed text-muted">{description}</p>
          {reference && (
            <p className="text-xs text-subtle">
              {t("reference", { id: reference })}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            {onRetry && (
              <Button variant="accent" type="button" onClick={onRetry}>
                {t("retry")}
              </Button>
            )}
            <Link
              href="/"
              className={
                onRetry
                  ? "inline-flex items-center justify-center rounded-full border-2 border-accent px-6 py-3 text-base font-medium text-accent transition-opacity hover:opacity-80"
                  : "inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-semibold text-background transition-opacity hover:opacity-80"
              }
            >
              {t("home")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}