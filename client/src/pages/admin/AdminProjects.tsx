import { useEffect, useState } from "react";
import { getPendingProjects, validateProject } from "../../api/admin";
import ProjectCard from "../../components/ProjectCard";

const AdminProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);

  const loadProjects = async () => {
    const data = await getPendingProjects();
    setProjects(data);
  };

  const handleValidate = async (id: string) => {
    await validateProject(id);
    loadProjects();
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin – Projects</h1>

      <div className="flex gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onValidate={handleValidate}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
