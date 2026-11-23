import { useTranslations } from "next-intl";

import StatusPage from "@/components/common/StatusPage";

export default function NotFound() {
  const t = useTranslations("Status.notFound");

  return (
    <main>
      <StatusPage code="404" title={t("title")} description={t("description")} />
    </main>
  );
}