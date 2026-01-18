import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/login.css";
import "../styles/theme.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("talent"); // chỉ dùng khi register
  const [error, setError] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register({ email, password, role });
      }

      // 🔥 lấy user từ localStorage (AuthContext đã lưu sẵn)
      const u = JSON.parse(localStorage.getItem("user")!);

      if (u.role === "admin") {
        navigate("/admin/dashboard");
      } else if (u.role === "enterprise") {
        navigate("/enterprise/dashboard");
      } else if (u.role === "mentor") {
        navigate("/mentor/dashboard");
      } else {
        navigate("/talent/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Authentication failed");
      console.error("Auth error:", err);
    }
  };

  return (
    <div className="login-container">
      <h1>{isLogin ? "LabODC" : "LabODC"}</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isLogin && (
          <>
           

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="talent">Talent</option>
              <option value="mentor">Mentor</option>
              <option value="enterprise">Enterprise</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <p className="toggle-auth">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
}
