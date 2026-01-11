import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../../styles/talent.css";

export default function Talent() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (p: string) =>
    location.pathname.startsWith(p) ? "active" : "";

  return (
    <div className="talent-layout">
      <aside className="sidebar">
        <h2>LabODC Talent</h2>
        <ul>
          <li className={isActive("/talent")} onClick={() => navigate("/talent")}>
            Dashboard
          </li>
          <li className={isActive("/talent/projects")} onClick={() => navigate("/talent/projects")}>
            Projects
          </li>
          <li className={isActive("/talent/profile")} onClick={() => navigate("/talent/profile")}>
            Profile
          </li>
        </ul>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
