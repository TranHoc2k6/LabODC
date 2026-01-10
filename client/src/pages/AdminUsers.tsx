import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/admin.css";

const roleColors: Record<string, string> = {
  admin: "role-admin",
  mentor: "role-mentor",
  talent: "role-talent",
  enterprise: "role-enterprise",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = () => {
    api.get("/users/admin")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (userId: number, newRole: string) => {
    try {
      setLoading(true);
      await api.patch(`/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Change role failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <h1>👤 Admin – Users</h1>
      </header>

      <div className="users-grid">
        {users.map(u => (
          <div className="user-card" key={u.id}>
            <div className="user-top">
              <div className="avatar">
                {u.email.charAt(0).toUpperCase()}
              </div>

              <div className="user-info">
                <h3>{u.full_name || "No name"}</h3>
                <p>{u.email}</p>
              </div>
            </div>

            <div className="user-meta">
              <span className={`role-badge ${roleColors[u.role]}`}>
                {u.role.toUpperCase()}
              </span>
            </div>

            <select
              className="role-select"
              value={u.role}
              disabled={loading}
              onChange={(e) => changeRole(u.id, e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="mentor">Mentor</option>
              <option value="talent">Talent</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        ))}
      </div>
    </>
  );
}
