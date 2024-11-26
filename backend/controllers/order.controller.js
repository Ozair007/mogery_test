const fs = require('fs');

export const getOrders = (req, res) => {
	fs.readFile('./orders.json', 'utf8', (err, data) => {
	  if (err) {
		return res.status(500).json({ message: 'Error reading orders file' });
	  }
	  const orders = JSON.parse(data).orders;
	  res.json(orders);
	});
  }