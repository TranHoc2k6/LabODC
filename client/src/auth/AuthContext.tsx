import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  id: number;
  role: "admin" | "enterprise" | "student";
};

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string) => {
    const payload = jwtDecode<JwtPayload>(token);

    setUser({
      id: Number(payload.sub),
      role: payload.role as any,
    });

    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) login(stored);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
