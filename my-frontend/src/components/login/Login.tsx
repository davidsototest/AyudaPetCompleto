import * as React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Backdrop, Checkbox, CircularProgress, FormControlLabel, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ToastiError } from "../toasti/ToastiError";
import { ToastiSuccess } from "../toasti/ToastiSuccess";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

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
});

interface Props {
  // Define props here
}

const Login: React.FC<Props> = (Props) => {
  const theme = useTheme();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const backdropToasti = () => {
    ToastiError("¡Espere mientras lo registramos! ⏳");
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
          Iniciar sesión
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
      <Grid xs={12} color={theme.palette.primary.main}>
        <FormControlLabel
          control={<Checkbox value="remember" />}
          label="Mantener la sesión activa"
        />
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
          {"Iniciar sesión"}
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

    //   <Container component="main" maxWidth="xs">
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Sign in
    //       </Typography>
    //       <Box
    //         component="form"
    //         onSubmit={handleSubmit}
    //         noValidate
    //         sx={{ mt: 1 }}
    //       >
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="email"
    //           label="Email Address"
    //           name="email"
    //           autoComplete="email"
    //           autoFocus
    //         />
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           autoComplete="current-password"
    //         />
    //         <FormControlLabel
    //           control={<Checkbox value="remember" color="primary" />}
    //           label="Remember me"
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           Sign In
    //         </Button>
    //         <Grid container>
    //           <Grid item xs>
    //             <Link href="#" variant="body2">
    //               Forgot password?
    //             </Link>
    //           </Grid>
    //           <Grid item>
    //             <Link href="#" variant="body2">
    //               {"Don't have an account? Sign Up"}
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //   </Container>
  );
};

export default Login;
