import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import loginService, { LoginResponse } from "../services/login/loginService";
import { ToastiSuccess } from "../components/toasti/ToastiSuccess";
import { ToastiError } from "../components/toasti/ToastiError";
import singInService, {
  CredentialsSingIn,
} from "../services/register/singInService";

interface AuthContextType {
  token: string | null;
  user_id: number;
  user_name: string | "";
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  singIn: (data: CredentialsSingIn) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("token") || null
  );
  const [user_id, setUser_id] = useState<number | 0>(
    Number(sessionStorage.getItem("user_id")) || 0
  );
  const [user_name, setUser_name] = useState<string | "">(
    sessionStorage.getItem("user_name") || ""
  );

  //iniciar sesion
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await loginService(credentials);
      setToken(response.token);
      setUser_id(response.user_id);
      setUser_name(response.user_name);
      sessionStorage.setItem("user_name", response.user_name);
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user_id", response.user_id.toString());
      ToastiSuccess("... ¡Su inicio de sesión ha sido EXITOSO! ✅");
    } catch (error) {
      ToastiError("... ¡No se pudo iniciar la sesión, intenta nuevamente! 😊");
      throw error;
    }
  };

  // cerrar la sesion
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_id");
    ToastiSuccess("... ¡Su cierre de sesión ha sido EXITOSO! ✅");
  };

  // Registrar el usuario
  const singIn = async (data: CredentialsSingIn) => {
    try {
      const token = await singInService(data);
      ToastiSuccess("... ¡Su registro ha sido EXITOSO! ✅");
      setToken(token);
      sessionStorage.setItem("token", token);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      ToastiError("Hubo un error al registrar. Por favor, inténtelo de nuevo. 😬");
    };
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, singIn, user_id, user_name }}>
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
