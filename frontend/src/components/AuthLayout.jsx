import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";
import "./AuthLayout.css";

function AuthLayout() {
  return (
    <>
      <DashboardNavbar />

      <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
