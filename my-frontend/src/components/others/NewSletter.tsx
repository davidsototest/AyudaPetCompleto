
import { TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';

interface Props {
    // Define props here
}

const NewSletter: React.FC<Props> = (Props) => {
    return (
        <Grid container rowSpacing={3}> 
            <Grid xs={12}>
                <Typography variant='h6' color="secondary.main">
                    Suscribete a nuestro NewSletter y mantente informado.
                </Typography>
            </Grid>
            <Grid xs={12}>
                <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" color='secondary'/>
            </Grid>
            <Grid xs={12}>
                <button className='button button-primary'>
                    Suscribirme
                </button>
            </Grid>
        </Grid>
    );
};

export default NewSletter;