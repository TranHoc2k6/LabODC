import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TalentProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    api.get("/talent/projects").then(res => setProjects(res.data));
  }, []);

  return (
    <>
      <h1>📁 My Projects</h1>

      <div className="projects-grid">
        {projects.map(p => (
          <div className="project-card" key={p.project_id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <span>Status: {p.status}</span>
            <p>Mentor: {p.mentor_name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
