import { Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import CarouselSolo from "./CorouselSolo";
import { imagenesCarousel } from "../data/imagenesCarousel";

interface Props {
  // Define props here
}

const CarouselImg: React.FC<Props> = (Props) => {

  return (
    <Box sx={{ width: "100%", flexGrow: 1, position: "relative" }}>
      <Grid>
        <CarouselSolo images={imagenesCarousel} height={400}/>
      </Grid>
    </Box>
  );
};

export default CarouselImg;
