import { NavLink, Outlet } from "react-router-dom";
import "../../styles/talent.css";

export default function TalentLayout() {
  return (
    <div className="talent-layout">
      <aside className="talent-sidebar">
        <h2 className="logo">LabODC</h2>

        <NavLink to="/talent">Home</NavLink>
        <NavLink to="/talent/projects">My Projects</NavLink>
        <NavLink to="/talent/payments">Payments</NavLink>

      </aside>

      <main className="talent-content">
        <Outlet />
      </main>
    </div>
  );
}
