import { Typography, useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../buttons/ButtonPrimary";

interface Props {
  // Define props here
}

const TitleParagraphy: React.FC<Props> = (Props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid 
      container 
      rowSpacing={4} 
      sx={{
        color: theme.palette.primary.main,
        padding: {
          xs: 4,
          md: 0
        },
        paddingTop: {
          xs: 0,
          md: 0
        }
        }}
      >
      <Grid>
        <Typography variant={isXs ? 'h3' : 'h2'}>
          Encuentra mascotas perdidas con <strong>AyudaPet</strong>
        </Typography>
      </Grid>
      <Grid xs={12} md={8}>
        <Typography variant="h6">
          Publica, comenta y comparte avistamientos para reuinir mascotas con
          sus dueños. Juntos podemos ayudar a reunir familias peludas!
        </Typography>
      </Grid>
      <Grid xs={12} md={4}></Grid>
      <Grid>
        <ButtonPrimary onClick={() => navigate("publications")}>
          {"VER LAS MASCOTAS"}
        </ButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default TitleParagraphy;
