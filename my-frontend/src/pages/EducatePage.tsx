
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { maxWidth } from '../layouts/width';
import { Typography } from '@mui/material';
import EducateLayoout from '../layouts/EducateLayout';
import { educateInfo } from '../components/data/educateInfo';

interface Props {
    // Define props here
}

const EducatePage: React.FC<Props> = (Props) => {
    return (
        <Grid container width={maxWidth} margin={"auto"}>
      <Grid xs={12} textAlign="center" padding={5}>
        <Typography variant="h2">Mascotas Extraviadas</Typography>
      </Grid>
      <Grid marginBottom="50px">
        <EducateLayoout educateInfo={educateInfo} skeleton={false} />
      </Grid>
      <Grid>
        {/* <PublicationsInfo mainInfo={mainInfo} detailInfo={detailInfo}/> */}
      </Grid>
    </Grid>
        
    );
};

export default EducatePage;