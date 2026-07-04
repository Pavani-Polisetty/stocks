import { useEffect, useState } from "react";
import { getPortfolio } from "../services/portfolioService";
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
            </tr>
          </thead>

          <tbody>
            {portfolio.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.symbol}</td>
                <td>{stock.quantity}</td>
                <td>₹{stock.averagePrice}</td>
                <td>₹{stock.quantity * stock.averagePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Portfolio;