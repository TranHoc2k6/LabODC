interface ProjectCardProps {
  project: any;
  onValidate: (id: string) => void;
}

const ProjectCard = ({ project, onValidate }: ProjectCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-[350px]">
      <h2 className="text-xl font-semibold">{project.title}</h2>

      <p className="text-gray-500 mt-1">
        Enterprise: {project.enterprise?.name || "N/A"}
      </p>

      <p className="mt-2 text-sm">
        Members: {project.members?.length || 0}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
          onClick={() => onValidate(project._id)}
        >
          Approve
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
