export interface PublicationMainInfo {
    title: string;
    describe: string;
  }
  
  export const mainInfo: PublicationMainInfo = {
    title: "Cómo actuar ante una mascota extraviada",
    describe:
      "Sigue estos tres pasos clave para aumentar las posibilidades de encontrar a tu mascota perdida. Involucra a tu comunidad local y en línea para maximizar los esfuerzos de búsqueda y lograr una reunión más rápida y segura con tu mascota.",
  };
  
  
  export interface PublicationDetail {
    img: string;
    titleImg: string;
    descImg: string;
  }
  
  export const detailInfo: PublicationDetail[] = [
    {
      img: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2FcardGrnde%2Ffolletos.jpg?alt=media&token=07a4c02b-9761-47f3-8575-54e3888dcdf2",
      titleImg: "1. Busca y pega folletos.",
      descImg:
        "Distribuye folletos con fotos y detalles de tu mascota por todo tu barrio. Esto puede ayudar a que más personas estén atentas y te avisen si la ven.",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2FcardGrnde%2FredesSociales.jpg?alt=media&token=ba029072-ed12-4ff8-8c53-a85ed8a086b6",
      titleImg: "2. Publica en redes sociales.",
      descImg:
        "Coloca anuncios en tus redes sociales con fotos y descripciones de tu mascota. Pide a tus amigos que compartan la publicación para alcanzar a más personas.",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2FcardGrnde%2Fcaminar.jpg?alt=media&token=2c42a5c7-42fc-4d80-b2ec-f0ea7783d4f7",
      titleImg: "3. Sal a buscarla.",
      descImg:
        "Dedica tiempo a salir y buscar a tu mascota en tus ratos libres. Pregunta a tus vecinos y recorre lugares cercanos donde podría estar.",
    },
  ];
  
  