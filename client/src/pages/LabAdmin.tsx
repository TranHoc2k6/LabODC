import { Outlet, Link } from "react-router-dom";

export default function LabAdmin() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">LabOdc Admin</h2>
        <nav className="space-y-3">
          <Link to="/admin" className="block">📊 Dashboard</Link>
          <Link to="/admin/projects" className="block">📁 Projects</Link>
          <Link to="/admin/payments" className="block">💰 Payments</Link>
          <Link to="/admin/users" className="block">👥 Users</Link>
          <Link to="/admin/system" className="block">⚙ System</Link>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
