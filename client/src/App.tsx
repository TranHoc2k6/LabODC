import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminProjects from "./pages/AdminProjects";
import Talent from "./pages/Talent";
import EnterpriseDashboard from "./pages/EnterpriseDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminPayments from "./pages/AdminPayments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* ADMIN */}
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminProjects />
          </ProtectedRoute>
        }
      />

      {/* ENTERPRISE */}
      <Route
        path="/enterprise"
        element={
          <ProtectedRoute roles={["enterprise"]}>
            <EnterpriseDashboard />
          </ProtectedRoute>
        }
      />

      {/* TALENT */}
      <Route
        path="/talent"
        element={
          <ProtectedRoute roles={["talent"]}>
            <Talent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/payments"
        element={
        <ProtectedRoute roles={["admin"]}>
            <AdminPayments />
        </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;
