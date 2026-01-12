import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/talent.css";

interface Project {
  project_id: number;
  name: string;
  status: string;
  mentor: string;
  role: string;
  my_fund: number;
}

export default function TalentDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/talent/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="talent-layout">
      <>
  <h1 className="page-title">🎓 My ODC Projects</h1>

  <div className="project-grid">
    {projects.map(p => (
      <div className="project-card" key={p.project_id}>

        <div className="card-header">
          <h3>{p.name}</h3>
          <span className={`badge ${p.status}`}>{p.status}</span>
        </div>

        <p className="desc">
          Mentor: {p.mentor}<br/>
          Role: {p.role.toUpperCase()}
        </p>

        <div className="card-footer">
          <span>💰 {p.my_fund.toLocaleString()} VND</span>
          <button
            className="btn-view"
            onClick={() => navigate(`/talent/projects/${p.project_id}`)}
          >
            Open
          </button>
        </div>

      </div>
    ))}
  </div>
</>

    </div>
  );
}
