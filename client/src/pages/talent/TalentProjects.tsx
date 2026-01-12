import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

interface Project {
  project_id: number;
  name: string;
  mentor: string;
  role: string;
  my_fund: number;
  status: string;
}

export default function TalentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/talent/projects").then(res => setProjects(res.data));
  }, []);

  return (
    <div>
      <h2>My ODC Projects</h2>

      {projects.length === 0 && (
        <p>You are not assigned to any LabODC project yet.</p>
      )}

      {projects.map(p => (
        <div key={p.project_id} className="card">
          <h3>{p.name}</h3>

          <div style={{ display: "flex", gap: 20 }}>
            <span>👨‍🏫 Mentor: {p.mentor}</span>
            <span>👤 Role: {p.role}</span>
            <span>📌 Status: {p.status}</span>
          </div>

          <p>💰 My Fund: ${p.my_fund}</p>

          <button
            onClick={() => navigate(`/talent/projects/${p.project_id}`)}
          >
            Enter Workspace
          </button>
        </div>
      ))}
    </div>
  );
}
