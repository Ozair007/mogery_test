export const profitStyles = {
    positive: {
        textColor: "text-green-600",
        chipBackgroundColor: "bg-[#ecfdf3]",
    },
    negative: {
        textColor: "text-red-600",
        chipBackgroundColor: "bg-red-100",
    },
};

export const filterOptions = [
    { value: "orders", label: "By Orders" },
    { value: "products", label: "By Products" },
];

export const currencyOptions = [
    { value: "primaryCurrency", label: "Primary Currency (USD)" },
    { value: "secondaryCurrency", label: "Secondary Currency (TRY)" },
];
