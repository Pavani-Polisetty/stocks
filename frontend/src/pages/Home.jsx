import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Practice Stock Trading Without Risk</h1>

          <p>
            Learn, practice and improve your stock market skills using virtual
            money and real-time US stock data.
          </p>

          <button className="hero-btn" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
