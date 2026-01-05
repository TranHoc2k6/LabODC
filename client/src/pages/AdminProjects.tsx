import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/projects/admin/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>LabODC</h2>
        <ul>
          <li className="active" onClick={() => navigate("/admin/projects")}>
            Projects
          </li>

          <li onClick={() => navigate("/admin/users")}>
            Users
          </li>

          <li onClick={() => navigate("/admin/payments")}>
            Payments
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main">
        <header className="header">
          <h1>Admin – Projects</h1>
        </header>

        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.project_id}>
              <h3>{p.title}</h3>

              <p>{p.description}</p>

              <span>
                Members: <b>{p.members?.length || 0}</b>
              </span>

              {/* BUTTON XEM CHI TIẾT */}
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

              {/* DANH SÁCH MEMBER */}
              {openProjectId === p.project_id && (
                <div className="member-box">
                  {(!p.members || p.members.length === 0) ? (
                    <p>No members yet</p>
                  ) : (
                    <ul>
                      {p.members.map((m: any) => (
                        <li key={m.user_id}>
                          👤 <b>User #{m.user_id}</b> — {m.role} — {m.status}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
