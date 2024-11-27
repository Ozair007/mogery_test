import { useState } from "react";
import { useGetOrdersQuery } from "../features/orders/ordersSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatQuantity } from "../lib/utils";
import ProductDialog from "./ProductDialog";
import { ProfitBadge } from "./ProfitBadge";
import { FilterDropdown } from "./FilterDropdown";
import Loader from "./Loader";
import { currencyOptions, filterOptions } from "../constants";

const OrdersList = () => {
    const { data: allData = {}, error, isLoading } = useGetOrdersQuery();
    const [selected, setSelected] = useState("orders");
    const [selectedCurrency, setSelectedCurrency] = useState("primaryCurrency");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (isLoading)
        return (
            <div className="flex justify-center my-10">
                <Loader />
            </div>
        );

    const dataToShow = [...(allData[selected] || [])];

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    };

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-5">
                {/* Dropdown Menu */}
                <FilterDropdown
                    options={filterOptions}
                    selected={selected}
                    setSelected={setSelected}
                />

                {/* Filter Dropdown for Currency */}
                <FilterDropdown
                    options={currencyOptions}
                    selected={selectedCurrency}
                    setSelected={setSelectedCurrency}
                />
            </div>
            {/* Table */}
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-md bg-gray-100">
                <h2 className="px-4 my-5">Order Cost Table</h2>
                <Table className="w-full min-w-[800px]">
                    <TableHeader className="bg-gray-200">
                        <TableRow>
                            <TableHead className="px-4 py-2 text-sm text-gray-700 font-semibold w-[200px] block">
                                Customer / Product
                            </TableHead>
                            <TableHead className="px-4 py-2 text-gray-700 font-semibold w-[150px]">
                                Invoice Number
                            </TableHead>
                            <TableHead className="px-4 py-2 text-gray-700 font-semibold w-[120px]">
                                Total Quantity
                            </TableHead>
                            <TableHead className="px-4 py-2 text-gray-700 font-semibold w-[120px]">
                                Total Cost
                            </TableHead>
                            <TableHead className="px-4 py-2 text-gray-700 font-semibold w-[150px]">
                                Total Amount
                            </TableHead>
                            <TableHead className="px-4 py-2 text-gray-700 font-semibold w-[150px]">
                                Total Profit
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!error && dataToShow?.length > 0 ? (
                            dataToShow.map((data, index) => (
                                <TableRow
                                    key={`${selected}-${data?.customer || data.productName}-${data.invoiceNumber}-${index}`}
                                    className="hover:bg-gray-50"
                                    onClick={() =>
                                        selected === "products" &&
                                        handleProductClick(data)
                                    }
                                >
                                    <TableCell className="px-4 py-2 w-[200px]">
                                        {selected === "orders"
                                            ? data.customer
                                            : data.productName}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 w-[150px]">
                                        {data.invoiceNumber}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-base w-[120px]">
                                        {formatQuantity(data.totalQuantity)}
                                        &nbsp;ton
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-base w-[150px]">
                                        {formatCurrency(
                                            data.totalAmount,
                                            data.secondaryRate,
                                            selectedCurrency
                                        )}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-base w-[120px]">
                                        {formatCurrency(
                                            data.totalCost,
                                            data.secondaryRate,
                                            selectedCurrency
                                        )}
                                    </TableCell>
                                    <TableCell className="flex items-center px-4 py-2 w-[150px]">
                                        <ProfitBadge
                                            value={
                                                selectedCurrency ===
                                                "primaryCurrency"
                                                    ? data.totalProfit
                                                    : data.totalProfit *
                                                      data.secondaryRate
                                            }
                                            selectedCurrency={selectedCurrency}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-4 text-gray-500"
                                >
                                    No data available for{" "}
                                    {selected === "orders"
                                        ? "Orders"
                                        : "Products"}
                                    .
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Dialog */}
            {selected === "products" && selectedProduct && (
                <ProductDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    selectedProduct={selectedProduct}
                />
            )}
        </div>
    );
};

export default OrdersList;
