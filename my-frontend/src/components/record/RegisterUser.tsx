import {
  TextField,
  Button,
  Typography,
  useTheme,
  Avatar,
  Backdrop,
  CircularProgress,
  MenuItem,
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import provinciasArgentina from "../data/provincias";
import singInService, {
  CredentialsSingIn,
} from "../../services/register/singInService";

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
  name: yup
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre no puede tener más de 20 caracteres")
    .required("El nombre es requerido"),
  ubication: yup
    .string()
    .oneOf(provinciasArgentina, "Selecciona una ubicación válida")
    .required("La ubicación es requerida"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
    .required("El teléfono es requerido"),
});

//interfaz del formulario sin imagen
interface CredentialsSinImg {
  name: string;
  password: string;
  ubication: string;
  phone: string;
  email: string;
}

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

  //enviamos todo al servicio
  const onSubmitSingIn = async (data: CredentialsSinImg) => {
    setOpenBackdrop(true);
    try {
      console.log("Datos del formulario:", data);
      const formData: CredentialsSingIn = { ...data, imgUrl: avatarDefa };
      const token = await singInService(formData);
      console.log("Token recibido:", token);
      ToastiSuccess("... ¡Su registro ha sido EXITOSO! ✅");
      reset(); // Limpia el formulario después de un registro exitoso
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      ToastiError("Hubo un error al registrar. Por favor, inténtelo de nuevo.");
    } finally {
      setOpenBackdrop(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitSingIn)}>
    <Grid
      container
      rowSpacing={4}
      bgcolor={theme.palette.primary.light}
      padding={4}
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
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                required
                className="animate__animated animate__fadeIn"
              />
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Controller
            name="ubication"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Ubicación"
                variant="outlined"
                fullWidth
                error={!!errors.ubication}
                helperText={errors.ubication ? errors.ubication.message : ""}
                required
                className="animate__animated animate__fadeIn"
              >
                {provinciasArgentina.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Teléfono"
                variant="outlined"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
                required
                className="animate__animated animate__fadeIn"
              />
            )}
          />
        </Grid>
        <Grid xs={6} justifyContent="center" display="flex">
          <Grid container display="flex" justifyContent="center">
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
            type="submit"
            className="button button-secundary"
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
    </Grid></form>
  );
};

export default RegisterUser;
