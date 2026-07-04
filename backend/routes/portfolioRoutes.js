const express = require("express");
const router = express.Router();

const {
  buyStock,
  getPortfolio,
} = require("../controllers/portfolioController");

const protect = require("../middleware/authMiddleware");

// Buy Stock
router.post("/buy", protect, buyStock);

// Get Portfolio
router.get("/", protect, getPortfolio);

module.exports = router;