import type { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/lib/i18n/navigation";

type AuthMode = "login" | "signup";

type AuthCardProps = {
  mode: AuthMode;
  children: ReactNode;
};

const SWITCH_HREF = { login: "/signup", signup: "/login" } as const;

export default function AuthCard({ mode, children }: AuthCardProps) {
  const t = useTranslations("Auth");

  return (
    <section
      aria-labelledby="auth-heading"
      className="flex min-h-screen items-center bg-section-bg pb-12 pt-32 font-hero"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-md lg:grid-cols-2">
          <div className="relative hidden min-h-128 lg:block">
            <Image
              src="/image/cta/mindelo-bay.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 512px, 0px"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-background_deep/80 via-background_deep/20 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-8 text-background">
              <p className="text-2xl font-bold">{t("panel.title")}</p>
              <p className="text-sm text-background/80">
                {t("panel.description")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-6 sm:p-10">
            <div className="flex flex-col gap-2">
              <h1
                id="auth-heading"
                className="text-3xl font-bold leading-[1.125] text-accent"
              >
                {t(`${mode}.title`)}
              </h1>
              <p className="text-base text-muted">{t(`${mode}.description`)}</p>
            </div>

            {children}

            <p className="text-center text-sm text-muted">
              {t(`${mode}.switchPrompt`)}{" "}
              <Link
                href={SWITCH_HREF[mode]}
                className="font-semibold text-accent hover:underline"
              >
                {t(`${mode}.switchCta`)}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}