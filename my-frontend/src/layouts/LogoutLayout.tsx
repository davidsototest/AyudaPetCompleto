
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import LogoutComment from '../components/others/LogoutComment';

interface Props {
    // Define props here
}

const LogoutLayout: React.FC<Props> = (Props) => {

    const img = "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Fposter%2FAyudaPet1%20(6).webp?alt=media&token=b25e611e-5228-4340-a90a-019b206f9c25";

    return (
        <Grid container>
            <Grid xs={12} md={6} padding={5} justifyContent="center" display="flex">
                <LogoutComment />
            </Grid>
            <Grid xs={12} md={6} display="flex" justifyContent="center" alignItems="center" className="animate__animated animate__bounceIn">
                <img src={img} alt="img-register" style={{height: "400px"}}/>
            </Grid>
        </Grid>
    );
};

export default LogoutLayout;