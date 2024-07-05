import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import PublicationsCardSmall from "../layouts/PublicationsCardSmall";
import { petInfos } from "../components/data/petInfo";
import { Typography } from "@mui/material";
import PublicationsInfo from "../layouts/PublicationsInfo";
import { maxWidth } from "../layouts/width";
import { mainInfo, detailInfo } from "../components/data/publicationInfoPublications";

interface Props {
  // Define props here
}

const PetsPublicationsPage: React.FC<Props> = (Props) => {
  //el skeleton activa con true el skeleton, y false lo desactiva

  return (
    <Grid container width={maxWidth} margin={"auto"}>
      <Grid xs={12} textAlign="center" padding={5}>
        <Typography variant="h2">Mascotas Extraviadas</Typography>
      </Grid>
      <Grid marginBottom="50px">
        <PublicationsCardSmall petInfos={petInfos} skeleton={false} />
      </Grid>
      <Grid>
        <PublicationsInfo mainInfo={mainInfo} detailInfo={detailInfo}/>
      </Grid>
    </Grid>
  );
};

export default PetsPublicationsPage;
