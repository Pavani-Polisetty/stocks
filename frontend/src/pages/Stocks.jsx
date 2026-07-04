import { useEffect, useState } from "react";
import { getAllStocks } from "../services/stockService";
import { buyStock } from "../services/portfolioService";
import "./Stocks.css";

function Stocks() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      const data = await getAllStocks();
      setStocks(data.stocks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (stock) => {
    const quantity = prompt(`Enter quantity for ${stock.symbol}`);

    if (!quantity) return;

    try {
      const response = await buyStock({
        symbol: stock.symbol,
        quantity: Number(quantity),
        averagePrice: stock.price,
      });

      alert(response.message);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to buy stock");
    }
  };

  return (
    <div className="stocks-container">
      <h1>Available Stocks</h1>

      <div className="stocks-grid">
        {stocks.map((stock) => (
          <div className="stock-card" key={stock._id}>
            <h2>{stock.company}</h2>

            <p>Symbol : {stock.symbol}</p>

            <p>Price : ₹{stock.price}</p>

            <p>Sector : {stock.sector}</p>

            <button className="buy-btn" onClick={() => handleBuy(stock)}>
              Buy Stock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stocks;
