import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { usePublications } from "../../context/PublicationsContext";
import { useForm, Controller } from "react-hook-form";
import { PublicationAdd } from "../../context/PublicationsContext";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import InContrucction from "../others/InContruction";

// Definición del esquema de validación
const schema = yup.object().shape({
  name_pet: yup.string().min(3, "El nombre debe tener al menos 3 caracteres").required("El nombre de la mascota es requerido"),
  raze_pet: yup.string().required("La raza es requerida"),
  age_pet: yup.number().min(0, "La edad no puede ser negativa").required("La edad es requerida"),
  color_pet: yup.string().required("El color es requerido"),
  size_pet: yup.number().min(0, "La altura no puede ser negativa").required("La altura es requerida"),
  description: yup.string().min(10, "La descripción debe tener al menos 10 caracteres").required("La descripción es requerida"),
  imgUrl_pet: yup.string().min(0, "La imagen es requerida").required("La imagen es requerida"),
  user_id: yup.number().min(0, "id es requerido").required("id es requerido"),
  date: yup.string().min(0, "date es requerido").required("date es requerido"),
});

interface Props {
  handleClose: () => void;
  user_id: number;
}

const ModalAddPublication: React.FC<Props> = ({ handleClose, user_id }) => {
  const theme = useTheme();
  const { addPublication } = usePublications();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<PublicationAdd>({
    resolver: yupResolver(schema),
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onSubmit = async (data: PublicationAdd) => {
    console.log("aqui")
    const submissionData = {
      ...data,
      user_id: user_id,
      date: new Date().toISOString().split('T')[0],
    };
    console.log(submissionData);
    try {
      await addPublication(submissionData);
    } catch (error) {
      console.log("error en onSubmi de compoennte" + error)
    } 
  };

  //cambio de imagen en el input
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileTypes = ["image/jpeg", "image/png", "image/webp", "image/tiff"];
      if (!fileTypes.includes(file.type)) {
        alert("Please upload an image in JPG, PNG, WEBP, or TIFF format.");
        setImageFile(null);
        setPreview(null);
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const style = {
    height: "1px",
    marginTop: "10px",
    marginBottom: "10px",
  };

  return (
    <Grid container sx={{ color: theme.palette.primary.main }}>
      <Grid
        xs={11}
        textAlign="center"
        sx={{ color: theme.palette.primary.dark }}
      >
        <Typography
          variant="h4"
          className="animate__animated animate__backInDown"
        >
          Agregar Publicación
        </Typography>
      </Grid>
      <Grid xs={1} justifyContent="end" display="flex">
        <CloseIcon
          sx={{
            color: theme.palette.primary.dark,
            fontSize: 40,
            cursor: "pointer",
          }}
          onClick={handleClose}
        />
      </Grid>
      <Grid xs={12}>
        <Divider style={style} />
      </Grid>
      <Grid container marginTop={5} xs={12}>
        <Grid xs={6}>
          <Typography variant="h5"><strong>Datos de la mascota</strong></Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name_pet"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Nombre de la mascota" 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.name_pet}
                  helperText={errors.name_pet?.message}
                />
              )}
            />
            <Controller
              name="raze_pet"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Raza" 
                  fullWidth 
                  margin="normal"
                  error={!!errors.raze_pet}
                  helperText={errors.raze_pet?.message}
                />
              )}
            />
            <Controller
              name="age_pet"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Edad aprox." 
                  fullWidth 
                  margin="normal"
                  error={!!errors.age_pet}
                  helperText={errors.age_pet?.message}
                />
              )}
            />
            <Controller
              name="color_pet"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Color" 
                  fullWidth 
                  margin="normal"
                  error={!!errors.color_pet}
                  helperText={errors.color_pet?.message}
                />
              )}
            />
            <Controller
              name="size_pet"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Altura Aprox." 
                  fullWidth 
                  margin="normal"
                  error={!!errors.size_pet}
                  helperText={errors.size_pet?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  multiline
                  rows={3}
                  fullWidth
                  margin="normal"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
            <Grid xs={12} justifyContent="center" display="flex" marginTop={3}>
              <button type="submit" className="button button-primary">
                ENVIAR FORMULARIO
              </button>
            </Grid>
          </form>
        </Grid>

        <Grid xs={6} justifyContent="center" alignContent="center">
          <Avatar
            src={preview || ""}
            sx={{ width: 250, height: 250, margin: "0 auto 20px auto" }}
          />
          <Grid xs={12} justifyContent="center" display="flex">
            <input
              accept="image/jpeg, image/png, image/webp, image/tiff"
              style={{ display: "none", margin: "auto" }}
              id="upload-photo"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="upload-photo">
              <Button variant="contained" component="span">
                Subir Imagen
              </Button>
            </label>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ModalAddPublication;
