export interface PublicationMainInfo {
    title: string;
    describe: string;
  }
  
  export const mainInfo: PublicationMainInfo = {
    title: "Cómo actuar al buscar tu mascota extraviada",
    describe:
      "Sigue estos pasos para aumentar las posibilidades de encontrar a tu mascota perdida. Revisa los comentarios, ofrece retroalimentación y agradece a quienes te ayuden en la búsqueda.",
  };
  
  export interface PublicationDetail {
    img: string;
    titleImg: string;
    descImg: string;
  }
  
  export const detailInfo: PublicationDetail[] = [
    {
      img: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/register%2FcardGrande%2FRedSocial.jpg?alt=media&token=b5b79224-11c4-41b8-99b1-bfec6fb6f5f3",
      titleImg: "1. Revisa comentarios.",
      descImg:
        "Lee los comentarios diariamente para identificar posibles zonas donde podría estar tu mascota. La comunidad puede proporcionar pistas valiosas.",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/register%2FcardGrande%2Ffeedback.jpg?alt=media&token=770bbed3-4ab3-46d4-b8a1-9b9b3eb7a066",
      titleImg: "2. Ofrece feedback.",
      descImg:
        "Da retroalimentación sobre los comentarios que tomaste en cuenta y las búsquedas realizadas. Esto ayuda a mantener informada a la comunidad.",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/register%2FcardGrande%2FpetEncontrado.jpg?alt=media&token=695a0112-10c4-4fe5-9156-0269bac75b0b",
      titleImg: "3. Agradece y actualiza.",
      descImg:
        "Agradece a las personas si lograste encontrar a tu mascota y actualiza la publicación a 'mascota encontrada'. Esto motiva a otros a seguir ayudando.",
    },
  ];
  