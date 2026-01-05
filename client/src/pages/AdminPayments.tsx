import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/payment.css";

type Payment = {
  id: number;
  project_id: number;
  total_amount: number;
  team_amount: number;
  mentor_amount: number;
  lab_amount: number;
  status: string;
};

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    api.get("/payments/admin")
      .then(res => setPayments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="payment-container">
      <h1>💰 Admin – Payment Management</h1>

      <table className="payment-table">
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Total</th>
            <th>Talent (70%)</th>
            <th>Mentor (20%)</th>
            <th>LabODC (10%)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>#{p.project_id}</td>

              <td>{p.total_amount.toLocaleString()} đ</td>
              <td>{p.team_amount.toLocaleString()} đ</td>
              <td>{p.mentor_amount.toLocaleString()} đ</td>
              <td>{p.lab_amount.toLocaleString()} đ</td>

              <td>
                <span className={`status ${p.status}`}>
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
