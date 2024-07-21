import { Card, CardContent, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import CarouselSolo from "../caruosel/CorouselSolo";

interface Props {
  title: string;
  img1: string;
  img2: string;
  img3: string;
  describe: string;
  ver?: boolean;
  nameButtom?: string;
  path?: string;
}

const CardLarge: React.FC<Props> = ({
  title,
  img1,
  img2,
  img3,
  describe,
  ver = false,
  nameButtom,
  path = "/",
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const images = [{ img: img1 }, { img: img2 }, { img: img3 }];

  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 350,
        padding: "20px",
        background: theme.palette.primary.light,
        color: theme.palette.primary.main,
      }}
    >
      <CardContent>
        <CarouselSolo images={images} height={300} />
        <Typography variant="h5" marginBottom={1} marginTop={3}>
          <strong>{title}</strong>
        </Typography>
        <Typography
          style={{
            fontStyle: "italic",
            marginBottom: "15px",
          }}
        >
          {describe}
        </Typography>
        {ver && (
          <ButtonSecondary onClick={() => navigate(path)}>
            {nameButtom}
          </ButtonSecondary>
        )}
      </CardContent>
    </Card>
  );
};

export default CardLarge;
