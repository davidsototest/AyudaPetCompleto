import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import CardSmall from "../components/cards/CardSmall";
import { Pagination, Typography } from "@mui/material";
import { Publication } from "../context/PublicationsContext";

interface CardSmallLayoutProps {
  petInfos: Publication[];
  skeleton: boolean;
}

const PublicationsCardSmall: React.FC<CardSmallLayoutProps> = ({
  petInfos,
  skeleton,
}) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = petInfos.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(petInfos.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Grid container spacing={5} justifyContent="center" margin={0}>
        {currentItems.map((pet: Publication, index: number) => (
          <Grid key={index} justifyContent="center" display="flex" className="animate__animated animate__bounceIn">
            <CardSmall petInfo={pet} skeleton={skeleton} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        size="large"
        count={Math.ceil(petInfos.length / itemsPerPage)} // Número total de páginas
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

export default PublicationsCardSmall;
