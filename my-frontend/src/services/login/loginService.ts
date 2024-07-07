import axios from "axios";

const API_URL = "http://localhost:3002";

interface Credentials {
  email: string;
  password: string;
}

//interfaz para el login
interface LoginResponse {
  token: string;
}

const loginService = async (credentials: Credentials): Promise<string> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/user/loginUser`, credentials);
    const { token } = response.data;

    //guardo el token en sessionStorage
    sessionStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export default loginService;
