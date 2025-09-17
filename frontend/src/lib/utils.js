import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple Tailwind CSS class names into a single string,
 * intelligently merging conflicts.
 * @param {...string} inputs - Class names or arrays of class names
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
