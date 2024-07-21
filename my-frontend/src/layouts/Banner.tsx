import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TitleParagraphy from "../components/others/TitleParagraphy";
import CarouselImg from "../components/caruosel/CarouselImg";
import { styled } from "@mui/material";

interface Props {
  // Define props here
}

const Banner: React.FC<Props> = (Props) => {

  const ShadowedGrid = styled(Grid)(({ theme }) => ({
    position: "relative",
    height: "400px",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      height: "25px",
      zIndex: 1,
      pointerEvents: "none",
    },
    "&::before": {
      top: 0,
      background: `linear-gradient(to bottom, ${theme.palette.secondary.main} 1%, rgba(255, 255, 255, 0))`,
    },
    "&::after": {
      bottom: 0,
      background: `linear-gradient(to top, ${theme.palette.secondary.main} 1%, rgba(255, 255, 255, 0))`,
    },
  }));

  return (
    <Grid container columnSpacing={2} paddingTop={5}>
      <Grid xs={12} md={6}>
        <TitleParagraphy />
      </Grid>
      <ShadowedGrid xs={12} md={6}>
        <CarouselImg />
      </ShadowedGrid>
    </Grid>
  );
};

export default Banner;
