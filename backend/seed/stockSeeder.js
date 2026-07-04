const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Stock = require("../models/Stock");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const stocks = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    price: 210,
    sector: "Technology",
  },
  {
    symbol: "TSLA",
    company: "Tesla",
    price: 320,
    sector: "Automobile",
  },
  {
    symbol: "MSFT",
    company: "Microsoft",
    price: 450,
    sector: "Technology",
  },
  {
    symbol: "AMZN",
    company: "Amazon",
    price: 190,
    sector: "E-Commerce",
  },
  {
    symbol: "GOOGL",
    company: "Google",
    price: 175,
    sector: "Technology",
  },
  {
    symbol: "META",
    company: "Meta",
    price: 540,
    sector: "Technology",
  },
  {
    symbol: "NVDA",
    company: "NVIDIA",
    price: 980,
    sector: "Semiconductor",
  },
  {
    symbol: "AMD",
    company: "AMD",
    price: 170,
    sector: "Semiconductor",
  },
  {
    symbol: "NFLX",
    company: "Netflix",
    price: 650,
    sector: "Entertainment",
  },
  {
    symbol: "INTC",
    company: "Intel",
    price: 35,
    sector: "Semiconductor",
  },
];

const importData = async () => {
  try {
    await Stock.deleteMany();
    await Stock.insertMany(stocks);

    console.log("✅ Stocks Added Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();