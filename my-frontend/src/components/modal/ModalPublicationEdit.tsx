import { Box, Divider, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import InContrucction from "../others/InContruction";

interface Props {
  handleClose: () => void;
}

const ModalPublicationEdit: React.FC<Props> = ({ handleClose }) => {
  const theme = useTheme();

  const style = {
    height: "1px",
    marginTop: "10px",
    marginBottom: "10px",
  };

  return (
    // <Grid container sx={{ color: theme.palette.primary.main }}>
    //   <Grid
    //     xs={11}
    //     textAlign="center"
    //     sx={{ color: theme.palette.primary.dark }}
    //   >
    //     <Typography
    //       variant="h4"
    //       className="animate__animated animate__backInDown"
    //     >
    //       Editar Publicación
    //     </Typography>
    //   </Grid>
    //   <Grid xs={1} justifyContent="end" display="flex">
    //     <CloseIcon
    //       sx={{
    //         color: theme.palette.primary.dark,
    //         fontSize: 40,
    //         cursor: "pointer",
    //       }}
    //       onClick={handleClose}
    //     />
    //   </Grid>
    //   <Grid xs={12}>
    //     <Divider style={style} />
    //   </Grid>
    //   <Grid container marginTop={5} width="100%">
    //     <Box
    //       sx={{
    //         flexGrow: 1,
    //         // height: "100%",
    //       }}
    //     >
    //       <Grid container spacing={2}>
    //         <Grid xs={6}>
    //           {/* <Paper sx={paperOne} className="animate__animated animate__pulse">
    //             <CardModalPublication petInfo={petInfo} />
    //           </Paper> */}
    //         </Grid>
    //         <Grid xs={6}>
    //           {/* <Paper sx={paperTwo}>
    //             <CommentsModal
    //               comments={comments}
    //               publicationId={petInfo.publication_id}
    //             />
    //           </Paper> */}
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Grid>
    // </Grid>
    <Grid>
      <InContrucction/>
    </Grid>
  );
};

export default ModalPublicationEdit;
