import { useEffect, useState } from "react";
import { getPendingProjects, validateProject } from "../../api/admin";
import ProjectCard from "../../components/ProjectCard";

const AdminProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);

  const loadProjects = async () => {
    const data = await getPendingProjects();
    setProjects(data);
  };

  const handleValidate = async (id: number) => {
    await validateProject(id);
    loadProjects();
  };


  useEffect(() => {
    loadProjects();
  }, []);

return (
  <div className="admin-content">
    <h1 className="page-title">Admin – Projects</h1>

    <div className="project-wrapper">
      <div className="project-grid">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onValidate={handleValidate}
          />
        ))}
      </div>
    </div>
  </div>
);

}

export default AdminProjects;