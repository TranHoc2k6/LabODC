import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/admin.css";
import "../styles/enterprise.css";
import "../styles/talent.css";

export default function PageTemplate() {
  const { user } = useAuth();
  const role = user?.role;

  const roleClass =
    role === "enterprise"
      ? "enterprise-layout"
      : role === "mentor"
      ? "mentor-layout"
      : role === "talent"
      ? "talent-layout"
      : "admin-layout";

  return (
    <div className={roleClass}>
      <aside className={role === "talent" ? "talent-sidebar" : "sidebar"}>
        <h2 className={role === "talent" ? "talent-logo" : "logo text-center"}>
          LabODC
        </h2>

        <nav className={role === "talent" ? "talent-menu" : ""}>
          {/* ADMIN */}
          {role === "lab_admin" && (
            <>
              <NavLink to="/admin/projects" className="nav-item">
                Projects
              </NavLink>
              <NavLink to="/admin/users" className="nav-item">
                Users
              </NavLink>
              <NavLink to="/admin/payments" className="nav-item">
                Payments
              </NavLink>
            </>
          )}

          {/* ENTERPRISE */}
          {role === "enterprise" && (
            <>
              <NavLink to="/enterprise/dashboard" className="nav-item">
                Dashboard
              </NavLink>
              <NavLink to="/enterprise/create-project" className="nav-item">
                Create Project
              </NavLink>
              <NavLink to="/enterprise/payments" className="nav-item">
                Payments
              </NavLink>
            </>
          )}

          {/* TALENT */}
          {role === "talent" && (
            <>
              <NavLink to="/talent/dashboard">Dashboard</NavLink>
              <NavLink to="/talent/projects">Projects</NavLink>
              <NavLink to="/talent/profile">Profile</NavLink>
            </>
          )}
        </nav>
      </aside>

      <main className={role === "talent" ? "talent-main" : "admin-content"}>
        <Outlet />
      </main>
    </div>
  );
}
