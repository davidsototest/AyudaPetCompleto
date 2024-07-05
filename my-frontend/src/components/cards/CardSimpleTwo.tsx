import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

interface Props {
  img: string;
}

const CardSimpleTwo: React.FC<Props> = ({ img }) => {
  const theme = useTheme();

  return (
    <Grid>
      <Card
        sx={{
          width: "270px",
          background: theme.palette.primary.light,
          color: theme.palette.primary.main,
          boxShadow: "8",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={img}
            alt={img}
            sx={{
              height: "150px",
              width: "100%",
              objectFit: "cover",
            }}
          />
          <Grid xs={12} textAlign="center" padding={1}>
            <Typography variant="h6">Ver</Typography>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CardSimpleTwo;
