import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ToastiSuccess } from "../components/toasti/ToastiSuccess";
import { ToastiError } from "../components/toasti/ToastiError";
import { getPublications, getPublicationsUserId } from "../services/get/publicationService";
import { getComments } from "../services/get/commentsService";
import { sendComments } from "../services/send/postCommentService";
import { useAuth } from "./AuthContext";


//interfaz de agregar una publicacion nueva
export interface PublicationAdd {
  name_pet: string;
  raze_pet: string;
  age_pet: number;
  color_pet: string;
  size_pet: number;
  imgUrl_pet: string;
  user_id: number;
  date: string;
  description: string;
};

//interfaz para guardar comentarios
export interface SendComment {
  user_id: number;
  comment: string;
  date: string; // Fecha del comentario en formato ISO 8601 (e.g., "2001-12-30")
  token?: string;
};

//interfaz de comentarios
export interface Comment {
  id: number;
  user_id: number;
  publication_id: number;
  comment: string;
  date: string; 
  status: number;
  name: string;
  imgUrl: string;
};

//interfaz de publicaciones
export interface Publication {
  publication_id: number;
  publication_date: string;
  publication_description: string;
  publication_status: number;
  user_name: string;
  user_id: number;
  user_ubication: string;
  user_imgUrl: string;
  pet_name: string;
  pet_raze: string;
  pet_age: number;
  pet_color: string;
  pet_size: string;
  pet_imgUrl: string;
};

interface PublicationsContextType {
  fetchPublications: () => Promise<void>;
  publications: Publication[];
  addPublication: (publication: PublicationAdd) => void;
  removePublication: (id: string) => void;
  fetchComments: (publicationId: number) => Promise<void>;
  getPublicationUserId: (user_id: number) => Promise<void>;
  publicationsUserId: Publication[];
  comments: Comment[];
  sendComment: (publicationId: number, sendComment: SendComment) => Promise<boolean>;
}

const PublicationsContext = createContext<PublicationsContextType | undefined>(
  undefined
);

export const PublicationsProvider: React.FC<{ children: ReactNode }> = ({ 
  children,
}) => {
  const [publications, setPublications] = useState<Publication[]>(() => {
    const storedPublications = sessionStorage.getItem("publications");
    return storedPublications ? JSON.parse(storedPublications) : [];
  });
  const [publicationsUserId, setPublicationsUserId] = useState<Publication[]>(() => {
    const storedPublicationsUserId = sessionStorage.getItem("publicationsUserId");
    return storedPublicationsUserId ? JSON.parse(storedPublicationsUserId) : [];
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const {token} = useAuth();

  //consultar todas las publicaciones
  const fetchPublications = async (): Promise<void> => {
    try {
      const fetchedPublications = await getPublications();
      if (!fetchedPublications || fetchedPublications.length === 0) {
        throw new Error("No se encontraron publicaciones");
      }
      setPublications(fetchedPublications);
      sessionStorage.setItem(
        "publications",
        JSON.stringify(fetchedPublications)
      );
    } catch (error) {
      ToastiError("Hubo un error al cargar las publicaciones. 😬");
      console.error("Error al cargar publicaciones:", error);
      throw error;
    }
  };

  //buscar todas las publicaciones de un user especifico
  const getPublicationUserId = async (user_id: number): Promise<void> => {
    try {
      const publicationsUser = await getPublicationsUserId(user_id, token as string);
      setPublicationsUserId(publicationsUser);
      sessionStorage.setItem(
        "publicationsUserId",
        JSON.stringify(publicationsUser)
      );
    } catch (error) {
      console.log(error)
    }
  }

  const addPublication = (publication: PublicationAdd) => {
    // try {
    //   setPublications((prevPublications) => [...prevPublications, publication]);
    //   ToastiSuccess("¡Publicación añadida con éxito! ✅");
    // } catch (error) {
    //   ToastiError("Hubo un error al añadir la publicación. 😬");
    //   console.error("Error al añadir publicación:", error);
    // }
  };

  const removePublication = (id: string) => {
    // try {
    //   setPublications((prevPublications) =>
    //     prevPublications.filter((pub) => pub.id !== id)
    //   );
    //   ToastiSuccess("¡Publicación eliminada con éxito! ✅");
    // } catch (error) {
    //   ToastiError("Hubo un error al eliminar la publicación. 😬");
    //   console.error("Error al eliminar publicación:", error);
    // }
  };

   //consultar todos los comentarios por id de la publicacion
   const fetchComments = async (publicationId: number): Promise<void> => {
    try {
      const fetchedCommnets = await getComments(publicationId);
      setComments(fetchedCommnets);
    } catch (error) {
      ToastiError("Hubo un error al cargar los comentarios. 😬");
      console.error("Error al cargar los comentarios:", error);
      throw error;
    }
  };

  //crear un comentario en una publications
  const sendComment = async (publicationId: number, sendComment: SendComment): Promise<boolean> => {
    try {
      const response = await sendComments(publicationId, sendComment, token as string);
      if (response) {
        ToastiSuccess("¡Comentario añadido exitosamente! ✅");
        try {
          await fetchComments(publicationId);
          return true;
        } catch (error) {
          ToastiError("Error al actualizar los comentarios. 😬");
          console.error("Error al cargar los comentarios:", error);
          return false;
        }
      } else {
        console.error("Error: La respuesta del servidor no indica éxito.");
        return false;
      }
    } catch (error) {
      ToastiError("Hubo un error al enviar el comentario. 😬");
      console.error("Error al enviar comentario:", error);
      return false;
    }
  };

  return (
    <PublicationsContext.Provider
      value={{
        publications,
        getPublicationUserId,
        publicationsUserId,
        addPublication,
        removePublication,
        fetchPublications,
        fetchComments,
        comments,
        sendComment,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};

export const usePublications = (): PublicationsContextType => {
  const context = useContext(PublicationsContext);
  if (!context) {
    throw new Error(
      "usePublications must be used within a PublicationsProvider"
    );
  }
  return context;
};
