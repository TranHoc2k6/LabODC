import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

/* ========== ADMIN ========== */
import Admin from "./pages/admin/Admin";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPayments from "./pages/admin/AdminPayments";

/* ========== ENTERPRISE ========== */
import EnterpriseLayout from "./pages/enterprise/EnterpriseLayout";
import EnterpriseDashboard from "./pages/enterprise/EnterpriseDashboard";
import EnterprisePayments from "./pages/enterprise/EnterprisePayments";
import EnterpriseCreateProject from "./pages/enterprise/EnterpriseCreateProject";

/* ========== TALENT ========== */
import TalentLayout from "./pages/talent/TalentLayout";   // 🔥 THIẾU DÒNG NÀY
import TalentDashboard from "./pages/talent/TalentDashboard";
import TalentProjects from "./pages/talent/TalentProjects";
import TalentPayments from "./pages/talent/TalentPayments";
import TalentProfile from "./pages/talent/TalentProfile";

function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminProjects />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="payments" element={<AdminPayments />} />
      </Route>

      {/* ================= ENTERPRISE ================= */}
      <Route
        path="/enterprise"
        element={
          <ProtectedRoute roles={["enterprise"]}>
            <EnterpriseLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EnterpriseDashboard />} />
        <Route path="dashboard" element={<EnterpriseDashboard />} />
        <Route path="payments" element={<EnterprisePayments />} />
        <Route path="projects/create" element={<EnterpriseCreateProject />} />
      </Route>

      {/* ================= TALENT ================= */}
      <Route
        path="/talent"
        element={
          <ProtectedRoute roles={["talent"]}>
            <TalentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TalentDashboard />} />
        <Route path="projects" element={<TalentProjects />} />
        <Route path="payments" element={<TalentPayments />} />
        <Route path="profile" element={<TalentProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
