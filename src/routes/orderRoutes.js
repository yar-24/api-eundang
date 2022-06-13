const express = require("express");
const { getOrder, postOrder, notifikasiOrder, getOrderOffline } = require("../controllers/orderController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get('/', getOrder)
router.post('/charge', postOrder)
router.post('/notifikasi', notifikasiOrder)
router.post('/status/:order_id', getOrderOffline)

module.exports = router;