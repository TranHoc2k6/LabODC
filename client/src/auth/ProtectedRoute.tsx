import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children, allowedRoles }: any) {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("token");

  // ⏳ ĐỢI LOAD USER TỪ LOCALSTORAGE
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Đang tải dữ liệu...
      </div>
    );
  }

  // ❌ CHƯA ĐĂNG NHẬP
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ TOKEN CÓ NHƯNG USER LỖI
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 SAI QUYỀN
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ OK
  return children;
}
