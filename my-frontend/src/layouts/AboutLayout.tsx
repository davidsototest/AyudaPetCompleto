
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import AboutComponent from '../components/about/AboutComponent';

interface Props {
    // Define props here
}

const AboutLayout: React.FC<Props> = (Props) => {
    return (
        <Grid>
            <AboutComponent />
        </Grid>
    );
};

export default AboutLayout;