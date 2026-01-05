import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface Props {
  children: React.ReactNode;
  roles: string[];
}

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;

  try {
    const payload = jwtDecode<JwtPayload>(token);

    // ⛔ token hết hạn
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    // ⛔ sai role
    if (!roles.includes(payload.role)) {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
