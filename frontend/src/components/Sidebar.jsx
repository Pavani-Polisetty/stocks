import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="sidebar">
      <h3>Menu</h3>

      <ul>
        <li>
          <Link to="/dashboard">📊 Dashboard</Link>
        </li>

        <li>
          <Link to="/stocks">📈 Stocks</Link>
        </li>

        <li>
          <Link to="/portfolio">💼 Portfolio</Link>
        </li>

        <li>
          <Link to="/profile">👤 Profile</Link>
        </li>

        <li>
          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
