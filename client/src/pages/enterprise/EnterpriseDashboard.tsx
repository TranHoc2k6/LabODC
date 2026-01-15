import { useEffect, useState } from "react";
import { getEnterpriseDashboard } from "../../api/enterprise";
import "../../styles/enterprise.css";

export default function EnterpriseDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getEnterpriseDashboard().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <h1 className="page-title">Enterprise Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p>{data.totalProjects}</p>
        </div>

        <div className="stat-card">
          <h3>Active Talents</h3>
          <p>{data.activeTalents}</p>
        </div>

        <div className="stat-card">
          <h3>Total Spent</h3>
          <p>${data.totalSpent.toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}
