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
      <h1 className="page-title">LabODC – Admin Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <div className="value">{users.length}</div>
        </div>

        <div className="dashboard-card">
          <h3>Pending Projects</h3>
          <div className="value">{projects.length}</div>
        </div>

        <div className="dashboard-card money">
          <h3>Total Revenue</h3>
          <div className="value">${totalRevenue}</div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;