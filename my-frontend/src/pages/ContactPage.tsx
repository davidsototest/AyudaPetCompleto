
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { maxWidth } from '../layouts/width';

interface Props {
    // Define props here
}

const ContactPage: React.FC<Props> = (Props) => {
    return (
        <Grid width={maxWidth} margin={"auto"}>
            <div>
                <h1> ContactPage </h1>
            </div>
        </Grid>
        
    );
};

export default ContactPage;