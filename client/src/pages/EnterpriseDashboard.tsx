import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/enterprise.css";

export default function EnterpriseDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadProjects = () => {
    api.get("/projects/my-projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = () => {
    api.post("/projects", {
      title,
      description
    }).then(() => {
      setTitle("");
      setDescription("");
      loadProjects();
    });
  };

  return (
    <div className="enterprise-container">
      <header className="enterprise-header">
        <h1>🏢 LabODC – Enterprise Dashboard</h1>
        <p>Manage your real-world projects</p>
      </header>

      <div className="create-box">
        <h3>Create New Project</h3>
        <input
          placeholder="Project title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Project description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={createProject}>Create Project</button>
      </div>

      <div className="project-grid">
        {projects.map(p => (
          <div key={p.project_id} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <span className={`status ${p.status}`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
