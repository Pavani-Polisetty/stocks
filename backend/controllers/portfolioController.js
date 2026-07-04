const Portfolio = require("../models/Portfolio");
const User = require("../models/User");

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