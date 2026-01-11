import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TalentDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [me, setMe] = useState<any>({});

  useEffect(() => {
    api.get("/talent/me").then(res => setMe(res.data));
    api.get("/talent/projects").then(res => setProjects(res.data));
    api.get("/talent/payments").then(res => setPayments(res.data));
  }, []);

  const earned = payments
    .filter(p => p.status === "paid")
    .reduce((sum, p) => sum + p.team_amount, 0);

  return (
    <>
      <h1>🎯 My LabODC</h1>

      <div className="dashboard-grid">
        <div className="dash-card">
          <h4>Active Projects</h4>
          <p>{projects.length}</p>
        </div>

        <div className="dash-card">
          <h4>Role</h4>
          <p>{me.role}</p>
        </div>

        <div className="dash-card">
          <h4>Email</h4>
          <p>{me.email}</p>
        </div>

        <div className="dash-card">
          <h4>Earned</h4>
          <p>${earned.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
}
