
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { maxWidth } from './width';
import Login from '../components/login/Login';

interface Props {
    // Define props here
}

const SingInLayout: React.FC<Props> = (Props) => {

    const img = "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesRectangulares%2Frobot%2F9_w0Xo7sQx2wEzHmPZLLAw.webp?alt=media&token=0869caa7-d4f7-4edb-8cc6-f112013d98b1";

    return (
        <Grid container maxWidth={maxWidth}>
            <Grid xs={12} md={6} padding={5} justifyContent="center" display="flex">
                <Login />
            </Grid>
            <Grid xs={12} md={6} display="flex" justifyContent="center" alignItems="center" className="animate__animated animate__bounceIn">
                <img src={img} alt="img-register" style={{height: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" }}/>
            </Grid>
        </Grid>
    );
};

export default SingInLayout;