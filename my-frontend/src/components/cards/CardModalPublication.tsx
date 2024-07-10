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
import { Publication } from "../../context/PublicationsContext";

interface CardModalPublications {
  petInfo: Publication;
  skeleton?: boolean;
}

const CardModalPublication: React.FC<CardModalPublications> = ({petInfo, skeleton=false}) => {
  const theme = useTheme();
  const style = {
    height: "1px",
    marginTop: "10px",
    marginBottom: "10px",
  };

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
        image={petInfo.pet_imgUrl}
        alt={petInfo.pet_imgUrl}
      />
      <CardContent>
        <Typography>Nombre de la Mascota:</Typography>
        <Typography variant="h4">{petInfo.pet_name}</Typography>
        <Divider style={style} />
        <Typography>Raza:</Typography>
        <Typography variant="h5">{petInfo.pet_raze}</Typography>
        <Divider style={style} />
        <Grid container>
          <Grid xs={6}>
            <Typography>Estatus Aprox:</Typography>
            <Typography variant="h5">{petInfo.pet_size} cm</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography>Color:</Typography>
            <Typography variant="h5">{petInfo.pet_color}</Typography>
          </Grid>
        </Grid>
        <Divider style={style} />
        <Typography style={{ fontWeight: "700" }}>Descripcion:</Typography>
        <Typography>
          {petInfo.publication_description}
        </Typography>
        <Divider style={style} />
        <Grid container width="100%">
          <Grid xs={2.5} display="flex" alignItems="center">
            {skeleton ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Avatar
                src={petInfo.user_imgUrl}
                alt={petInfo.user_imgUrl}
              />
            )}
          </Grid>
          <Grid xs={8.5}>
            {skeleton ? (
              <Skeleton width="100%" height="50px" />
            ) : (
              <>
                <Typography variant="h6">{petInfo.user_name}</Typography>
                <Typography>{petInfo.user_ubication}</Typography>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardModalPublication;
