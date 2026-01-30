import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/enterprise.css";

/* ================= API ================= */

const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

const getPayments = async () => {
  const res = await api.get("/enterprise/payments");
  return res.data;
};

const createPayment = async (data: {
  project_id: number;
  amount: number;
  payment_method: string;
}) => {
  const res = await api.post("/payments", data);
  return res.data;
};

/* ================= COMPONENT ================= */

export default function EnterprisePayments() {
  const [projects, setProjects] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    project_id: "",
    amount: "",
    payment_method: "BANK_TRANSFER",
  });

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [projectsData, paymentsData] = await Promise.all([
      getProjects(),
      getPayments(),
    ]);
    setProjects(projectsData);
    setPayments(paymentsData);
  };

  /* ===== CREATE PAYMENT ===== */
  const submitPayment = async () => {
    if (!form.project_id || !form.amount) {
      alert("Please select project and amount");
      return;
    }

    try {
      setLoading(true);
      await createPayment({
        project_id: Number(form.project_id),
        amount: Number(form.amount),
        payment_method: form.payment_method,
      });

      alert("Payment created successfully");
      setForm({ project_id: "", amount: "", payment_method: "BANK_TRANSFER" });
      loadData();
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Create payment failed");
    } finally {
      setLoading(false);
    }
  };

  /* ===== FORMAT TALENTS DISPLAY ===== */
  const formatTalentsDisplay = (talents: any[]) => {
    const count = talents?.length || 0;
    if (count === 0) {
      return "No talents";
    }
    return count === 1 ? "1 Talent" : `${count} Talents`;
  };

  return (
    <>
      <h1 className="page-title">Payments</h1>

      {/* ========== CREATE PAYMENT FORM ========== */}
      <div className="stat-card create-payment-card" style={{ marginBottom: 40 }}>
        <h3 className="create-title">Create Payment</h3>

        <div className="create-payment-grid">
          <select
            className="input"
            value={form.project_id}
            onChange={(e) =>
              setForm({ ...form, project_id: e.target.value })
            }
          >
            <option value="">-- Select Project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="number"
            placeholder="Amount ($)"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <select
            className="input"
            value={form.payment_method}
            onChange={(e) =>
              setForm({ ...form, payment_method: e.target.value })
            }
          >
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="CASH">Cash</option>
            <option value="CRYPTO">Crypto</option>
          </select>

          <button
            className="create-payment-btn"
            onClick={submitPayment}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Payment"}
          </button>
        </div>
      </div>

      {/* ========== PAYMENT LIST ========== */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Talents</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No payments yet
                </td>
              </tr>
            )}

            {payments.map((p) => (
              <tr key={p.paymentId}>
                <td>{p.projectTitle}</td>
                <td>${p.amount?.toLocaleString()}</td>
                <td>
                  <span className={`status-badge status-${p.status?.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  {formatTalentsDisplay(p.talents)}
                  {/* Optional: Show talent details on hover or in a modal */}
                  {p.talents?.length > 0 && (
                    <div className="talent-tooltip">
                      {p.talents.map((t: any) => (
                        <div key={t.talentId} className="talent-item">
                          Talent #{t.talentId} – ${t.amount}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}