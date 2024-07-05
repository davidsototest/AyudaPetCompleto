import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Modal,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { EducateInfo } from "../data/educateInfo";
import ModalEducateInfo from "../modal/ModalEducateInfo";
import 'animate.css';

interface Props {
  educateInfo: EducateInfo;
  skeleton: boolean;
}

const CardSmallTwo: React.FC<Props> = ({ educateInfo, skeleton = false }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
        className="animate__animated animate__bounceIn"
      >
        <CardActionArea onClick={handleOpen}>
          {skeleton ? (
            <Skeleton width="100%" height="142px" />
          ) : (
            <CardMedia
              component="img"
              height="180px"
              image={educateInfo.imgMain}
              alt={educateInfo.title}
            />
          )}
          <CardContent>
            <Grid container>
              <Grid xs={12} height={70}>
                {skeleton ? (
                  <Skeleton width="100%" height="50px" />
                ) : (
                  <Typography variant="h5" sx={{ fontWeight: "700" }}>
                    {educateInfo.title.length > 44
                      ? `${educateInfo.title.slice(0, 44)}...`
                      : educateInfo.title}
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
                    {educateInfo.description.length > 60
                      ? `${educateInfo.description.slice(0, 60)}...`
                      : educateInfo.description}
                  </Typography>
                )}
              </Grid>
              <Grid textAlign="center" xs={12}>
                <Typography variant="h6">Abrir</Typography>
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
          <ModalEducateInfo educationInfoTwo={educateInfo.data} title={educateInfo.title}/>
        </Box>
      </Modal>
    </>
  );
};

export default CardSmallTwo;
