import {
  Button,
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
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePublications } from "../../context/PublicationsContext";

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

interface Props {
  // Define props here
}

const PublicationsUser: React.FC<Props> = (Props) => {
  const theme = useTheme();
  const { user_name, user_id } = useAuth();
  const { getPublicationUserId, publicationsUserId } = usePublications();

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

  return (
    <Grid container sx={{ color: theme.palette.primary.main }}>
      <Grid xs={12}>
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
                    <Typography variant="h5">
                    Mascota
                    </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                    <Typography variant="h6">
                    Estado
                    </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Typography variant="h6">
                    {"Opción"}
                    </Typography>
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
                    {statusIs(publication.status)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button className="button button-header">EDITAR</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PublicationsUser;
