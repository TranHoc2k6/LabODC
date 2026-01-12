import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Project {
  project_id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  deadline: string;
  status: string;
}

export default function TalentTasks() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load projects first
  useEffect(() => {
    api.get("/talent/projects").then(res => {
      setProjects(res.data);
      if (res.data.length > 0) {
        setSelectedProject(res.data[0].project_id);
      }
    });
  }, []);

  // Load tasks when project changes
  useEffect(() => {
    if (!selectedProject) return;

    api
      .get(`/talent/projects/${selectedProject}/tasks`)
      .then(res => setTasks(res.data));
  }, [selectedProject]);

  return (
    <>
      <h1>🧩 My Tasks</h1>

      {/* Project selector */}
      <select
        value={selectedProject ?? ""}
        onChange={e => setSelectedProject(Number(e.target.value))}
      >
        {projects.map(p => (
          <option key={p.project_id} value={p.project_id}>
            {p.name}
          </option>
        ))}
      </select>

      <div className="tasks-grid">
        {tasks.map(t => (
          <div className="task-card" key={t.id}>
            <h3>{t.title}</h3>
            <span className={`badge ${t.status}`}>{t.status}</span>
            <p>Deadline: {t.deadline}</p>
          </div>
        ))}
      </div>
    </>
  );
}
