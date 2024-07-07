import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { maxWidth } from "../layouts/width";
import LogoutLayout from "../layouts/LogoutLayout";
import Metrics from "../layouts/MetricsLayout";

interface Props {
  // Define props here
}

const LogoutPage: React.FC<Props> = (Props) => {
  return (
    <Grid width={maxWidth} margin={"auto"}>
      <Grid>
        <LogoutLayout />
      </Grid>
      <Grid marginTop={6}>
        <Metrics />
      </Grid>
    </Grid>
  );
};

export default LogoutPage;
