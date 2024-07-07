import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

interface Props {
  // Define props here
}

const InContrucction: React.FC<Props> = (Props) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ color: theme.palette.primary.main }}>
      <Grid>
        <Typography variant="h3">En construcción</Typography>
      </Grid>
      <Grid width="100%">
        <Box sx={{width: "100%", display: "flex", justifyContent: "center"}}>
          <CircularProgress color="primary" size={65}/>
        </Box>
      </Grid>
    </Grid>
  );
};

export default InContrucction;
