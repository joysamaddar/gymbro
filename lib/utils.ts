import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function parseGender(gender: string | null | undefined) {
  if (!gender) return "Not set";
  if (gender === "male") return "Male";
  if (gender === "female") return "Female";
  return "Other";
}

export function parseDate(
  date: Date | null | undefined,
  options?: {
    includeTime?: boolean;
  }
) {
  if (!date) return "Not set";
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(options?.includeTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  });
}
