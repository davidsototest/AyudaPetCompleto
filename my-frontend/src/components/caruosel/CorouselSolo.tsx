import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Carousel } from "../data/imagenesCarousel";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface Img {
  images: Carousel[];
  height: number;
}

const CarouselSolo: React.FC<Img> = ({ images, height }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{ width: "100%", flexGrow: 1, position: "relative" }} >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((img, index) => (
          <div key={index} >
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: height,
                  width: "100%",
                //   objectFit: "cover",
                //   objectPosition: "center",
                  display: "block",
                //   overflow: "hidden",
                }}
                src={img.img}
                alt={img.img}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
};

export default CarouselSolo;
