// petService.ts
import axios from "axios";

const API_URL = process.env.REACT_APP_LOCAL_URL;

// Obtener la cantidad de usuarios registrados, devuelve un numero entero
export const getPetCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/userCount`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    throw error;
  };
};