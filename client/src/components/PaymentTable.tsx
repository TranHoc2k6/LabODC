
interface Payment {
  id: number;
  project_id: number;
  amount: number;
  team_amount: number;
  mentor_amount: number;
  lab_amount: number;
  status: string;
}

interface PaymentTableProps {
  payments: Payment[];
}

export default function PaymentTable({ payments }: PaymentTableProps) {
  return (
    <table className="payment-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Project</th>
          <th>Total</th>
          <th>Team (70%)</th>
          <th>Mentor (20%)</th>
          <th>Lab (10%)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>#{payment.project_id}</td>
            <td>${payment.amount}</td>
            <td>${payment.team_amount}</td>
            <td>${payment.mentor_amount}</td>
            <td>${payment.lab_amount}</td>
            <td>{payment.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
