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
    img1: string;
    img2: string;
    img3: string;
    titleImg: string;
    descImg: string;
  }
  
  export const detailInfo: PublicationDetail[] = [
    {
      img1: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Frobot%2FAyudaPet3%20(1).webp?alt=media&token=cebbe087-ab79-4f87-be96-4ac87fc99caa",
      img2: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Fposter%2FAyudaPet1%20(13).webp?alt=media&token=9ae10d36-efa8-4187-8dee-41e235c71374",
      img3: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Frobot%2FAyudaPet3%20(2).webp?alt=media&token=00b6334c-c72e-4c27-b1e8-0a60b8f68e1f",
      titleImg: "1. Revisa comentarios.",
      descImg:
        "Lee los comentarios diariamente para identificar posibles zonas donde podría estar tu mascota. La comunidad puede proporcionar pistas valiosas.",
    },
    {
      img1: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Fposter%2FAyudaPet1%20(2).webp?alt=media&token=b7a5af08-c35a-4e1f-8a90-def9bcf13feb",
      img2: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Frobot%2FAyudaPet3%20(3).webp?alt=media&token=94ae3585-4856-4bdc-a8fd-5575c77ed30f",
      img3: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Fposter%2FAyudaPet1%20(3).webp?alt=media&token=5e3bb401-4c1f-4abf-aabc-f9cc3ba907f9",
      titleImg: "2. Ofrece feedback.",
      descImg:
        "Da retroalimentación sobre los comentarios que tomaste en cuenta y las búsquedas realizadas. Esto ayuda a mantener informada a la comunidad.",
    },
    {
      img1: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Frobot%2FAyudaPet3%20(4).webp?alt=media&token=f392e1fb-71d3-4668-a568-25e39109d167",
      img2: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Fposter%2FAyudaPet1%20(6).webp?alt=media&token=b25e611e-5228-4340-a90a-019b206f9c25",
      img3: "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Frobot%2FAyudaPet3%20(5).webp?alt=media&token=3dcf9f65-9c73-44ee-9abc-92111e2ad9c1",
      titleImg: "3. Agradece y actualiza.",
      descImg:
        "Agradece a las personas si lograste encontrar a tu mascota y actualiza la publicación a 'mascota encontrada'. Esto motiva a otros a seguir ayudando.",
    },
  ];
  