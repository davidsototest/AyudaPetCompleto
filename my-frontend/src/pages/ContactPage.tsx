
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { maxWidth } from '../layouts/width';
import InContrucction from '../components/others/InContruction';

interface Props {
    // Define props here
}

const ContactPage: React.FC<Props> = (Props) => {
    return (
        <Grid width={maxWidth} margin={"auto"} justifyContent="center">
            <div>
                <InContrucction/>
            </div>
        </Grid>
        
    );
};

export default ContactPage;