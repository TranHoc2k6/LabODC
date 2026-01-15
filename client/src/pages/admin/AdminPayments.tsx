import { useEffect, useState } from "react";
import { getAllPayments } from "../../api/admin";

const AdminPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    getAllPayments().then(setPayments);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin – Payments</h1>

      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Project</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-3">{p.project?.title}</td>
              <td className="p-3">${p.amount}</td>
              <td className="p-3">{p.status}</td>
              <td className="p-3">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
