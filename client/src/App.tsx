import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Talent from "./pages/Talent";
import EnterpriseDashboard from "./pages/EnterpriseDashboard";
import EnterprisePayments from "./pages/EnterprisePayments";
import ProtectedRoute from "./auth/ProtectedRoute";

import Admin from "./pages/Admin";
import AdminProjects from "./pages/AdminProjects";
import AdminUsers from "./pages/AdminUsers";
import AdminPayments from "./pages/AdminPayments";
import EnterpriseLayout from "./pages/EnterpriseLayout";
import EnterpriseCreateProject from "./pages/EnterpriseCreateProject";  

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route path="projects" element={<AdminProjects />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="payments" element={<AdminPayments />} />
      </Route>

      {/* ENTERPRISE */}
      <Route
        path="/enterprise"
        element={
          <ProtectedRoute roles={["enterprise"]}>
            <EnterpriseLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<EnterpriseDashboard />} />
        <Route path="payments" element={<EnterprisePayments />} />
        <Route
              path="/enterprise/projects/create"
              element={<EnterpriseCreateProject />}
/>

      </Route>


      {/* TALENT */}
      <Route
        path="/talent"
        element={
          <ProtectedRoute roles={["talent"]}>
            <Talent />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
