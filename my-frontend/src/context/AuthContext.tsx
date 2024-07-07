// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login/loginService";
import { ToastiSuccess } from "../components/toasti/ToastiSuccess";
import { ToastiError } from "../components/toasti/ToastiError";

interface AuthContextType {
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("token") || null
  );
  // const navigate = useNavigate();

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const token = await loginService(credentials);
      setToken(token);
      sessionStorage.setItem("token", token);
      ToastiSuccess("... ¡Su inicio de sesión ha sido EXITOSO! ✅");
    } catch (error) {
      ToastiError("... ¡No se pudo iniciar la sesión, intenta nuevamente! 😊")
      throw error;
    }
  };

  // cerrar la sesion 
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    ToastiSuccess("... ¡Su cierre de sesión ha sido EXITOSO! ✅")
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login: handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
