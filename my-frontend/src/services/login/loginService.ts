import axios from "axios";

const API_URL = process.env.REACT_APP_LOCAL_URL;

interface Credentials {
  email: string;
  password: string;
}

//interfaz para el login
export interface LoginResponse { 
  auth: boolean;
  token: string;
  user_id: number;
  user_name: string;
}

const loginService = async (credentials: Credentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/user/loginUser`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export default loginService;
