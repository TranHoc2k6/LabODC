import { useEffect, useState } from "react";
import { getAllPayments } from "../../api/admin";
import api from "../../api/axios";

const AdminPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [projectMap, setProjectMap] = useState<Record<number, string>>({});

  useEffect(() => {
    getAllPayments().then(setPayments);

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
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: 20 }}>
                  No payments found
                </td>
              </tr>
            )}

            {payments.map((p) => (
              <tr key={p.id}>
                <td>
                  {projectMap[p.project_id] || `Project #${p.project_id}`}
                </td>

                <td>${p.amount.toLocaleString()}</td>

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
