const fs = require("fs");

const costCalculator = (stocklog) => {
    return (
        (stocklog.stock_cost + stocklog.shipment_cost + stocklog.credit_cost) *
        stocklog.stock_quantity
    );
};

exports.getAllOrders = () => {
    try {
        const data = fs.readFileSync("./orders.json", "utf8");
        const orders = JSON.parse(data).orders;
        let productDetails = [];

        const orderProducts = orders.map((order) => {
            const products = JSON.parse(order.products);

            const processedProducts = products.map((product) => ({
                productName: product.product_name,
                invoiceNumber: order.invoice_number,
                totalQuantity: product.quantity,
                primaryRate: product.stocklogs[0].primary_rate,
                secondaryRate: product.stocklogs[0].secondary_rate,
                totalCost: costCalculator(product.stocklogs[0]),
                attributes: product.attributes,
                totalAmount: product.total_price * order.primary_rate,
                totalProfit:
                    product.total_price * order.primary_rate -
                    costCalculator(product.stocklogs[0]),
            }));
            productDetails.push(processedProducts);

            const totalCost = products.reduce(
                (acc, product) =>
                    acc +
                    product.stocklogs.reduce(
                        (acc, stocklog) => acc + costCalculator(stocklog),
                        0
                    ),
                0
            );

            const totalQuantity = products.reduce(
                (acc, product) => acc + product.quantity,
                0
            );

            const totalAmount = order.subtotal * order.primary_rate;
            const totalProfit = totalAmount - totalCost;

            return {
                customer: JSON.parse(order.customer).companyname,
                invoiceNumber: order.invoice_number,
                primaryRate: order.primary_rate,
                secondaryRate: order.secondary_rate,
                totalQuantity,
                totalCost,
                totalAmount,
                totalProfit,
            };
        });

        return {
            orders: orderProducts,
            products: productDetails.flat(),
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
