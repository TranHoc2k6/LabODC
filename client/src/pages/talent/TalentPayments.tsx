import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function TalentPayments() {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    api.get("/talent/payments")
      .then(res => setPayments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>💳 Payments</h2>

      <table className="payment-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.projectTitle}</td>
              <td>{p.amount}</td>
              <td>{p.date}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
