
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { maxWidth } from '../layouts/width';
import AboutLayout from '../layouts/AboutLayout';

interface Props {
    // Define props here
}

const AboutPage: React.FC<Props> = (Props) => {
    return (
        <Grid2 width={maxWidth} margin={"auto"}>
           <AboutLayout />
        </Grid2>
        
    );
};

export default AboutPage;