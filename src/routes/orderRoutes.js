const express = require("express");
const { getOrders, postOrder, notificationOrder, getOrder, deleteOrder, getOrdersByAdmin } = require("../controllers/orderController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get('/', protect, getOrders)
router.get('/getOrders', protect, getOrdersByAdmin)
router.post('/charge', postOrder)
router.post('/notification', notificationOrder)
router.get('/status/:order_id', protect, getOrder)
router.delete('/charge/:order_id', protect, deleteOrder)

module.exports = router;