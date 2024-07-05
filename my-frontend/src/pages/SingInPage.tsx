
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { maxWidth } from '../layouts/width';
import SingInLayout from '../layouts/SingInLayout';

interface Props {
    // Define props here
}

const SingInPage: React.FC<Props> = (Props) => {
    return (
        <Grid width={maxWidth} margin={"auto"}>
            <SingInLayout />
        </Grid>
        
    );
};

export default SingInPage;