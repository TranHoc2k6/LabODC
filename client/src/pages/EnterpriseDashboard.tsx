import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/enterprise.css";

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface Member {
  user_id: number;
  role: string;
  status: string;
}

export default function EnterpriseDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [openProject, setOpenProject] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/projects/my-projects")
      .then(res => setProjects(res.data || []))
      .catch(err => console.error(err));
  }, []);

  const openApplicants = (projectId: number) => {
    setOpenProject(projectId);
    api.get(`/projects/${projectId}/members`)
      .then(res => setMembers(res.data || []))
      .catch(err => console.error(err));
  };

  return (
    <div className="enterprise-layout">
      <h1 className="page-title">📁 My Projects</h1>
      
      <button
        className="btn-primary new-project-btn"
        onClick={() => navigate("/enterprise/projects/create")}
      >
        ➕ New Project
      </button>

      <div className="project-grid">
        {projects.map(p => (
          <div className="project-card" key={p.id}>
            <div className="card-header">
              <h3>{p.title}</h3>
              <span className={`badge ${p.status || "draft"}`}>
                {(p.status || "draft").toUpperCase()}
              </span>
            </div>

            <p className="desc">{p.description}</p>

            <div className="card-footer">
              <span>ID #{p.id}</span>
              <button className="btn-view" onClick={() => openApplicants(p.id)}>
                View Applicants
              </button>
            </div>
          </div>
        ))}
      </div>

      {openProject !== null && (
        <div className="modal-backdrop" onClick={() => setOpenProject(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>👥 Applicants</h2>

            <table className="member-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.user_id}>
                    <td>#{m.user_id}</td>
                    <td>
                      <span className={`role ${m.role}`}>
                        {m.role.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${m.status}`}>
                        {m.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="actions">
                      {m.status === "pending" && (
                        <>
                          <button className="btn-approve">Approve</button>
                          <button className="btn-reject">Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="btn-close" onClick={() => setOpenProject(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
