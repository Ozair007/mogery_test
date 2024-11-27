import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Converts a number into USD format by dividing it by 1000.
 * @param {number} value - The number to be converted.
 * @returns {string} - Formatted USD string.
 */
export const formatToUSD = (value) => {
    if (typeof value !== "number") {
        throw new TypeError("Value must be a number");
    }
    const convertedValue = value / 1000;
    return convertedValue.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 5,
    });
};
