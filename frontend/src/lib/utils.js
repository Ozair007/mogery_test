import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Formats the given value as currency. If selectedCurrency is "primaryCurrency",
 * it is formatted as USD. Otherwise, it is formatted as TRY.
 * @param {number} value
 * @param {number} primaryRate
 * @param {number} secondaryRate
 * @param {"primaryCurrency" | "secondaryCurrency"} selectedCurrency
 * @returns {string}
 */

export const formatCurrency = (value, secondaryRate, selectedCurrency) => {
    const convertedValue = value / 1000;
    if (selectedCurrency === "primaryCurrency") {
        return convertedValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 5,
        });
    } else {
        return (convertedValue * secondaryRate).toLocaleString("tr-TR", {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 5,
        });
    }
};

export const formatQuantity = (value) => {
    return value.toLocaleString("tr-TR", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
    });
};
