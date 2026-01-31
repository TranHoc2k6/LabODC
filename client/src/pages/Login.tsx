import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("talent");
  const [error, setError] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // LOGIN
        await login(email, password);

        const u = JSON.parse(localStorage.getItem("user")!);

        if (u.role === "admin") navigate("/admin/dashboard");
        else if (u.role === "enterprise") navigate("/enterprise/dashboard");
        else if (u.role === "mentor") navigate("/mentor/dashboard");
        else navigate("/talent/dashboard");

      } else {
        // REGISTER
        await register({
          email,
          password,
          full_name: fullName,
          role,
        });

        alert("Đăng ký thành công! Vui lòng đăng nhập");
        setIsLogin(true);
        setPassword("");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.msg ||
        "Authentication failed";

      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    }
  };

  return (
    <div className="login-container">
      <h1>LabODC</h1>

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
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

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
