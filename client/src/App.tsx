import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

import Login from './pages/Login';

// ===== ADMIN =====
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPayments from './pages/admin/AdminPayments';

// ===== ENTERPRISE =====
import EnterpriseDashboard from './pages/enterprise/EnterpriseDashboard';
import EnterpriseCreateProject from './pages/enterprise/EnterpriseCreateProject';
import EnterprisePayments from './pages/enterprise/EnterprisePayments';

// ===== TALENT =====
import TalentDashboard from './pages/talent/TalentDashboard';
import TalentProjects from './pages/talent/TalentProjects';
import TalentProfile from './pages/talent/TalentProfile';

// ===== MENTOR =====
import MentorDashboard from './pages/mentor/MentorDashboard';
import MentorProjects from './pages/mentor/MentorProjects';
import MentorReports from './pages/mentor/MentorReports';

import PageTemplate from "./components/PageTemplate";

/* =========================
   Role Redirect Handler
========================= */
function RoleRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.role === "lab_admin") return <Navigate to="/admin/dashboard" />;
  if (user.role === "enterprise") return <Navigate to="/enterprise/dashboard" />;
  if (user.role === "mentor") return <Navigate to="/mentor/dashboard" />;
  return <Navigate to="/talent/dashboard" />;
}

/* =========================
   Routes
========================= */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ==== ALL LOGGED IN USERS ==== */}
      <Route element={<PageTemplate />}>

        {/* ===== ADMIN ===== */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['lab_admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute allowedRoles={['lab_admin']}>
              <AdminProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['lab_admin']}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute allowedRoles={['lab_admin']}>
              <AdminPayments />
            </ProtectedRoute>
          }
        />

        {/* ===== ENTERPRISE ===== */}
        <Route
          path="/enterprise/dashboard"
          element={
            <ProtectedRoute allowedRoles={['enterprise']}>
              <EnterpriseDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/enterprise/create-project"
          element={
            <ProtectedRoute allowedRoles={['enterprise']}>
              <EnterpriseCreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/enterprise/payments"
          element={
            <ProtectedRoute allowedRoles={['enterprise']}>
              <EnterprisePayments />
            </ProtectedRoute>
          }
        />

        {/* ===== TALENT ===== */}
        <Route
          path="/talent/dashboard"
          element={
            <ProtectedRoute allowedRoles={['talent']}>
              <TalentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/talent/projects"
          element={
            <ProtectedRoute allowedRoles={['talent']}>
              <TalentProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/talent/profile"
          element={
            <ProtectedRoute allowedRoles={['talent']}>
              <TalentProfile />
            </ProtectedRoute>
          }
        />

        {/* ===== MENTOR ===== */}
        <Route
          path="/mentor/dashboard"
          element={
            <ProtectedRoute allowedRoles={['mentor']}>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor/projects"
          element={
            <ProtectedRoute allowedRoles={['mentor']}>
              <MentorProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor/reports"
          element={
            <ProtectedRoute allowedRoles={['mentor']}>
              <MentorReports />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}

/* =========================
   Root App
========================= */
export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
