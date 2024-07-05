
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { helpPet } from '../components/data/helpPet';
import CardHelp from '../components/cards/CardHelp';

interface Props {
    // Define props here
}

const HelpPet: React.FC<Props> = (Props) => {
    return (
        <Grid container padding={7} display="flex" justifyContent="center">
            <Grid>
                <CardHelp
                    title={helpPet[0].title}
                    describe={helpPet[0].describe}
                    buttonName={helpPet[0].buttonName}
                    path={helpPet[0].path}
                />  
            </Grid>
        </Grid>
    );
};

export default HelpPet;