// petService.ts
import axios from "axios";

const API_URL = "http://localhost:3002";

// Obtener la cantidad de usuarios registrados, devuelve un numero entero
export const getPetCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/userCount`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    throw error;
  };
};