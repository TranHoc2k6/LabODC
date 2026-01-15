import { useState } from "react";
import { createProject } from "../../api/enterprise";
import "../../styles/enterprise.css";

export default function EnterpriseCreateProject() {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await createProject({
      title,
      skills,
      description,
      budget: Number(budget),
    });

    alert("Project submitted to Lab for approval!");
    setTitle("");
    setSkills("");
    setBudget("");
    setDescription("");
  };

  return (
    <>
      <h1 className="page-title">Create New Project</h1>

      <div className="table-container">
        <input
          className="input"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input"
          placeholder="Required skills (React, Node, AI...)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <input
          className="input"
          placeholder="Budget ($)"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <textarea
          className="input"
          placeholder="Project description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn" onClick={handleSubmit}>
          Submit to Lab
        </button>
      </div>
    </>
  );
}
