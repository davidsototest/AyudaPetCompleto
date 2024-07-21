import React from "react";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
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

  return (
    <Card
      sx={{
        background: theme.palette.secondary.dark,
        color: theme.palette.primary.main,
        boxShadow: "none",
      }}
    >
      <Grid container rowSpacing={3}>
        <Grid xs={12}>
          <Typography variant="h3">{publi.title}</Typography>
        </Grid>
        <Grid xs={12} paddingRight={50}>
          <Typography>{publi.describe}</Typography>
        </Grid>
        <Grid container width={"100%"} marginTop={3}>
          {describe.map((desc) => (
            <Grid
              key={desc.titleImg}
              xs={12}
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
