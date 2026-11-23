import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import AuthCard from "@/components/sections/AuthCard";
import LoginForm from "@/components/sections/LoginForm";
import { buildMetadata } from "@/lib/i18n/metadata";

type LoginPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({
  params,
}: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/login" });
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <AuthCard mode="login">
        <LoginForm />
      </AuthCard>
    </main>
  );
}