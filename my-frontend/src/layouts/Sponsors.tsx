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
    <Grid container bgcolor="primary.light" padding={7} display="flex" justifyContent="center">
      <Grid container maxWidth={maxWidth}>
        <Grid xs={12} marginBottom={3} textAlign="center">
          <Typography variant="h3" textAlign="center" color="primary.main">
            Nuestros Patrocinadores
          </Typography>
        </Grid>
        <Grid container display="flex" justifyContent="center" width="100%" spacing={2}>
        {imgSponsor.map((img) => (
          <Grid
            key={img.name}
            xs={12}
            sm={4}
            md={2.4}
            display="flex"
            justifyContent="center"
          >
            <img
              src={img.img}
              alt={img.name}
              style={{
                width: "200px",
                boxShadow: "0 4px 10px rgba(54, 1, 54, 0.5)",
                borderRadius: "10px"
              }}
            />
          </Grid>
        ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Sponsors;
