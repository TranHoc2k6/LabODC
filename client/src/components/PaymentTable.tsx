export interface Payment {
  id: number;              // payment_id (PK)
  project_id: number;      // FK -> projects.id
  amount: number;          // total payment amount
  team_amount: number;     // 70% for team
  mentor_amount: number;   // 20% for mentor
  lab_amount: number;      // 10% for LabODC
  status: string;          // pending | completed | failed
}

interface PaymentTableProps {
  payments: Payment[];
}

export default function PaymentTable({ payments }: PaymentTableProps) {
  return (
    <div className="table-container">
      <table className="payment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Total Amount</th>
            <th>Team (70%)</th>
            <th>Mentor (20%)</th>
            <th>Lab (10%)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No payments found
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>#{payment.project_id}</td>
                <td>${payment.amount.toLocaleString()}</td>
                <td>${payment.team_amount.toLocaleString()}</td>
                <td>${payment.mentor_amount.toLocaleString()}</td>
                <td>${payment.lab_amount.toLocaleString()}</td>
                <td>{payment.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
