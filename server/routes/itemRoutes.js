const express = require("express");
const router = express.Router();

const {
  reportItem,
  getItems,
  getItemById,
  getLostItems,
  getFoundItems,
  getPendingItems,
  approveItem,
  rejectItem,
  markReturned
} = require("../controllers/itemController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

// routes
// Protect reporting: only logged-in users can report items
router.post("/report", authMiddleware, upload.single("image"), reportItem);
router.get("/", getItems);
router.get("/lost", getLostItems);
router.get("/found", getFoundItems);
router.get("/pending", authMiddleware, adminMiddleware, getPendingItems);
router.get("/:id", getItemById);
router.put("/approve/:id", authMiddleware, adminMiddleware, approveItem);
router.delete("/reject/:id", authMiddleware, adminMiddleware, rejectItem);
router.put("/mark-returned/:id", authMiddleware, markReturned);

module.exports = router;
