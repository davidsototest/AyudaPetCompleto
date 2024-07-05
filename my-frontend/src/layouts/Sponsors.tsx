import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { imgSponsor } from "../components/data/imgSponsor";
import { maxWidth } from "./width";

interface Props {
  // Define props here
}

const Sponsors: React.FC<Props> = (Props) => {
  return (
    // <!--  ---------   Seccion de patrocinadores david -------- -->
    <Grid container bgcolor="primary.light" padding={7}>
      <Grid container maxWidth={maxWidth}>
        <Grid xs={12} marginBottom={3}>
          <Typography variant="h4" textAlign="center" color="primary.main">
            Nuestros Patrocinadores
          </Typography>
        </Grid>
        {imgSponsor.map((img) => (
          <Grid
            key={img.name}
            xs={12}
            md={2.4}
            display="flex"
            justifyContent="center"
            padding={2}
          >
            <img
              src={img.img}
              alt={img.name}
              className="sponsorship-section-logo"
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Sponsors;
