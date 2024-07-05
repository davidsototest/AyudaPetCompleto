import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import CardGrande from "../components/cards/CardGrande";
import { PublicationDetail, PublicationMainInfo,  } from "../components/data/publicationInfoHome";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../components/buttons/ButtonSecondary";
import { maxWidth } from "./width";

interface Props {
  mainInfo: PublicationMainInfo,
  detailInfo: PublicationDetail[],
  statusButtom?: boolean,
  path?: string,
  nameButtom?: string,
};

const PublicationsInfo: React.FC<Props> = ({mainInfo, detailInfo, statusButtom=false, path="/", nameButtom="nombre botom"}) => {

  const navigate = useNavigate();
  const [status] = useState(statusButtom);

  return (
    // <!-- ----------- publica y encuentra PABLO --------------- -->

    <Grid container width={maxWidth} margin={"auto"} marginTop={9}> 
      <Grid>
        <CardGrande publi={mainInfo} describe={detailInfo} />
      </Grid>
      {status? (
          <Grid xs={12} justifyContent="center" display="flex" padding={5} >
            <ButtonSecondary onClick={() => navigate(path)}>
                {nameButtom}
              </ButtonSecondary>
          </Grid>
      ) : (<Grid></Grid>)}
    </Grid>
  );
};

export default PublicationsInfo;
