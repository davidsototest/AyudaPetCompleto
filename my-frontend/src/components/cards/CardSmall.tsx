import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Modal,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { PetInfo } from "../data/petInfo";
import ModalPublication from "../modal/ModalPublication";
// import { comments } from "../data/commentsTest";
import { Publication, usePublications } from "../../context/PublicationsContext";
import { Padding } from "@mui/icons-material";

interface CardSmallProps {
  petInfo: Publication;
  skeleton?: boolean;
}

const textStyle = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '290px',
  padding: "10px"
};

const CardSmall: React.FC<CardSmallProps> = ({ petInfo, skeleton=false }) => {
  const theme = useTheme();
  const [petInfoState, setPetInfoState] = useState<Publication>(petInfo || {
    publication_id: 0,
    publication_date: "",
    publication_description: "",
    publication_status: 0,
    user_name: "",
    user_id: 0,
    user_ubication: "",
    user_imgUrl: "",
    pet_name: "",
    pet_raze: "",
    pet_age: 0,
    pet_color: "",
    pet_size: "",
    pet_imgUrl: "",
  });
  
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const {fetchComments, comments} = usePublications();

  //funcion al hacer clic en la card
  const handleOpenCard = () => {
    setOpen(true);
    getCommentsId(petInfo.publication_id);
  };

  //busca todos los comentarios de esa publicacion
  const getCommentsId = async(publicationId: number) => {
    fetchComments(publicationId);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: "90vh",
    bgcolor: theme.palette.primary.light,
    border: `5px solid ${theme.palette.primary.dark}`,
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          minWidth: 345,
          background: theme.palette.primary.light,
          color: theme.palette.primary.main,
        }}
      >
        <CardActionArea onClick={handleOpenCard}>
          {skeleton ? (
            <Skeleton width="100%" height="142px" />
          ) : (
            <CardMedia
              component="img"
              height="180px"
              image={petInfoState.pet_imgUrl}
              alt={petInfoState.pet_imgUrl}
            />
          )}
          <CardContent>
            <Grid container>
              <Grid xs={12}>
                {skeleton ? (
                  <Skeleton width="100%" height="50px" />
                ) : (
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    {petInfoState.pet_name}
                  </Typography>
                )}
              </Grid>
              <Grid
                xs={12}
                textAlign="center"
                marginBottom={2}
                sx={{
                  background: theme.palette.secondary.light,
                  borderRadius: "15px",
                }}
              >
                {skeleton ? (
                  <Skeleton width="100%" height="50px" />
                ) : (
                  <Typography sx={textStyle}>
                    {`${petInfoState.pet_size} cm de alto | ${petInfoState.pet_color} | ${petInfoState.pet_raze}`}
                  </Typography>
                )}
              </Grid>
              <Grid container width="100%">
                <Grid xs={2.5} display="flex" alignItems="center">
                  {skeleton ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar src={petInfoState.user_imgUrl} alt={petInfoState.user_imgUrl} />
                  )}
                </Grid>
                <Grid xs={8.5}>
                  {skeleton ? (
                    <Skeleton width="100%" height="50px" />
                  ) : (
                    <>
                      <Typography variant="h6">{petInfoState.user_name}</Typography>
                      <Typography>{petInfoState.user_ubication}</Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* MODAL  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* aqui hay que modificar de donde vienen los datos para pasarle al modal...  */}
          <ModalPublication comments={comments} petInfo={petInfoState} handleClose={handleClose}/>
        </Box>
      </Modal>
    </>
  );
};

export default CardSmall;
