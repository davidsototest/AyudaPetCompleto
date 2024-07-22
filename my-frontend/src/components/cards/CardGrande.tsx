import React from "react";
import { Card, CardContent, Typography, useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  PublicationMainInfo,
  PublicationDetail,
} from "../data/publicationInfoHome";
import CardLarge from "./CardLarge";
import { Padding } from "@mui/icons-material";

interface Props {
  publi: PublicationMainInfo;
  describe: PublicationDetail[];
}

const CardGrande: React.FC<Props> = ({ publi, describe }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  let columnSpacingValue = 0;
  if (isSmMd) {
    columnSpacingValue = 2;
  }

  return (
    <Card
      sx={{
        background: theme.palette.secondary.dark,
        color: theme.palette.primary.main,
        boxShadow: "none",
      }}
    >
      <Grid container display="flex" justifyContent="center">
        <Grid xs={11} paddingBottom={2}>
          <Typography variant="h4">{publi.title}</Typography>
        </Grid>
        <Grid xs={11}>
          <Typography>{publi.describe}</Typography>
        </Grid>
        <Grid container width={"100%"} marginTop={3} display="flex" justifyContent="center" columnSpacing={columnSpacingValue}>
          {describe.map((desc) => (
            <Grid
              key={desc.titleImg}
              xs={12}
              sm={5}
              md={4}
              display="flex"
              justifyContent="center"
              marginBottom={4}
            >
              <CardLarge
                title={desc.titleImg}
                img1={desc.img1}
                img2={desc.img2}
                img3={desc.img3}
                describe={desc.descImg}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardGrande;
