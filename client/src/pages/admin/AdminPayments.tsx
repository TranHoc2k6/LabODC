import { useEffect, useState } from "react";
import { getAllPayments } from "../../api/admin";
import api from "../../api/axios";

const AdminPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [projectMap, setProjectMap] = useState<Record<number, string>>({});

  useEffect(() => {
    // payments
    getAllPayments().then(setPayments);

    // fallback project list (KHÔNG XOÁ)
    api.get("/projects/").then((res) => {
      const map: Record<number, string> = {};
      res.data.forEach((p: any) => {
        map[p.id] = p.title;
      });
      setProjectMap(map);
    });
  }, []);

  return (
    <div className="admin-content">
      <h1 className="page-title">Admin – Payments</h1>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Total</th>
              <th>70% Team</th>
              <th>20% Mentor</th>
              <th>10% Lab</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 20 }}>
                  No payments found
                </td>
              </tr>
            )}

            {payments.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.project?.title ||
                    projectMap[p.project_id] ||
                    `Project #${p.project_id}`}
                </td>

                <td>${p.amount.toLocaleString()}</td>

                <td style={{ color: "#16a34a", fontWeight: 500 }}>
                  ${p.team_amount?.toLocaleString()}
                </td>

                <td style={{ color: "#2563eb", fontWeight: 500 }}>
                  ${p.mentor_amount?.toLocaleString()}
                </td>

                <td style={{ color: "#7c3aed", fontWeight: 500 }}>
                  ${p.lab_amount?.toLocaleString()}
                </td>

                <td>
                  <span className="role">{p.status}</span>
                </td>

                <td>
                  {p.created_at
                    ? new Date(p.created_at).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
