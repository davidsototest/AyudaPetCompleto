
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import RegisterUser from '../components/record/RegisterUser';
import { maxWidth } from './width';

interface Props {
    // Define props here
}

const RegisterNewUser: React.FC<Props> = (Props) => {

    const img = "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/register%2FimgRegister.svg?alt=media&token=e24b4505-c426-4aa4-98ac-4b3b11ce2520";

    return (
        <Grid container maxWidth={maxWidth}>
            <Grid xs={12} md={6} padding={5} justifyContent="center" display="flex">
                <RegisterUser />
            </Grid>
            <Grid xs={12} md={6} display="flex" justifyContent="center" alignItems="center" className="animate__animated animate__bounceIn">
                <img src={img} alt="img-register" style={{height: "400px"}}/>
            </Grid>
        </Grid>
    );
};

export default RegisterNewUser;