
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { helpPet } from '../components/data/helpPet';
import CardHelp from '../components/cards/CardHelp';

interface Props {
    // Define props here
}

const HelpPet: React.FC<Props> = (Props) => {
    return (
        <Grid container display="flex" justifyContent="center" paddingTop={4}>
            <Grid xs={12} sm={10} display="flex" justifyContent="center" width={"100%"}>
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