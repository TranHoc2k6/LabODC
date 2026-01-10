import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/admin.css";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);

  useEffect(() => {
    api.get("/projects/admin/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const getStatus = (p: any) => {
    // ưu tiên backend trả
    if (p.status) return p.status;

    // fallback nếu chưa có
    if (!p.members || p.members.length === 0) return "DRAFT";
    return "RUNNING";
  };
  

  return (
    <>
      <header className="header">
        <h1>📁 Admin – Projects</h1>
      </header>

      <div className="projects-grid">
        {projects.map((p) => {
          const status = getStatus(p).toLowerCase();

          return (
            <div className="project-card" key={p.project_id}>
              {/* PROJECT STATUS */}
              <span className={`badge project-status ${status}`}>
                {status.toUpperCase()}
              </span>

              <h3>{p.title}</h3>
              <p className="project-desc">{p.description}</p>

              <span className="project-meta">
                Members: <b>{p.members?.length || 0}</b>
              </span>

              <button
                className="btn-view"
                onClick={() =>
                  setOpenProjectId(
                    openProjectId === p.project_id ? null : p.project_id
                  )
                }
              >
                {openProjectId === p.project_id
                  ? "Hide Members"
                  : "View Members"}
              </button>

              {/* MEMBERS */}
              {openProjectId === p.project_id && (
                <div className="member-box">
                  {(!p.members || p.members.length === 0) ? (
                    <p className="empty">No members yet</p>
                  ) : (
                    <ul>
                      {p.members.map((m: any) => (
                        <li key={m.user_id} className="member-item">
                          <div>
                            👤 <b>User #{m.user_id}</b>
                          </div>

                          <div className="member-badges">
                            <span className={`badge role ${m.role.toLowerCase()}`}>
                              {m.role}
                            </span>

                            <span className={`badge status ${m.status.toLowerCase()}`}>
                              {m.status}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
