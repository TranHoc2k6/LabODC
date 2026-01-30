import { useEffect, useState } from "react";
import { getTalentProjects, joinProject } from "../../api/talent";
import "../../styles/talent.css";

export default function TalentProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getTalentProjects().then(setProjects);
  }, []);

  const handleJoin = async (projectId: number) => {
    try {
      const res = await joinProject(projectId);

      // Lưu count từ backend response
      localStorage.setItem("joinedCount", res.joined_count.toString());
      
      // QUAN TRỌNG: Lưu project ID vào array
      const joinedProjects = JSON.parse(localStorage.getItem("joinedProjects") || "[]");
      if (!joinedProjects.includes(projectId)) {
        joinedProjects.push(projectId);
        localStorage.setItem("joinedProjects", JSON.stringify(joinedProjects));
      }

      alert("Joined project successfully!");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Join failed");
    }
  };

  return (
    <>
      <h1>Available Projects</h1>

      {projects.length === 0 && <p>No projects available yet.</p>}

      <div className="talent-projects">
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <button onClick={() => handleJoin(p.id)}>
              Join
            </button>
          </div>
        ))}
      </div>
    </>
  );
}