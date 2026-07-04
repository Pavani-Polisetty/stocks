
function DashboardNavbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-navbar">

      <h2>📈 SB Stocks</h2>

      <h3
  style={{
    fontSize: "25px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0"
  }}
>
  Welcome, {user?.name}
</h3>

    </div>
  );
}

export default DashboardNavbar;