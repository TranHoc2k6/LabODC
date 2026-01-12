import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Fund {
  project: string;
  amount: number;
  paid: number;
  pending: number;
}

export default function TalentPayments() {
  const [funds, setFunds] = useState<Fund[]>([]);

  useEffect(() => {
    api.get("/talent/funds")
      .then(res => setFunds(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>💰 My Fund (70%)</h2>

      <table className="payment-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Total Share</th>
            <th>Paid</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((f, idx) => (
            <tr key={idx}>
              <td>{f.project}</td>
              <td>${f.amount}</td>
              <td>${f.paid}</td>
              <td>${f.pending}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: 10, opacity: 0.7 }}>
        Funds are distributed by LabODC according to the 70/20/10 rule.
      </p>
    </>
  );
}
