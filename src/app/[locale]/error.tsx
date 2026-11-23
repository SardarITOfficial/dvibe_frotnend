"use client";

import { useTranslations } from "next-intl";

import StatusPage from "@/components/common/StatusPage";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations("Status.error");

  return (
    <main>
      <StatusPage
        code="500"
        title={t("title")}
        description={t("description")}
        reference={error.digest}
        onRetry={reset}
      />
    </main>
  );
}