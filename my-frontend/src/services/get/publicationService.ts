
import axios from "axios";

const API_URL = process.env.REACT_APP_LOCAL_URL;

// Obtener la cantidad de usuarios registrados, devuelve un numero entero
export const getPublicationCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/publications/publicationCount`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    throw error;
  };
};

// Obtener todas las publicaciones en ddbb
export const getPublications = async () => {
  try {
    const response = await axios.get(`${API_URL}/publications`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las publicaciones:", error);
    throw error;
  };
};