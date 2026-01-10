import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/enterprise.css";

export default function EnterpriseCreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/projects", {
        title,
        description
      });

      navigate("/posts");
    } catch (err) {
      console.error(err);
      alert("Create project failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enterprise-layout">
      <h1 className="page-title">➕ Create New Project</h1>

      <form className="project-form" onSubmit={submit}>
        <label>
          Project Title
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="e.g. AI Resume Scanner"
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            placeholder="Describe your project requirements..."
          />
        </label>

        <button className="btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}
