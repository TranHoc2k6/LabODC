import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/admin.css";
import "../styles/payment.css";

export default function AdminPayments() {
  const [payments, setPayments] = useState<any[]>([]);

  /* ===== DASHBOARD CALC ===== */
  const totalRevenue = payments.reduce((s, p) => s + p.amount, 0);
  const paid = payments.filter(p => p.status === "paid");
  const pending = payments.filter(p => p.status === "pending");

  useEffect(() => {
    api.get("/payments/admin")
      .then(res => setPayments(res.data))
      .catch(err => console.error(err));
  }, []);

  /* ===== FUND SPLIT ===== */
  const calc = (amount: number) => ({
    talent: amount * 0.7,
    mentor: amount * 0.2,
    platform: amount * 0.1,
  });

  /* ===== EXPORT CSV ===== */
  const exportCSV = () => {
    const rows = [
      ["Project", "Amount", "Status"],
      ...payments.map(p => [p.project_title, p.amount, p.status])
    ];

    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "payments.csv";
    a.click();
  };

  return (
    <>
      <header className="header">
        <h1>💳 Admin – Payments</h1>
      </header>

      {/* ===== DASHBOARD ===== */}
      <div className="dashboard-grid">
        <div className="dash-card">
          <h4>Total Revenue</h4>
          <p>${totalRevenue}</p>
        </div>

        <div className="dash-card">
          <h4>Paid</h4>
          <p>{paid.length}</p>
        </div>

        <div className="dash-card">
          <h4>Pending</h4>
          <p>{pending.length}</p>
        </div>
      </div>

      {/* ===== EXPORT ===== */}
      <button className="btn-export" onClick={exportCSV}>
        ⬇ Export CSV
      </button>

      {/* ===== PAYMENTS ===== */}
      <div className="payments-grid">
        {payments.map((p) => {
          const fund = calc(p.amount);

          return (
            <div className="payment-card" key={p.id}>
              <h3>{p.project_title}</h3>

              <span className={`badge ${p.status}`}>
                {p.status.toUpperCase()}
              </span>

              <p className="payment-total">
                Total: <b>${p.amount}</b>
              </p>

              {/* PROGRESS BAR */}
              <div className="fund-bar">
                <div className="fund talent" style={{ width: "70%" }} />
                <div className="fund mentor" style={{ width: "20%" }} />
                <div className="fund platform" style={{ width: "10%" }} />
              </div>

              {/* BREAKDOWN */}
              <ul className="fund-list">
                <li>
                  <span className="dot talent" />
                  Talent (70%)
                  <b>${fund.talent.toFixed(2)}</b>
                </li>
                <li>
                  <span className="dot mentor" />
                  Mentor (20%)
                  <b>${fund.mentor.toFixed(2)}</b>
                </li>
                <li>
                  <span className="dot platform" />
                  Platform (10%)
                  <b>${fund.platform.toFixed(2)}</b>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
