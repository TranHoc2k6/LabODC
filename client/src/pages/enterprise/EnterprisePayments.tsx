import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/payment.css";

interface Payment {
  id: number;
  project_id: number;
  project_title?: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface Project {
  id: number;
  title: string; // 🔥 backend dùng "title"
}

export default function EnterprisePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    project_id: "",
    amount: "",
  });

  useEffect(() => {
    fetchPayments();
    fetchProjects();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/payments/enterprise");
      setPayments(res.data || []);
    } catch {
      setError("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects/my-projects");

      // hỗ trợ cả 2 kiểu: {data:[...]} hoặc [...]
      const list = Array.isArray(res.data) ? res.data : res.data.data;

      console.log("Parsed projects:", list);
      setProjects(list || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  };

  const handleCreatePayment = async () => {
    if (!formData.project_id || !formData.amount) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await api.post("/payments/", {
        project_id: Number(formData.project_id),
        total_amount: Number(formData.amount),
      });

      setSuccess("Payment created successfully!");
      setShowCreateModal(false);
      setFormData({ project_id: "", amount: "" });
      fetchPayments();
    } catch (err: any) {
      const details = err.response?.data?.detail;
      if (Array.isArray(details)) {
        setError(details.map((e: any) => e.msg).join(", "));
      } else {
        setError("Failed to create payment");
      }
    }
  };

  const totalPaid = payments
    .filter((p) => p.status === "approved" || p.status === "paid")
    .reduce((s, p) => s + p.total_amount, 0);

  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const approvedCount = payments.filter(
    (p) => p.status === "approved" || p.status === "paid"
  ).length;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="enterprise-layout">
        <div className="loading-spinner">Loading payments...</div>
      </div>
    );
  }

  return (
    <div className="enterprise-layout">
      <header className="ent-header">
        <div>
          <h1>💳 Payments & Invoices</h1>
          <p>Track your project payments</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create Payment
        </button>
      </header>

      {error && (
        <div className="alert alert-error">
          <span>⚠️ {error}</span>
          <button onClick={() => setError("")}>✕</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>✓ {success}</span>
          <button onClick={() => setSuccess("")}>✕</button>
        </div>
      )}

      <div className="ent-stats">
        <Stat title="Total Paid" value={formatCurrency(totalPaid)} />
        <Stat title="Approved" value={approvedCount} />
        <Stat title="Pending" value={pendingCount} />
      </div>

      <div className="payment-table">
        <div className="table-head">
          <span>Project</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
        </div>

        {payments.length === 0 ? (
          <div className="table-empty">
            <p>No payments yet</p>
          </div>
        ) : (
          payments.map((p) => (
            <div className="table-row" key={p.id}>
              <strong>{p.project_title || `Project #${p.project_id}`}</strong>
              <span>{formatCurrency(p.total_amount)}</span>
              <span className={`badge status-${p.status}`}>
                {p.status.toUpperCase()}
              </span>
              <span>{formatDate(p.created_at)}</span>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create Payment</h2>

            <div className="form-group-modal">
              <label>Select Project ({projects.length} available)</label>
              <select
                className="form-select"
                value={formData.project_id}
                onChange={(e) =>
                  setFormData({ ...formData, project_id: e.target.value })
                }
              >
                <option value="">-- Choose a project --</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group-modal">
              <label>Amount ($)</label>
              <input
                className="form-input"
                type="number"
                placeholder="Enter amount (e.g., 5000)"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
              <button className="btn-create" onClick={handleCreatePayment}>
                Create Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Stat = ({ title, value }: { title: string; value: string | number }) => (
  <div className="ent-stat-card">
    <p>{title}</p>
    <h3>{value}</h3>
  </div>
);
