"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { FiX } from "react-icons/fi";

import { Button } from "@/components/ui/Button";

type ModalProps = {
  isOpen: boolean;
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({
  isOpen,
  title,
  closeLabel,
  onClose,
  children,
}: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background_deep/60 sm:items-center sm:p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-full w-full max-w-2xl flex-col gap-6 overflow-y-auto rounded-t-2xl bg-background p-5 shadow-lg outline-none sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-bold text-accent">
            {title}
          </h2>
          <Button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-accent"
          >
            <FiX size={20} aria-hidden />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}