import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import AuthCard from "@/components/sections/AuthCard";
import SignupForm from "@/components/sections/SignupForm";
import { buildMetadata } from "@/lib/i18n/metadata";

type SignupPageProps = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({
  params,
}: SignupPageProps): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({ locale, path: "/signup" });
}

export default async function SignupPage({ params }: SignupPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <AuthCard mode="signup">
        <SignupForm />
      </AuthCard>
    </main>
  );
}