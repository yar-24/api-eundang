const express = require("express");
const {fileUploads } = require("../../helpers/filehelper");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getMe,
  getAll,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put(
  "/update/:id",
  [
    body("name"),
    body("email"),
    body("password"),
    fileUploads.single("picProfile"),
  ], protect,
  updateUser
);
router.delete("/:id", protect, deleteUser)
router.get("/:id", protect, getMe);
router.get("/", protect, getAll);

module.exports = router;
