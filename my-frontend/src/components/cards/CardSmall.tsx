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
import React, { useState } from "react";
import { PetInfo } from "../data/petInfo";
import ModalPublication from "../modal/ModalPublication";
import { comments } from "../data/commentsTest";

// img1_src: img pet
// img1_alt: img pet
// strong_text: name pet
// height: height pet
// color: color pet
// race: race pet
// img2_src: img user
// img2_alt: img user
// span1_text: name user
// span2_text: ubication user



interface CardSmallProps {
  petInfo: PetInfo;
  skeleton?: boolean;
}

const CardSmall: React.FC<CardSmallProps> = ({ petInfo, skeleton=false }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <CardActionArea onClick={handleOpen}>
          {skeleton ? (
            <Skeleton width="100%" height="142px" />
          ) : (
            <CardMedia
              component="img"
              height="180px"
              image={petInfo.img1_src}
              alt={petInfo.img1_alt}
            />
          )}
          <CardContent>
            <Grid container>
              <Grid xs={12}>
                {skeleton ? (
                  <Skeleton width="100%" height="50px" />
                ) : (
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    {petInfo.strong_text}
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
                  <Typography>
                    {`${petInfo.height} cm de alto | ${petInfo.color} | ${petInfo.race}`}
                  </Typography>
                )}
              </Grid>
              <Grid container width="100%">
                <Grid xs={2.5} display="flex" alignItems="center">
                  {skeleton ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar src={petInfo.img2_src} alt={petInfo.img2_alt} />
                  )}
                </Grid>
                <Grid xs={8.5}>
                  {skeleton ? (
                    <Skeleton width="100%" height="50px" />
                  ) : (
                    <>
                      <Typography variant="h6">{petInfo.span1_text}</Typography>
                      <Typography>{petInfo.span2_text}</Typography>
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
          <ModalPublication comments={comments} />
        </Box>
      </Modal>
    </>
  );
};

export default CardSmall;
