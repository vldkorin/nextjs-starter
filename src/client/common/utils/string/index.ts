import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeClassNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
