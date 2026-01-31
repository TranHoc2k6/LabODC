import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../api/auth";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    full_name: string;
    role: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // load lại session
  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");

    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u));
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    const res = await authAPI.login({ email, password });
    const { access_token } = res.data;

    const decoded: any = jwtDecode(access_token);

    const userData: User = {
      id: decoded.id,
      email: decoded.sub,
      full_name: decoded.full_name,
      role: decoded.role,
    };

    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(access_token);
    setUser(userData);
  };

  // REGISTER (❗ KHÔNG auto login)
  const register = async (data: {
    email: string;
    password: string;
    full_name: string;
    role: string;
  }) => {
    await authAPI.register(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
