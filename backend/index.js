const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/order.routes');


const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Route to fetch orders
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
