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
import { formatToUSD } from "../lib/utils";
import ProductDialog from "./ProductDialog";
import { ProfitBadge } from "./ProfitBadge";
import { FilterDropdown } from "./FilterDropdown";
import Loader from "./Loader";

const OrdersList = () => {
    const { data: allData = {}, error, isLoading } = useGetOrdersQuery();
    const [selected, setSelected] = useState("orders");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const options = [
        { value: "orders", label: "By Orders" },
        { value: "products", label: "By Products" },
    ];

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
            {/* Dropdown Menu */}
            <div className="flex items-center mb-5">
                <FilterDropdown
                    options={options}
                    selected={selected}
                    setSelected={setSelected}
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
                                    <TableCell className="px-4 py-2 w-[120px]">
                                        {data.totalQuantity}&nbsp;USD
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-base w-[150px]">
                                        {formatToUSD(data.totalAmount)}
                                    </TableCell>
                                    <TableCell className="px-4 py-2 text-base w-[120px]">
                                        {formatToUSD(data.totalCost)}
                                    </TableCell>
                                    <TableCell className="flex items-center px-4 py-2 w-[150px]">
                                        <ProfitBadge value={data.totalProfit} />
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
