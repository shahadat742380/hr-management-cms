import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDateTime = (dateString: string): string => {
  try {
    // Ensure consistent timezone handling
    const date = new Date(dateString);
    // Use UTC methods to ensure consistent output
    const utcDate = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
      ),
    );
    return format(utcDate, "MMM dd, yyyy | hh:mma");
  } catch (error) {
    console.error("Invalid date format:", dateString);
    return "-";
  }
};

export const formatDate = (dateString: string): string => {
  try {
    // Ensure consistent timezone handling
    const date = new Date(dateString);
    // Use UTC methods to ensure consistent output
    const utcDate = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
    return format(utcDate, "MMM dd, yyyy");
  } catch (error) {
    console.error("Invalid date format:", dateString);
    return "-";
  }
};
