import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import CardModalPublication from "../cards/CardModalPublication";
import CommentsModal from "../others/CommentsModal";
import { Comment, comments } from "../data/commentsTest";
import 'animate.css';

interface Props {
  comments: Comment[];
}

const ModalPublication: React.FC<Props> = ({ comments }) => {
  const theme = useTheme();

  const style = {
    height: "1px",
    marginTop: "10px",
    marginBottom: "10px",
  };

  const paperOne = {
    position: "fixed",
    width: "46%",
    height: "80vh",
    overflow: "auto",
    justifyContent: "center",
    display: "flex",
    background: "none",
    boxShadow: "none",
  };

  const paperTwo = {
    height: "80vh",
    overflow: "auto",
    background: "none",
    boxShadow: "none",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
  };

  return (
    <Grid container>
      <Grid xs={12} textAlign="center" >
        <Typography variant="h4" className="animate__animated animate__backInDown">Publicacion de Pep 12</Typography>
        <Divider style={style} />
      </Grid>
      <Grid container marginTop={5} width="100%">
        <Box
          sx={{
            flexGrow: 1,
            // height: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={6} >
              <Paper sx={paperOne} className="animate__animated animate__pulse">
                <CardModalPublication />
              </Paper>
            </Grid>
            <Grid xs={6}>
              <Paper sx={paperTwo}>
                <CommentsModal comments={comments} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        {/* <Grid xs={6}>
                    <CardModalPublication />
                </Grid>
                <Grid xs={6}>
                    <CommentsModal comments={comments} />
                </Grid> */}
      </Grid>
    </Grid>
  );
};

export default ModalPublication;
