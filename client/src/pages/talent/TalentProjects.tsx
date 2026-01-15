import { useEffect, useState } from "react";
import { getTalentProjects } from "../../api/talent";
import "../../styles/talent.css";

export default function TalentProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getTalentProjects().then(setProjects);
  }, []);

  return (
    <>
      <h1>Available Projects</h1>

      {projects.length === 0 && <p>No projects available yet.</p>}

      <div className="talent-projects">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <button>Join</button>
          </div>
        ))}
      </div>
    </>
  );
}
