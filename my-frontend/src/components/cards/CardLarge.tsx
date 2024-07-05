import { Card, CardContent, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  img: string;
  describe: string;
  ver?: boolean;
  nameButtom?: string;
  path?: string;
}

const CardLarge: React.FC<Props> = ({ title, img, describe, ver=false, nameButtom, path="/" }) => {
  const navigate = useNavigate();
  const theme = useTheme();

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
        <img src={img} alt={title} className="img-card" />
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
