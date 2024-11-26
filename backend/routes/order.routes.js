const express = require('express');
import { getOrders } from '../controllers/order.controller';

const router = express.Router();

router.get('/', getOrders);

export default router;