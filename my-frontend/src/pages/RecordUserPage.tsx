import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import RegisterNewUser from "../layouts/RegisterNewUser";
import PublicationsInfo from "../layouts/PublicationsInfo";
import { maxWidth } from "../layouts/width";
import {
  mainInfo,
  detailInfo,
} from "../components/data/publicationInfoRegister";
import HelpPet from "../layouts/HelpPet";
import Metrics from "../layouts/Metrics";

interface Props {
  // Define props here
}

const RecordUserPage: React.FC<Props> = (Props) => {
  return (
    <Grid
      width={maxWidth}
      margin={"auto"}
    >
      <Grid>
        <RegisterNewUser />
      </Grid>
      <Grid marginTop={7}>
        <PublicationsInfo mainInfo={mainInfo} detailInfo={detailInfo} />
      </Grid>
      <Grid marginTop={3} justifyContent="center" display="flex" width="100%">
        <HelpPet />
      </Grid>
      <Grid width={maxWidth} margin={"auto"}>
        <Metrics />
      </Grid>
    </Grid>
  );
};

export default RecordUserPage;
