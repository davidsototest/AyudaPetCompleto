import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePublications } from "../../context/PublicationsContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModalAddPublication from "../modal/ModalAddPublication";
import ModalPublication from "../modal/ModalPublication";
import { Publication } from "../../context/PublicationsContext";
import ModalPublicationEdit from "../modal/ModalPublicationEdit";
import { ToastiError } from "../toasti/ToastiError";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary.light,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//datos vacio de tipo Publications
export const dataTest = {
  publication_id: 0,
  publication_date: "",
  publication_description: "",
  publication_status: 0,
  user_name: "",
  user_id: 0,
  pet_id: 0,
  user_ubication: "",
  user_imgUrl: "",
  pet_name: "",
  pet_raze: "",
  pet_age: 0,
  pet_color: "",
  pet_size: "",
  pet_imgUrl: "",
};

interface Props {
  // Define props here
}

const PublicationsUser: React.FC<Props> = (Props) => {
  const theme = useTheme();
  const [openPublicationModal, setOpenPublicationModal] = useState(false);
  const [openAddPublicationModal, setOpenAddPublicationModal] = useState(false);
  const [openEditPublicationModal, setOpenEditPublicationModal] =
    useState(false);
  const [dataEdit, setDataEdit] = useState<Publication>(dataTest);
  const [petInfo, setPetInfo] = useState<Publication>(dataTest);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenAddPublication = () => setOpenAddPublicationModal(true);
  const handleClose = () => {
    setOpenPublicationModal(false);
    setOpenAddPublicationModal(false);
    setOpenEditPublicationModal(false);
  };
  const { user_name, user_id } = useAuth();
  const { getPublicationUserId, publicationsUserId, fetchComments, comments } =
    usePublications();

  //funcion al hacer clic en la card
  const handleOpenCard = (publication_id: number, publication: Publication) => {
    setOpenPublicationModal(true);
    getCommentsId(publication_id);
    setPetInfo(publication);
  };

  //funcion para editar la publicacion
  const handleOpenCardEdit = (publication: Publication) => {
    setDataEdit(publication);
    setOpenEditPublicationModal(true);
  };

  //busca todos los comentarios de esa publicacion
  const getCommentsId = async (publicationId: number) => {
    await fetchComments(publicationId);
  };

  //stylos del modal
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

  //validar status de la publicacion
  const statusIs = (status: number) => {
    switch (status) {
      case 0:
        return "Eliminada";
      case 1:
        return "Activa";
      case 2:
        return "Encontrado";
      default:
        return "Desconocido";
    }
  };

  useEffect(() => {
    const getPublicationsUserId = async () => {
      try {
        await getPublicationUserId(user_id);
      } catch (error) {
        console.log(
          "error al consultar en componente las publicaciones del user" + error
        );
      }
    };

    getPublicationsUserId();
  }, []);

  //funcion para el clic afuera del spinner
  const backdropToasti = () => {
    ToastiError("¡Espere mientras trabajamos! ⏳");
  };

  return (
    <Grid container sx={{ color: theme.palette.primary.main }}>
      <Grid xs={12} textAlign="center" marginBottom={4}>
        <Typography variant="h4">
          Publicaciones de <strong>{user_name.toUpperCase()}</strong>
        </Typography>
      </Grid>
      <Grid xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Typography variant="h5">Mascota</Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography variant="h6">Estado</Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography variant="h6">Opciones</Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {publicationsUserId.map((publication, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    <Typography variant="h6">{publication.pet_name}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {statusIs(publication.publication_status)}
                  </StyledTableCell>

                  {publication.publication_status === 0 ? (
                    <StyledTableCell></StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">
                      <button
                        className="button button-header"
                        onClick={() => handleOpenCardEdit(publication)}
                      >
                        EDITAR
                      </button>
                      <button
                        className="button button-header"
                        onClick={() =>
                          handleOpenCard(
                            publication.publication_id,
                            publication
                          )
                        }
                      >
                        VER
                      </button>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid display="flex" xs={12} justifyContent="end" marginTop={4}>
        <button
          className="button button-primary"
          style={{ display: "flex", alignItems: "center" }}
          onClick={handleOpenAddPublication}
        >
          <Typography variant="h5" sx={{ marginRight: "10px" }}>
            Agregar Publicación
          </Typography>
          <AddCircleOutlineIcon sx={{ display: "flex" }} />
        </button>
      </Grid>

      {/* MODAL  de Agregar publicacion*/}
      <Modal
        open={openAddPublicationModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalAddPublication handleClose={handleClose} user_id={user_id} />
        </Box>
      </Modal>

      {/* MODAL de ver publicacion */}
      <Modal
        open={openPublicationModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalPublication
            comments={comments}
            petInfo={petInfo}
            handleClose={handleClose}
          />
        </Box>
      </Modal>

      {/* MODAL de EDITAR publicacion */}
      <Modal
        open={openEditPublicationModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalPublicationEdit petInfo={dataEdit} handleClose={handleClose} setIsLoading={setIsLoading}/>
        </Box>
      </Modal>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={isLoading}
        onClick={backdropToasti}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </Grid>
  );
};

export default PublicationsUser;
