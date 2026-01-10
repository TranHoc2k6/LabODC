import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/enterprise.css";

export default function EnterpriseLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname.startsWith(path) ? "active" : "";

  return (
    <div className="enterprise-shell">
      {/* SIDEBAR */}
      <aside className="enterprise-sidebar">
        <h2 className="logo">LabODC</h2>

        <nav>
          <div
            className={`nav-item ${isActive("/enterprise/dashboard")}`}
            onClick={() => navigate("/enterprise/dashboard")}
          >
            📁 Projects
          </div>

          <div
            className={`nav-item ${isActive("/enterprise/payments")}`}
            onClick={() => navigate("/enterprise/payments")}
          >
            💳 Payments
          </div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="enterprise-main">
        <Outlet />
      </main>
    </div>
  );
}
