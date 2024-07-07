import * as React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ToastiError } from "../toasti/ToastiError";
import { ToastiSuccess } from "../toasti/ToastiSuccess";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import loginService from "../../services/login/loginService";

// Define la interfaz Credentials
interface Credentials {
  email: string;
  password: string;
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
});

interface Props {
  // Define props here
}

const Login: React.FC<Props> = () => {
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
  } = useForm<Credentials>({
    resolver: yupResolver(schema),
  });

  const onSubmitLogin = async (credentials: Credentials) => {
    setOpenBackdrop(true);

    try {
      const token = await loginService(credentials);
      console.log("Token de comp: " + token);
      sessionStorage.setItem("token", token);
      // Redirige al usuario a la página principal después de iniciar sesión
      // history.push("/home");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    };
    setOpenBackdrop(false);
    ToastiSuccess("... ¡Su registro ha sido EXITOSO! ✅");
    reset();
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
          onClick={handleSubmit(onSubmitLogin)}
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
  );
};

export default Login;
