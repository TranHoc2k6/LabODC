import { useEffect, useState } from "react";
import { getEnterprisePayments } from "../../api/enterprise";
import "../../styles/enterprise.css";

export default function EnterprisePayments() {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    getEnterprisePayments().then(setPayments);
  }, []);

  return (
    <>
      <h1 className="page-title">Payments</h1>

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
            {payments.map((p) => (
              <tr key={p.paymentId}>
                <td>{p.projectTitle}</td>
                <td>${p.amount.toLocaleString()}</td>
                <td>{p.status}</td>
                <td>
                  {p.talents.map((t: any) => (
                    <div key={t.talentId}>
                      Talent #{t.talentId} – ${t.amount} ({t.status})
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
