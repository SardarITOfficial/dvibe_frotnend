"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FiCheck, FiShare2 } from "react-icons/fi";

import { Button } from "@/components/ui/Button";

const COPIED_RESET_MS = 2000;

type VibeShareButtonProps = {
  title: string;
};

export default function VibeShareButton({ title }: VibeShareButtonProps) {
  const t = useTranslations("Vibe.details.share");
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => undefined);
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_RESET_MS);
  };

  return (
    <Button variant="glass" size="sm" type="button" onClick={handleShare}>
      {copied ? (
        <FiCheck size={14} aria-hidden />
      ) : (
        <FiShare2 size={14} aria-hidden />
      )}
      <span aria-live="polite">{copied ? t("copied") : t("label")}</span>
    </Button>
  );
}