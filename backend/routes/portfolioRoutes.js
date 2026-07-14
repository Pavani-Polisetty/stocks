const express = require("express");
const router = express.Router();
const {
  buyStock,
  getPortfolio,
  sellStock,
} = require("../controllers/portfolioController");

const protect = require("../middleware/authMiddleware");

// Buy Stock
router.post("/buy", protect, buyStock);

// Get Portfolio
router.get("/", protect, getPortfolio);
router.post("/sell", protect, sellStock);

module.exports = router;