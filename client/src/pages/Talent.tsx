import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/talent.css";

export default function Talent() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    api.get("/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="talent-container">
      <header className="talent-header">
        <h1>🎓 LabODC – Talent Dashboard</h1>
        <p>Available Projects</p>
      </header>

      <div className="project-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <button
              onClick={() =>
                api.post(`/projects/${project.id}/join`)
                  .then(() => alert("Join request sent"))
                  .catch(() => alert("Failed to join"))
              }
            >
              Join Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
