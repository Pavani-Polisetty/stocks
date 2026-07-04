const User = require("../models/User");
const Portfolio = require("../models/Portfolio");

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const portfolio = await Portfolio.find({
      user: req.user.id,
    });

    let totalInvestment = 0;

    portfolio.forEach((stock) => {
      totalInvestment += stock.quantity * stock.averagePrice;
    });

    res.status(200).json({
      success: true,
      balance: user.balance,
      stocksOwned: portfolio.length,
      totalInvestment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};