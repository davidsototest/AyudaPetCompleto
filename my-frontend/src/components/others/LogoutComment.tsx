import {
  Backdrop,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ToastiError } from "../toasti/ToastiError";

interface Props {
  nameUser?: string;
}

const LogoutComment: React.FC<Props> = ({ nameUser = "" }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { logout } = useAuth();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const logoutUser = async () => {
    setOpenBackdrop(true);
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error en el cierre de sesión:", error);
    } finally {
      setOpenBackdrop(false);
    }
  };

  const backdropToasti = () => {
    ToastiError("¡Espere mientras lo iniciamos sesión! ⏳");
  };

  return (
    <Grid
      container
      textAlign="center"
      color={theme.palette.primary.main}
      justifyContent="center"
    >
      <Grid
        width="100%"
        alignContent="center"
        className="animate__animated animate__backInDown"
      >
        <Typography variant="h3" marginBottom={4}>
          ¡Gracias por visitarnos! {nameUser}
        </Typography>
      </Grid>
      <Grid xs={12} md={10} className="animate__animated animate__bounceIn">
        <Typography variant="h6">
          Esperamos que regreses pronto. Te mantendremos informado sobre
          cualquier noticia de tu mascota perdida. Ten fe, estamos seguros de
          que pronto estará a tu lado. ¡Cuídate y hasta pronto!
        </Typography>
      </Grid>
      <Grid marginBottom={6}>
        <Typography variant="h6">¡Cuídate y hasta pronto!</Typography>
      </Grid>
      <Grid
        xs={12}
        justifyContent="center"
        className="animate__animated animate__bounceIn"
      >
        <ButtonPrimary onClick={logoutUser}>Cerrar sesión</ButtonPrimary>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={backdropToasti}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </Grid>
  );
};

export default LogoutComment;
