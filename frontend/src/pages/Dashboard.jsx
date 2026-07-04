import { useEffect, useState } from "react";
import "./Dashboard.css";
import StatCard from "../components/StatCard";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    balance: 0,
    stocksOwned: 0,
    totalInvestment: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();

      setDashboard({
        balance: data.balance,
        stocksOwned: data.stocksOwned,
        totalInvestment: data.totalInvestment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="dashboard-content">

  <div className="welcome-card">
    <h2>Welcome to SB Stocks 👋</h2>

    <p>
      Practice paper trading using virtual money.
      Buy stocks, build your portfolio, and track your investments.
    </p>
  </div>

  <div className="dashboard-cards">

    <StatCard
      title="Virtual Balance"
      value={`₹${dashboard.balance}`}
    />

    <StatCard
      title="Stocks Owned"
      value={dashboard.stocksOwned}
    />

    <StatCard
      title="Total Investment"
      value={`₹${dashboard.totalInvestment}`}
    />

  </div>

</div>
    </>
  );
}

export default Dashboard;
