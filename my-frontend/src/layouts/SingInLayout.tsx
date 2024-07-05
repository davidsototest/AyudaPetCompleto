
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { maxWidth } from './width';
import Login from '../components/login/Login';

interface Props {
    // Define props here
}

const SingInLayout: React.FC<Props> = (Props) => {

    const img = "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/login%2Flogin-app.svg?alt=media&token=64cc51bf-ea04-49d7-a653-731a740bb34f";

    return (
        <Grid container maxWidth={maxWidth}>
            <Grid xs={12} md={6} padding={5} justifyContent="center" display="flex">
                <Login />
            </Grid>
            <Grid xs={12} md={6} display="flex" justifyContent="center" alignItems="center" className="animate__animated animate__bounceIn">
                <img src={img} alt="img-register" style={{height: "400px"}}/>
            </Grid>
        </Grid>
    );
};

export default SingInLayout;