const { getAllOrders } = require("../services/order.services");

exports.getOrders = (req, res) => {
    try {
        const processedData = getAllOrders();

        res.json(processedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
