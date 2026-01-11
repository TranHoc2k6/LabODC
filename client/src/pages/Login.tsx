import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import  {jwtDecode} from "jwt-decode";
import "../styles/login.css";

type JwtPayload = {
  role: "admin" | "enterprise" | "talent";
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email và mật khẩu không được để trống!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // === Gửi form-urlencoded đúng chuẩn FastAPI ===
      const formData = new URLSearchParams({ username: email, password });
      console.log("Sending form data:", formData.toString()); // DEBUG

      const res = await api.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const token = res.data.access_token;
      localStorage.setItem("token", token);

      const payload = jwtDecode<JwtPayload>(token);

      if (payload.role === "admin") navigate("/admin/projects");
      else if (payload.role === "enterprise") navigate("/enterprise");
      else if (payload.role === "talent") navigate("/talent");
      else setError("Role không xác định");

    } catch (err: any) {
      console.error("Login error:", err.response?.data || err);
      const message = err.response?.data?.detail?.[0]?.msg || err.message || "Login failed";
      setError("Đăng nhập thất bại: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>LabODC</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
