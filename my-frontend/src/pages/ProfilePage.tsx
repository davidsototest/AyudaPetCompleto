import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import Metrics from "../layouts/MetricsLayout";
import { maxWidth } from "../layouts/width";
import ProfileLayout from "../layouts/ProfileLayout";

interface Props {
  // Define props here
}

const ProfilePage: React.FC<Props> = (Props) => {
  return (
    <Grid width={maxWidth} margin={"auto"}>
      <Grid>
        <ProfileLayout />
      </Grid>
      <Grid marginTop={6}>
        <Metrics />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
