import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import CardModalPublication from "../cards/CardModalPublication";
import CommentsModal from "../others/CommentsModal";
// import { Comment, comments } from "../data/commentsTest";
import "animate.css";
import { Comment, Publication } from "../../context/PublicationsContext";
import CloseIcon from "@mui/icons-material/Close";

interface PropsModal {
  comments: Comment[];
  petInfo: Publication;
  handleClose: () => void;
}

const ModalPublication: React.FC<PropsModal> = ({ comments, petInfo, handleClose }) => {
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
    <Grid container sx={{ color: theme.palette.primary.main }}>
      <Grid
        xs={11}
        textAlign="center"
        sx={{ color: theme.palette.primary.dark }}
      >
        <Typography
          variant="h4"
          className="animate__animated animate__backInDown"
        >
          Publicación de {petInfo.pet_name}
        </Typography>
      </Grid>
      <Grid xs={1} justifyContent="end" display="flex">
        <CloseIcon sx={{color: theme.palette.primary.dark, fontSize: 40, cursor: 'pointer' }} onClick={handleClose}/>
      </Grid>
      <Grid xs={12}>
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
            <Grid xs={6}>
              <Paper sx={paperOne} className="animate__animated animate__pulse">
                <CardModalPublication petInfo={petInfo} />
              </Paper>
            </Grid>
            <Grid xs={6}>
              <Paper sx={paperTwo}>
                <CommentsModal
                  comments={comments}
                  publicationId={petInfo.publication_id}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ModalPublication;
