const Portfolio = require("../models/Portfolio");
const User = require("../models/User");
const Stock = require("../models/Stock");

exports.buyStock = async (req, res) => {
  try {
    const { symbol, quantity, averagePrice } = req.body;

    const userId = req.user.id;

    const totalCost = quantity * averagePrice;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.balance < totalCost) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Balance",
      });
    }

    const portfolio = new Portfolio({
      user: userId,
      symbol,
      quantity,
      averagePrice,
    });

    await portfolio.save();

    user.balance -= totalCost;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Stock Purchased Successfully",
      portfolio,
      balance: user.balance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;

    const portfolio = await Portfolio.find({
      user: userId,
    });

    res.status(200).json({
      success: true,
      portfolio,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.sellStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;

    const userId = req.user.id;

    // Find portfolio entry
    const portfolio = await Portfolio.findOne({
      user: userId,
      symbol,
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Stock not found in portfolio",
      });
    }

    if (portfolio.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough shares to sell",
      });
    }

    // Get current stock price
    const stock = await Stock.findOne({ symbol });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    const sellAmount = quantity * stock.price;

    const user = await User.findById(userId);

    user.balance += sellAmount;

    await user.save();

    portfolio.quantity -= quantity;

    if (portfolio.quantity === 0) {
      await portfolio.deleteOne();
    } else {
      await portfolio.save();
    }

    res.status(200).json({
      success: true,
      message: "Stock sold successfully",
      balance: user.balance,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};