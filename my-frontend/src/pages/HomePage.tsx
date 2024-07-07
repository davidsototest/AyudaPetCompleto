import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import Banner from '../layouts/Banner';
import CardsTree from '../layouts/CardsTree';
import HelpPet from '../layouts/HelpPet';
import PublicationsInfo from '../layouts/PublicationsInfo';
import Metrics from '../layouts/MetricsLayout';
import Sponsors from '../layouts/Sponsors';
import { maxWidth } from '../layouts/width';
import { mainInfo, detailInfo } from "../components/data/publicationInfoHome";

interface Props {
    // Define props here
}

const HomePage: React.FC<Props> = (Props) => {
    return (
        <Grid>
            <Grid width={maxWidth} margin={"auto"}>
                <Banner />
                <CardsTree />
                <HelpPet />
                <PublicationsInfo mainInfo={mainInfo} detailInfo={detailInfo} statusButtom={true} path="record" nameButtom="REGISTRARME"/>
            </Grid>
            <Grid paddingTop={10} paddingBottom={10}>
            <Sponsors />
            </Grid>
            <Grid width={maxWidth} margin={"auto"}>
                <Metrics />
            </Grid>
        </Grid>
        
    );
};

export default HomePage;