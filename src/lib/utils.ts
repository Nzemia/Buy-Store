import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//custom delay to test on how long it takes to load, for testing purposes
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "KES",
) {
  return Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
  }).format(Number(price));
}
