import { useEffect, useState } from "react";
import { getPortfolio, sellStock } from "../services/portfolioService";
import "./Portfolio.css";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const data = await getPortfolio();
      setPortfolio(data.portfolio);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSell = async (symbol) => {
    const quantity = prompt("Enter quantity to sell");

    if (!quantity) return;

    try {
      const response = await sellStock({
        symbol,
        quantity: Number(quantity),
      });

      alert(response.message);

      loadPortfolio();
    } catch (error) {
  console.log(error);
  console.log(error.response);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Sell Failed"
  );
}
  };

  return (
    <div className="portfolio-container">
      <h1>My Portfolio</h1>

      {portfolio.length === 0 ? (
        <p>No stocks purchased yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Buy Price</th>
              <th>Total Investment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {portfolio.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.symbol}</td>
                <td>{stock.quantity}</td>
                <td>₹{stock.averagePrice}</td>
                <td>₹{stock.quantity * stock.averagePrice}</td>

                <td>
                  <button
                    className="sell-btn"
                    onClick={() => handleSell(stock.symbol)}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Portfolio;
