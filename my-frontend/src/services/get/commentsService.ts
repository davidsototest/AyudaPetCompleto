import axios from "axios";

const API_URL = process.env.REACT_APP_LOCAL_URL;

// Obtener todos los comentarios de una publicacion
//deben enviar el ID
export const getComments = async (publicationId: number) => {
    try {
      const response = await axios.get(`${API_URL}/publications/comments/${publicationId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener todas las publicaciones:", error);
      throw error;
    };
  };