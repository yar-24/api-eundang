const express = require("express");
const { getOrders, postOrder, notificationOrder, getOrder } = require("../controllers/orderController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get('/', getOrders)
router.post('/charge',protect, postOrder)
router.post('/notification', notificationOrder)
router.get('/status/:order_id',protect, getOrder)

module.exports = router;