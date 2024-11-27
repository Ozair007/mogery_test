import { profitStyles } from "../constants";

export const ProfitBadge = ({ value }) => {
    const styles = value > 0 ? profitStyles.positive : profitStyles.negative;

    return (
        <div
            className={`flex items-center gap-2 px-2 py-1 rounded-full ${styles.chipBackgroundColor}`}
        >
            <div
                className={`h-2 w-2 rounded-full ${
                    value > 0 ? "bg-green-500" : "bg-red-500"
                }`}
            ></div>
            <span className={`text-[12px] font-medium ${styles.textColor}`}>
                {value.toFixed(2)} USD
            </span>
        </div>
    );
};
