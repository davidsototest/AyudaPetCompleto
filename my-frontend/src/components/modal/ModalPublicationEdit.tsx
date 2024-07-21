import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Publication,
  PublicationUpdate,
  usePublications,
} from "../../context/PublicationsContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { dataTest } from "../profile/PublicationsUser";
import { ToastiError } from "../toasti/ToastiError";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";

//datos vacio de tipo Publications
export const dataTestPublicationUdpdate: PublicationUpdate = {
  name_pet: "",
  raze_pet: "",
  age_pet: 0,
  color_pet: "",
  size_pet: "",
  imgUrl_pet: "https://example.com/images/buddy.jpg",
  date: "",
  description: "",
  user_id: 0,
  pet_id: 0,
};

// Definición del esquema de validación
const schema = yup.object().shape({
  name_pet: yup
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre de la mascota es requerido"),
  raze_pet: yup.string().required("La raza es requerida"),
  age_pet: yup
    .number()
    .min(0, "La edad no puede ser negativa")
    .required("La edad es requerida"),
  color_pet: yup.string().required("El color es requerido"),
  size_pet: yup.string().required("La altura es requerida"),
  description: yup
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .required("La descripción es requerida"),
  imgUrl_pet: yup
    .string()
    .min(0, "La imagen es requerida")
    .required("La imagen es requerida"),
  date: yup
    .string()
    .min(0, "La fecha es requerida")
    .required("La fecha es requerida"),
  user_id: yup.number().required("user id es requerdo"),
  pet_id: yup.number().required("user id es requerdo"),
});
interface Props {
  handleClose: () => void;
  petInfo: Publication;
  setIsLoading:  (loading: boolean) => void;
}

const ModalPublicationEdit: React.FC<Props> = ({ handleClose, petInfo, setIsLoading }) => {
  const theme = useTheme();
  const { publicationUpdate } = usePublications();

  const [urlImg, setImgUrl] = useState("")
  const [petInfoUpdate, setPetInfoUpdate] = useState<PublicationUpdate>(
    dataTestPublicationUdpdate
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PublicationUpdate>({
    resolver: yupResolver(schema),
  });  

  //actualizo toda la info de petInfo a petInfoUpdate
  useEffect(() => {
    if (petInfo) {
      setPetInfoUpdate({
        name_pet: petInfo.pet_name,
        raze_pet: petInfo.pet_raze,
        age_pet: petInfo.pet_age,
        color_pet: petInfo.pet_color,
        size_pet: petInfo.pet_size,
        imgUrl_pet: petInfo.pet_imgUrl,
        date: petInfo.publication_date,
        description: petInfo.publication_description,
        user_id: petInfo.user_id,
        pet_id: petInfo.pet_id,
      });
      setImgUrl(petInfo.pet_imgUrl);
    }
  }, [petInfo]);

  //actualizar el estado con la data modificada
  const handleChange = (field: keyof PublicationUpdate, value: any) => {
    setPetInfoUpdate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //actualizar la publicacion
  const onSubmit = async () => {
    setIsLoading(true);
    setPetInfoUpdate((prev) => ({
      ...prev,
      date: new Date().toISOString().split("T")[0],
    }));
    try {
      await publicationUpdate(petInfoUpdate, petInfo.pet_id);
      handleClose();
    } catch (error) {
      console.log("error en onSubmit de componente: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  //ejecutar al detectar un cambio de imagen en el input
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const file = event.target.files?.[0];
    if (file) {
      const fileTypes = ["image/jpeg", "image/png", "image/webp", "image/tiff"];
      if (!fileTypes.includes(file.type)) {
        ToastiError("Imagen con formato o peso invalido!")
        return;
      }
      //enviar imagen a firebase storage
      try {
        const storageRef = ref(storage, `avatarsDePetsSubidasPorUsers/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setImgUrl(downloadURL);
      } catch (error) {
        console.error('Error al intentar subir a firebase la img: ', error);
      } finally {
        setIsLoading(false);
      }
      };      
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
          Actualizar Publicación
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
          <Typography variant="h5">
            <strong>Datos de la mascota</strong>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name_pet"
              control={control}
              defaultValue={petInfoUpdate.name_pet || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre de la mascota"
                  fullWidth
                  margin="normal"
                  error={!!errors.name_pet}
                  helperText={errors.name_pet?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("name_pet", e.target.value);
                  }}
                  value={petInfoUpdate.name_pet || ""}
                />
              )}
            />
            <Controller
              name="raze_pet"
              control={control}
              defaultValue={petInfoUpdate.raze_pet || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Raza"
                  fullWidth
                  margin="normal"
                  error={!!errors.raze_pet}
                  helperText={errors.raze_pet?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("raze_pet", e.target.value);
                  }}
                  value={petInfoUpdate.raze_pet || ""}
                />
              )}
            />
            <Controller
              name="age_pet"
              control={control}
              defaultValue={petInfoUpdate.age_pet || 0}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Edad aprox."
                  fullWidth
                  margin="normal"
                  error={!!errors.age_pet}
                  helperText={errors.age_pet?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("age_pet", e.target.value);
                  }}
                  value={petInfoUpdate.age_pet || 0}
                />
              )}
            />
            <Controller
              name="color_pet"
              control={control}
              defaultValue={petInfoUpdate.color_pet || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Color"
                  fullWidth
                  margin="normal"
                  error={!!errors.color_pet}
                  helperText={errors.color_pet?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("color_pet", e.target.value);
                  }}
                  value={petInfoUpdate.color_pet || ""}
                />
              )}
            />
            <Controller
              name="size_pet"
              control={control}
              defaultValue={petInfoUpdate.size_pet || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Altura Aprox."
                  fullWidth
                  margin="normal"
                  error={!!errors.size_pet}
                  helperText={errors.size_pet?.message}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("size_pet", e.target.value);
                  }}
                  value={petInfoUpdate.size_pet || 0}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue={petInfoUpdate.description || ""}
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
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange("description", e.target.value);
                  }}
                  value={petInfoUpdate.description || ""}
                />
              )}
            />
            <Grid xs={12} justifyContent="center" display="flex" marginTop={3}>
              <button type="submit" className="button button-primary">
                Actualizar datos
              </button>
            </Grid>
          </form>
        </Grid>

        <Grid xs={6} justifyContent="center" alignContent="center">
          <Avatar
            src={urlImg}
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

export default ModalPublicationEdit;
