
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import RegisterUser from '../components/record/RegisterUser';
import { maxWidth } from './width';

interface Props {
    // Define props here
}

const RegisterNewUser: React.FC<Props> = (Props) => {

    const img = "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesRectangulares%2Frobot%2FMnEEUg7WT7iqBIHc0IKZdg.webp?alt=media&token=c7297d92-d717-4347-8c48-49cc4f617634";

    return (
        <Grid container maxWidth={maxWidth}>
            <Grid xs={12} md={6} padding={5} justifyContent="center" display="flex">
                <RegisterUser />
            </Grid>
            <Grid xs={12} md={6} display="flex" justifyContent="center" alignItems="center" className="animate__animated animate__bounceIn">
                <img src={img} alt="img-register" style={{height: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" }}/>
            </Grid>
        </Grid>
    );
};

export default RegisterNewUser;