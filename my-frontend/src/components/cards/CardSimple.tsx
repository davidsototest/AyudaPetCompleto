import { Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import YouTube from "react-youtube";

interface Props {
  title: string;
  description: string;
  video: string;
}

const CardSimple: React.FC<Props> = ({ title, description, video }) => {

  const theme = useTheme();

  const opts = {
    height: "350",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Grid container rowGap={2} sx={{color: theme.palette.primary.main,}} className="animate__animated animate__fadeIn">
      <Grid xs={12} marginBottom={2} >
        <YouTube videoId={video} opts={opts} />
      </Grid>
      <Grid xs={12}>
        <Typography variant="h6">
            {title}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography>
            {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CardSimple;
