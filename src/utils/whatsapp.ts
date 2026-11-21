export function buildWhatsAppHref(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}