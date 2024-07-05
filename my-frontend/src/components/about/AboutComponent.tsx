import {
  Box,
  CardMedia,
  Container,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { maxWidth } from "../../layouts/width";

interface Props {
  // Define props here
}

const AboutComponent: React.FC<Props> = (Props) => {
  const theme = useTheme();
  const img = "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/about%2FAbout-002.jpg?alt=media&token=b46b8849-77e2-4653-8d48-3377e9719913";
  const img1 = "https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/about%2FAbout-003.jpg?alt=media&token=1567d75c-771b-48b2-9f14-274cd40e8c27";

  const img2 = "https://placehold.co/200x200";

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4, color: theme.palette.primary.main }}
    >
      <Box sx={{ p: 4, borderRadius: "15px" }}>
        <Typography variant="h3" gutterBottom textAlign="center" marginBottom={5}>
          Quiénes Somos
        </Typography>
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <CardMedia
              component="img"
              image={img}
              alt="Imagen de prueba"
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque et mi orci. Mauris malesuada metus ac libero
              volutpat, ac posuere mauris tristique. Integer euismod, lacus non
              consectetur vestibulum, lorem eros venenatis eros, at consequat
              lacus est at lacus. Sed vehicula auctor purus, a congue orci
              fringilla non.
            </Typography>
            <Typography variant="body1" paragraph>
              Nullam nec urna vel metus facilisis consequat. Quisque rutrum
              massa ut diam sollicitudin, quis vulputate urna convallis. Aenean
              sit amet justo sed nisi fermentum tincidunt. Donec nec nisi sit
              amet lacus commodo luctus. Curabitur a massa felis.
            </Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Phasellus finibus, mauris sit amet ultricies laoreet, velit risus
              efficitur est, nec bibendum sapien nisl ut mauris. Fusce bibendum
              scelerisque orci non commodo. Donec elementum, elit sed efficitur
              convallis, lacus felis consectetur libero, a tincidunt enim sapien
              et dolor.
            </Typography>
            <Typography variant="body1" paragraph>
              Suspendisse potenti. Praesent gravida purus at lacus aliquet, ac
              pretium erat hendrerit. Donec et dictum justo. Pellentesque quis
              tortor malesuada, viverra libero at, tincidunt urna. Donec dictum
              elit ut mauris interdum, ut porttitor ex bibendum.
            </Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <CardMedia
              component="img"
              image={img1}
              alt="Imagen de prueba"
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 10 }}>
          <Grid  xs={12} md={4} textAlign="center">
            <CardMedia
              component="img"
              image={img2}
              alt="Creador 1"
              sx={{ borderRadius: "10px", mb: 2 }}
            />
            <Typography variant="h6">Nombre del Creador 1</Typography>
          </Grid>
          <Grid  xs={12} md={4} textAlign="center">
            <CardMedia
              component="img"
              image={img2}
              alt="Creador 2"
              sx={{ borderRadius: "10px", mb: 2 }}
            />
            <Typography variant="h6">Nombre del Creador 2</Typography>
          </Grid>
          <Grid  xs={12} md={4} textAlign="center">
            <CardMedia
              component="img"
              image={img2}
              alt="Creador 3"
              sx={{ borderRadius: "10px", mb: 2 }}
            />
            <Typography variant="h6">Nombre del Creador 3</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutComponent;
