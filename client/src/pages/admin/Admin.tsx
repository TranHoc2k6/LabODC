import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../../styles/admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname.startsWith(path) ? "active" : "";

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>LabODC</h2>
        <ul>
          <li
            className={isActive("/admin/projects")}
            onClick={() => navigate("/admin/projects")}
          >
            Projects
          </li>

          <li
            className={isActive("/admin/users")}
            onClick={() => navigate("/admin/users")}
          >
            Users
          </li>

          <li
            className={isActive("/admin/payments")}
            onClick={() => navigate("/admin/payments")}
          >
            Payments
          </li>
        </ul>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
