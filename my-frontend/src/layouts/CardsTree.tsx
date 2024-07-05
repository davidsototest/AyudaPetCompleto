import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { imgCardsLarge } from "../components/data/imgCardsLarge";
import CardLarge from "../components/cards/CardLarge";
import { Typography, useTheme } from "@mui/material";

interface Props {
  // Define props here
}

const CardsTree: React.FC<Props> = (Props) => {

  const theme = useTheme();

  return (
    // <!-- Componente de tarjetas 3 DAVID -->

    <Grid container padding={7}>
      <Grid container xs={12} justifyContent="center" textAlign="center" padding={5}>
        <Grid md={6}>
          <Typography variant="h3" color={theme.palette.primary.main}>
            Amor, Atención y Cuidados: Garantizando la Felicidad y Salud de tu Compañero Peludo
          </Typography>
        </Grid>
      </Grid>
      {imgCardsLarge.map((imgCard) => (
        <Grid
          key={imgCard.title}
          xs={12}
          md={4}
          display="flex"
          justifyContent="center"
          marginBottom={4}
        >
          <CardLarge
            title={imgCard.title}
            img={imgCard.img}
            describe={imgCard.describe}
            ver={true}
            nameButtom={"Saber más"}
            path={"educate"}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardsTree;
