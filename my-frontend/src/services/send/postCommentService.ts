import axios from "axios";
import { SendComment } from "../../context/PublicationsContext";

const API_URL = process.env.REACT_APP_LOCAL_URL;

// guardar un coemntario en una publicacion
//deben enviar el ID y los datos a enviar en el body
export const sendComments = async (
  publicationId: number,
  data: SendComment,
  token: string,
): Promise<boolean> => {
  console.log("id: " + publicationId, "data: " + data, "token: " + token);
  try {
    const response = await axios.post(
      `${API_URL}/publications/comments/${publicationId}`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    // Verifica si el código de estado es 201
    if (response.status === 201) {
      return true;
    } else {
      console.error(`Unexpected status code: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error al obtener todas las publicaciones:", error);
    throw error;
  }
};
