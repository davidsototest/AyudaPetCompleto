import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import loginService from "../services/login/loginService";
import { ToastiSuccess } from "../components/toasti/ToastiSuccess";
import { ToastiError } from "../components/toasti/ToastiError";
import singInService, {
  CredentialsSingIn,
} from "../services/register/singInService";

interface AuthContextType {
  token: string | null;
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

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const token = await loginService(credentials);
      setToken(token);
      sessionStorage.setItem("token", token);
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
    <AuthContext.Provider value={{ token, login, logout, singIn }}>
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
