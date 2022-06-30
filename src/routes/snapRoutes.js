const express = require("express");
const { createSnap, getSnaps, getSnap } = require("../controllers/snapController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post('/', createSnap)
router.get('/', getSnaps)
router.get('/:id', getSnap)

module.exports = router