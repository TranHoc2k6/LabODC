import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/login.css";

type JwtPayload = {
  role: "admin" | "enterprise" | "talent";
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await api.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const token = res.data.access_token;
      localStorage.setItem("token", token);

      const payload = jwtDecode<JwtPayload>(token);

      if (payload.role === "admin") navigate("/admin/projects");
      else if (payload.role === "enterprise") navigate("/enterprise");
      else if (payload.role === "talent") navigate("/talent");
      else alert("Unknown role");

    } catch (err) {
      alert("Login failed");
      console.error(err);
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

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
