import {
  TextField,
  Button,
  Typography,
  useTheme,
  Avatar,
  Backdrop,
  CircularProgress,
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { avatarDefault } from "../data/avatarDefault";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToastiError } from "../toasti/ToastiError";
import { ToastiSuccess } from "../toasti/ToastiSuccess";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface Props {
  // Define props here
}

// Definición del esquema de validación
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico es requerido"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Contraseña es requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Las contraseñas deben coincidir")
    .required("Confirmación de contraseña es requerida"),
});

const RegisterUser: React.FC<Props> = (Props) => {
  const theme = useTheme();
  const [avatarDefa, setAvatarDefa] = useState(avatarDefault[0].url);
  const [number, setNumber] = useState(0);
  const [avatarStyle, setAvatarStyle] = useState(
    "animate__fadeIn animate__delay-1s"
  );
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const backdropToasti = () => {
    ToastiError("¡Espere mientras lo registramos! ⏳");
  };

  const exchangerAvatar = () => {
    setAvatarStyle("animate__fadeOut");

    const cantAvatar: number = avatarDefault.length - 1;

    setTimeout(() => {
      setAvatarStyle("animate__fadeIn");

      if (number < cantAvatar) {
        setAvatarDefa(avatarDefault[number + 1].url);
        setNumber(number + 1);
      } else {
        setAvatarDefa(avatarDefault[0].url);
        setNumber(0);
      }
    }, 800);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setOpenBackdrop(true);

    setTimeout(() => {
      setOpenBackdrop(false);
      ToastiSuccess("... ¡Su registro ha sido EXITOSO! ✅");
      console.log(data);
      reset();
    }, 5000);
    // envío del formulario
  };

  return (
    // <Container component="main" maxWidth="xs">
    //   {/* <CssBaseline /> */}
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       Sign in
    //     </Typography>
    //     <Box component="form" noValidate sx={{ mt: 1 }}>
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="email"
    //         label="Email Address"
    //         name="email"
    //         autoComplete="email"
    //         autoFocus
    //       />
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="Password"
    //         type="password"
    //         id="password"
    //         autoComplete="current-password"
    //       />
    //       <FormControlLabel
    //         control={<Checkbox value="remember" color="primary" />}
    //         label="Remember me"
    //       />
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         Sign In
    //       </Button>
    //       <Grid container>
    //         <Grid xs>
    //           <Link href="#" variant="body2">
    //             Forgot password?
    //           </Link>
    //         </Grid>
    //         <Grid >
    //           <Link href="#" variant="body2">
    //             {"Don't have an account? Sign Up"}
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    // </Container>
    <Grid
      container
      rowSpacing={4}
      bgcolor={theme.palette.primary.light}
      padding={3}
      borderRadius="15px"
      justifyContent="center"
      maxWidth="500px"
    >
        <Grid xs={10} textAlign="center">
          <Typography
            variant="h3"
            color={theme.palette.primary.main}
            className="animate__animated animate__backInDown"
          >
            Registro de Nuevos Usuarios
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                required
                className="animate__animated animate__fadeIn"
              />
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                required
                className="animate__animated animate__fadeIn"
              />
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirmar contraseña"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                required
                className="animate__animated animate__fadeIn"
              />
            )}
          />
        </Grid>
        <Grid xs={6} justifyContent="center" display="flex">
          <Grid
            container
            display="flex"
            justifyContent="center"
            // width='100%'
            // marginTop={2}
            // columnSpacing={4}
          >
            <Grid
              xs={6}
              display="flex"
              justifyContent="end"
              alignContent="center"
              padding={0}
              marginRight={2}
            >
              <Avatar
                alt="avatarDefault"
                src={avatarDefa}
                style={{ height: "120px", width: "120px" }}
                className={`animate__animated ${avatarStyle}`}
              />
            </Grid>
            <Grid
              xs={6}
              justifyContent="center"
              alignContent="center"
              className="animate__animated animate__fadeIn animate__delay-1s"
              // display='flex'
            >
              <Typography style={{ marginBottom: "10px" }}>
                Cambiar Avatar
              </Typography>
              <Button
                style={{ margin: "auto", display: "flex" }}
                onClick={exchangerAvatar}
              >
                <ArrowBackIosIcon />
                <ArrowBackIosIcon />
                <ArrowBackIosIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          paddingTop={4}
          className="animate__animated animate__fadeIn animate__delay-1s"
        >
          <button
            className="button button-secundary"
            onClick={handleSubmit(onSubmit)}
            style={{ maxHeight: "50px" }}
          >
            {"Registrar  >>"}
          </button>
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

export default RegisterUser;
