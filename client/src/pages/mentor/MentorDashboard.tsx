import { useEffect, useState } from 'react';
import { projectAPI } from '../../api/project';
import '../../styles/mentor.css';

export default function MentorDashboard() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await projectAPI.getMentorProjects();
    setProjects(res.data);
  };

  const activeProjects = projects.filter(
    (p) => p.status === 'ACTIVE'
  );

  return (
    <div className="mentor-dashboard">
      <h1>Mentor Dashboard</h1>

      <div className="stats">
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p>{activeProjects.length}</p>
        </div>

        <div className="stat-card">
          <h3>Total Projects</h3>
          <p>{projects.length}</p>
        </div>
      </div>

      <div className="projects-list">
        <h2>My Projects</h2>

        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>Status: {project.status}</p>

            <a href={`/mentor/projects/${project.id}`}>
              Manage
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
