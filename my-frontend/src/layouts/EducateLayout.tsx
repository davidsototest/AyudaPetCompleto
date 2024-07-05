import { Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import CardSmallTwo from "../components/cards/CardSmallTwo";
import { EducateInfo } from "../components/data/educateInfo";

interface Props {
  educateInfo: EducateInfo[],
  skeleton: boolean
}

const EducateLayoout: React.FC<Props> = ({educateInfo, skeleton}) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = educateInfo.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(educateInfo.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Grid container spacing={5} justifyContent="center" margin={0}>
        {currentItems.map((eduInfo: EducateInfo, index: number) => (
          <Grid key={index} justifyContent="center" display="flex">
            <CardSmallTwo educateInfo={eduInfo} skeleton={skeleton} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        size="large"
        count={Math.ceil(educateInfo.length / itemsPerPage)} // Número total de páginas
        page={currentPage} // Página actual
        onChange={handlePageChange} // Función para manejar el cambio de página
        shape="rounded"
        variant="outlined"
        color="primary"
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          color: "#010101",
          "& .MuiPaginationItem-page": {
            color: "#fff", // Color de los números de página no seleccionados
          },
          "& .MuiPaginationItem-icon": {
            color: "#fff", // Color del icono de flecha
          },
        }}
      />
    </div>
  );
};

export default EducateLayoout;
