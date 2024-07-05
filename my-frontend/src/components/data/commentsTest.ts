
// Define la interfaz para los comentarios
export interface Comment {
    imgSrc: string;
    imgAlt: string;
    nameUser: string;
    date: string;
    ubication: string;
    comment: string;
  }
  
  // Array de objetos de comentarios
  export const comments: Comment[] = [
    {
      imgSrc: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2Fmascota%20(12).jpg?alt=media&token=75d2a020-d5e0-41c9-a978-24163ea0fcff",
      imgAlt: "test img",
      nameUser: "Usuario Uno",
      date: "15 enero 2024",
      ubication: "Rosario",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      imgSrc: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2Fmascota%20(12).jpg?alt=media&token=75d2a020-d5e0-41c9-a978-24163ea0fcff",
      imgAlt: "test img",
      nameUser: "Usuario Dos",
      date: "16 enero 2024",
      ubication: "Buenos Aires",
      comment: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      imgSrc: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2Fmascota%20(12).jpg?alt=media&token=75d2a020-d5e0-41c9-a978-24163ea0fcff",
      imgAlt: "test img",
      nameUser: "Usuario Tres",
      date: "17 enero 2024",
      ubication: "Córdoba",
      comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      imgSrc: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2Fmascota%20(12).jpg?alt=media&token=75d2a020-d5e0-41c9-a978-24163ea0fcff",
      imgAlt: "test img",
      nameUser: "Usuario Cuatro",
      date: "18 enero 2024",
      ubication: "Mendoza",
      comment: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      imgSrc: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2Fmascota%20(12).jpg?alt=media&token=75d2a020-d5e0-41c9-a978-24163ea0fcff",
      imgAlt: "test img",
      nameUser: "Usuario Cinco",
      date: "19 enero 2024",
      ubication: "Salta",
      comment: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem."
    },
    {
      imgSrc: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2Fmascota%20(12).jpg?alt=media&token=75d2a020-d5e0-41c9-a978-24163ea0fcff",
      imgAlt: "test img",
      nameUser: "Usuario Seis",
      date: "20 enero 2024",
      ubication: "San Juan",
      comment: "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt."
    }
  ];
  