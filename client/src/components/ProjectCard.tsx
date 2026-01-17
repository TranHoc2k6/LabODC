interface ProjectCardProps {
  project: any;
  onValidate: (id: number) => void;
}

const ProjectCard = ({ project, onValidate }: ProjectCardProps) => {
  return (
    <div className="project-card">

      <div>
        <h3>{project.title}</h3>
        <p>Enterprise: {project.enterprise?.name || "N/A"}</p>
      </div>

      <p>{project.members?.length || 0}</p>

      <span className="project-status">pending</span>

      <button onClick={() => onValidate(project.id)}>
        Approve
      </button>

    </div>
  );
};


export default ProjectCard;
