/* eslint-disable react/prop-types */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const OrdersTable = ({ orders }) => (
    <Table className="w-full text-left border">
        <TableHeader>
            <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Products</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {orders.map((order) => (
                <TableRow key={order.order_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                        {order.total.toLocaleString("en-US")} TL
                    </TableCell>
                    <TableCell>
                        {order.products.map((product, index) => (
                            <div key={index}>
                                {product.name} - {product.quantity} ton @{" "}
                                {product.price.toLocaleString("en-US")} TL
                            </div>
                        ))}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default OrdersTable;
