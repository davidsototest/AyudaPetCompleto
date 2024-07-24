import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TitleParagraphy from "../components/others/TitleParagraphy";
import CarouselImg from "../components/caruosel/CarouselImg";
import { styled, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  // Define props here
}

const Banner: React.FC<Props> = (Props) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const height = isMobile ? 280 : 400;
  const columnSpacing = isMobile ? 0 : 2;

  const ShadowedGrid = styled(Grid)(({ theme }) => ({
    position: "relative",
    height: height,
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
    <Grid 
      container 
      columnSpacing={columnSpacing} 
      sx={{
        paddingTop: {
          xs: 0,
          md: 4
        }
      }}
    >
      <Grid xs={12} md={6}>
        <TitleParagraphy />
      </Grid>
      <ShadowedGrid xs={12} md={6}>
        <CarouselImg height={height}/>
      </ShadowedGrid>
    </Grid>
  );
};

export default Banner;
