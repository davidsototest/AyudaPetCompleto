import axios from "axios";

const API_URL = process.env.REACT_APP_LOCAL_URL;

// Obtener la cantidad de usuarios registrados, devuelve un numero entero
export const getPublicationCount = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/publications/publicationCount`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    throw error;
  }
};

// Obtener todas las publicaciones en ddbb
export const getPublications = async () => {
  try {
    const response = await axios.get(`${API_URL}/publications`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las publicaciones:", error);
    throw error;
  }
};

// Obtener todas las publicaciones de UN USUARIO en ddbb
export const getPublicationsUserId = async (user_id: number, token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/publications/user`,
      { user_id: user_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las publicaciones del user: ", error);
    throw error;
  }
};
