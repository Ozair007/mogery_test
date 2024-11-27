const fs = require("fs");

const costCalculator = (stocklog) => {
    return (
        (stocklog.stock_cost + stocklog.shipment_cost + stocklog.credit_cost) *
        stocklog.stock_quantity
    );
};

exports.getOrders = (req, res) => {
    try {
        fs.readFile("./orders.json", "utf8", (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error reading orders file" });
            }

            const orders = JSON.parse(data).orders;
            let processedProducts = [];

            const processedOrders = orders.map((order) => {
                const products = JSON.parse(order.products);

                processedProducts.push(
                    products.map((product) => {
                        return {
                            productName: product.product_name,
                            invoiceNumber: order.invoice_number,
                            totalQuantity: product.quantity,
                            totalCost: costCalculator(product.stocklogs[0]),
                            attributes: product.attributes,
                            totalAmount:
                                product.total_price * order.primary_rate,
                            totalProfit:
                                product.total_price * order.primary_rate -
                                costCalculator(product.stocklogs[0]),
                        };
                    })
                );

                const totalCost = products.reduce((acc, product) => {
                    const productCost = product.stocklogs.reduce(
                        (acc, stocklog) => {
                            return acc + costCalculator(stocklog);
                        },
                        0
                    );
                    return acc + productCost;
                }, 0);

                const totalQuantity = products.reduce((acc, product) => {
                    return acc + product.quantity;
                }, 0);

                const totalAmount = order.subtotal * order.primary_rate;
                const totalProfit = totalAmount - totalCost;

                return {
                    customer: JSON.parse(order.customer).companyname,
                    invoiceNumber: order.invoice_number,
                    totalQuantity,
                    totalCost,
                    totalAmount,
                    totalProfit,
                };
            });

            res.json({
                orders: processedOrders,
                products: processedProducts.flat(),
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
