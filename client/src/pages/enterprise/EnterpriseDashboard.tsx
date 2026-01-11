import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/enterprise.css";

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

  const loadProjects = () => {
    api.get("/projects/my-projects")
      .then(res => setProjects(res.data || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openApplicants = (projectId: number) => {
    setOpenProject(projectId);
    api.get(`/projects/${projectId}/members`)
      .then(res => setMembers(res.data || []))
      .catch(err => console.error(err));
  };

  // ===== PROJECT ACTIONS =====
  const submitProject = async (id: number) => {
    await api.post(`/projects/${id}/submit`);
    loadProjects();
  };

  const cancelProject = async (id: number) => {
    await api.post(`/projects/${id}/cancel`);
    loadProjects();
  };

  const requestChange = async (id: number) => {
    await api.post(`/projects/${id}/change`);
    loadProjects();
  };

  return (
    <div className="enterprise-layout">
      <div className="page-header">
        <h1 className="page-title">📁 My Projects</h1>

        <button
          className="btn-new-project"
          onClick={() => navigate("/enterprise/projects/create")}
        >
          ➕ New Project
        </button>
      </div>

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

              <div className="card-actions">
                <button className="btn-view" onClick={() => openApplicants(p.id)}>
                  View Applicants
                </button>

                {p.status === "draft" && (
                  <button className="btn-submit" onClick={() => submitProject(p.id)}>
                    Submit
                  </button>
                )}

                {p.status === "approved" && (
                  <button className="btn-pay">
                    Proceed to Payment
                  </button>
                )}

                {["draft", "submitted"].includes(p.status) && (
                  <button className="btn-cancel" onClick={() => cancelProject(p.id)}>
                    Cancel
                  </button>
                )}

                {p.status === "active" && (
                  <button className="btn-change" onClick={() => requestChange(p.id)}>
                    Request Change
                  </button>
                )}
              </div>
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
