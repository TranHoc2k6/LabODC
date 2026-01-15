import { useEffect, useState } from "react";
import { getAllUsers, getAllPayments, getPendingProjects } from "../../api/admin";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
    getPendingProjects().then(setProjects);
    getAllPayments().then(setPayments);
  }, []);

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">LabODC – Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Users</h3>
          <p className="text-3xl font-bold text-blue-600">{users.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Pending Projects</h3>
          <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-3xl font-bold text-blue-600">${totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
