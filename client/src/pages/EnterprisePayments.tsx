import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/enterprise.css";

export default function EnterprisePayments() {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
  api.get("/payments/enterprise")
    .then(res => setPayments(res.data || []))
    .catch(err => console.error(err));
}, []);



  const totalPaid = payments
    .filter(p => p.status === "paid")
    .reduce((s, p) => s + p.amount, 0);

  const pending = payments.filter(p => p.status === "pending");

  return (
    <div className="enterprise-layout">
      {/* HEADER */}
      <header className="ent-header">
        <div>
          <h1>💳 Payments & Invoices</h1>
          <p>Track your project payments</p>
        </div>
      </header>

      {/* STATS */}
      <div className="ent-stats">
        <Stat title="Total Paid" value={`$${totalPaid}`} />
        <Stat title="Invoices" value={payments.length} />
        <Stat title="Pending" value={pending.length} />
      </div>

      {/* TABLE */}
      <div className="payment-table">
        <div className="table-head">
          <span>Project</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Invoice</span>
        </div>

        {payments.map((p) => (
          <div className="table-row" key={p.id}>
            <span>{p.project_title}</span>
            <span>${p.amount}</span>

            <span className={`badge status ${p.status}`}>
              {p.status.toUpperCase()}
            </span>

            <button className="btn-outline">
              ⬇ Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const Stat = ({ title, value }: any) => (
  <div className="ent-stat-card">
    <p>{title}</p>
    <h3>{value}</h3>
  </div>
);
