import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import InContrucction from "../components/others/InContruction";
import PublicationsUser from "../components/profile/PublicationsUser";

interface Props {
  // Define props here
}

const ProfileLayout: React.FC<Props> = (Props) => {
  const img =
    "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/CAROUSELimagenesCuadras%2Fposter%2FAyudaPet1%20(16).webp?alt=media&token=369ebda4-c0fb-4ad8-bb6e-68a31927b24d";

  return (
    <Grid container>
      <Grid xs={12} md={6} padding={5} justifyContent="center" display="flex">
        <PublicationsUser />
      </Grid>
      <Grid
        xs={12}
        md={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="animate__animated animate__bounceIn"
      >
        <img src={img} alt="img-register" style={{ height: "400px" }} />
      </Grid>
    </Grid>
  );
};

export default ProfileLayout;
