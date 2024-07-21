import axios from "axios";
import { PublicationUpdate } from "../../context/PublicationsContext";

const API_URL = process.env.REACT_APP_LOCAL_URL;

export const publicationUpdateService = async (
  publicationUpdate: PublicationUpdate,
  token: string,
  pet_id: number,
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${API_URL}/publications/${pet_id}`,
      publicationUpdate,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    // Verifica si el código de estado es 201
    if (response.status === 200) {
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
