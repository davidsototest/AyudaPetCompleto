export interface PublicationMainInfo {
  title: string;
  describe: string;
}

export const mainInfo: PublicationMainInfo = {
  title: "Publica y encuentra mascotas perdidas",
  describe:
    "Utiliza nuestra plataforma para publicar información sobre mascotas y colaborar con la comunidad en su búsqueda y reunión con sus dueños. Aprovecha esta herramienta para compartir historias, fotos y detalles importantes que puedan ayudar a las mascotas perdidas a regresar a casa más rápido y seguras.",
};

export interface PublicationDetail {
  img: string;
  titleImg: string;
  descImg: string;
}

export const detailInfo: PublicationDetail[] = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/imagenesGrupo12%2Fimg%20(5).jpg?alt=media&token=1394d702-5ccc-45da-8cb5-c1a270eaa646",
    titleImg: "1. Publica tu Mascota.",
    descImg:
      "Comparte detalles importantes sobre tu mascota perdida, como fotos, descripciones y cualquier información relevante que pueda ayudar a la comunidad a encontrarla.",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/imagenesGrupo12%2Fimg%20(6).jpg?alt=media&token=53c88c6a-0ca6-4373-8902-f50049a00d9b",
    titleImg: "2. Colaboración en la Comunidad.",
    descImg:
      "Únete a otros amantes de las mascotas para buscar juntos. Puedes colaborar compartiendo publicaciones, difundiendo alertas y brindando apoyo a otros miembros de la comunidad.",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/imagenesGrupo12%2Fimg%20(7).jpg?alt=media&token=6b8f630d-7606-41fe-b66b-752d86c2a8d2",
    titleImg: "3. Encontrar y Reportar Mascotas Encontradas",
    descImg:
      "Utiliza la plataforma para informar sobre mascotas encontradas y ayudar a reunirlas con sus dueños. Reporta avistamientos y sigue las publicaciones para mantener a la comunidad informada.",
  },
];
