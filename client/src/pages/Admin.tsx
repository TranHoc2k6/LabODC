import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Admin() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    api.get("/projects/admin/projects").then(res => {
      setProjects(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Admin – All Projects</h2>
      <ul>
        {projects.map(p => (
          <li key={p.project_id}>
            {p.title} – members: {p.members.length}
          </li>
        ))}
      </ul>
    </div>
  );
}
