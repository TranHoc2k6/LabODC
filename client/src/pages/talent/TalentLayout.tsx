import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../../styles/enterprise.css";

export default function TalentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname.startsWith(path) ? "active" : "";

  return (
    <div className="enterprise-shell">
      <aside className="enterprise-sidebar">
        <h2 className="logo">LabODC</h2>

        <nav>
          <div
            className={`nav-item ${isActive("/talent/dashboard")}`}
            onClick={() => navigate("/talent/dashboard")}
          >
            📁 My Projects
          </div>

          <div
            className={`nav-item ${isActive("/talent/tasks")}`}
            onClick={() => navigate("/talent/tasks")}
          >
            🧩 My Tasks
          </div>

          <div
            className={`nav-item ${isActive("/talent/payments")}`}
            onClick={() => navigate("/talent/payments")}
          >
            💳 My Payments
          </div>

          <div
            className={`nav-item ${isActive("/talent/profile")}`}
            onClick={() => navigate("/talent/profile")}
          >
            👤 My Profile
          </div>
        </nav>
      </aside>

      <main className="enterprise-main">
        <Outlet />
      </main>
    </div>
  );
}
