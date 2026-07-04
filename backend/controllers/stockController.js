const Stock = require("../models/Stock");

// Get All Stocks
exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();

    res.status(200).json({
      success: true,
      count: stocks.length,
      stocks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};