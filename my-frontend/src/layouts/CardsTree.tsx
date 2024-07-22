import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { imgCardsLarge } from "../components/data/imgCardsLarge";
import CardLarge from "../components/cards/CardLarge";
import { Typography, useTheme, useMediaQuery } from "@mui/material";

interface Props {
  // Define props here
}

const CardsTree: React.FC<Props> = (Props) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  let columnSpacingValue = 0;
  if (isSmMd) {
    columnSpacingValue = 2;
  }
  return (
    <Grid
      container
      sx={{
        paddingTop: {
          xs: 2,
          md: 5,
        },
      }}
    >
      <Grid
        container
        xs={12}
        justifyContent="center"
        textAlign="center"
        padding={5}
      >
        <Grid xs={11} md={6}>
          <Typography variant="h4" color={theme.palette.primary.main}>
            Amor, Atención y Cuidados: Garantizando la Felicidad y Salud de tu
            Compañero Peludo
          </Typography>
        </Grid>
      </Grid>
      <Grid 
        container 
        display="flex" 
        justifyContent="center" 
        width={"100%"}
        columnSpacing={columnSpacingValue}
      >
        {imgCardsLarge.map((imgCard) => (
          <Grid
            key={imgCard.title}
            xs={12}
            sm={5.5}
            md={4}
            display="flex"
            justifyContent="center"
            marginBottom={4}
          >
            <CardLarge
              title={imgCard.title}
              img1={imgCard.img1}
              img2={imgCard.img2}
              img3={imgCard.img3}
              describe={imgCard.describe}
              ver={true}
              nameButtom={"Saber más"}
              path={"educate"}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CardsTree;
