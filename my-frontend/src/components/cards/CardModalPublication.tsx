import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

interface Props {
  // Define props here
}

const CardModalPublication: React.FC<Props> = (Props) => {
  const theme = useTheme();
  const style = {
    height: "1px",
    marginTop: "10px",
    marginBottom: "10px",
  };
  const skeleton = false;

  return (
    <Card
      sx={{
        maxWidth: 400,
        minWidth: 380,
        // background: theme.palette.primary.light,
        color: theme.palette.primary.main,
      }}
    >
      <CardMedia
        component="img"
        height="180px"
        image="https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/publicaciones%2Fmascota%20(12).jpg?alt=media&token=75d2a020-d5e0-41c9-a978-24163ea0fcff"
        alt="test"
      />
      <CardContent>
        <Typography>Nombre de la Mascota:</Typography>
        <Typography variant="h4">Goro</Typography>
        <Divider style={style} />
        <Typography>Raza:</Typography>
        <Typography variant="h5">Caniche</Typography>
        <Divider style={style} />
        <Grid container>
          <Grid xs={6}>
            <Typography>Estatus Aprox:</Typography>
            <Typography variant="h5">44 cm</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography>Color:</Typography>
            <Typography variant="h5">Negro</Typography>
          </Grid>
        </Grid>
        <Divider style={style} />
        <Typography style={{ fontWeight: "700" }}>Descripcion:</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          mollitia, cum doloremque et veritatis velit eos qui, fuga provident
          inventore repellendus temporibus explicabo tenetur consequatur iste
          cumque aliquid facere earum.
        </Typography>
        <Divider style={style} />
        <Grid container width="100%">
          <Grid xs={2.5} display="flex" alignItems="center">
            {skeleton ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Avatar
                src="https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/avatars%2Favatar%20(4).jpg?alt=media&token=35b77e01-830a-4936-b20e-d049f7398398"
                alt="test"
              />
            )}
          </Grid>
          <Grid xs={8.5}>
            {skeleton ? (
              <Skeleton width="100%" height="50px" />
            ) : (
              <>
                <Typography variant="h6">Nombre del user</Typography>
                <Typography>Rosario</Typography>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardModalPublication;
