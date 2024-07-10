import axios from "axios";

const API_URL = process.env.REACT_APP_LOCAL_URL;

export interface CredentialsSingIn {
  name: string;
  password: string;
  ubication: string;
  phone: string;
  email: string;
  imgUrl: string;
};

//interfaz para el login
interface SingInResponse {
  token: string;
}

const singInService = async (credentials: CredentialsSingIn): Promise<string> => {
  try {
    const response = await axios.post<SingInResponse>(`${API_URL}/user`, credentials);
    const { token } = response.data;;
    return token;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  };
};

export default singInService;
