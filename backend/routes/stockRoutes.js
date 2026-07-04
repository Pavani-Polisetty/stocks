const express = require("express");
const router = express.Router();

const { getAllStocks } = require("../controllers/stockController");

// Get All Stocks
router.get("/", getAllStocks);

module.exports = router;