import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { getUserCount } from "../services/consultas/userService";

interface Props {
  // Define props here
}

const Metrics: React.FC<Props> = (Props) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(0);
  const [publications, setPublications] = useState(0);
  const [pets, setPets] = useState(0);

  //consultar todos los usuarios registrados.
  useEffect(() => {
    const fetchUserCount = async () => {
      // Verificar si el dato ya está en sessionStorage
      const countUserSesionStorage = sessionStorage.getItem("countUser");

      if (!countUserSesionStorage) {
        try {
          const countUser = await getUserCount();
          // const countPublication = await getUserCount();
          // const countPet = await getUserCount();
          // Almacenar el resultado en sessionStorage
          sessionStorage.setItem("countUser", JSON.stringify(countUser.count));
          setUsers(countUser.count);
          // setPublications();
          // setPets();
        } catch (error) {
          console.log("No se pudo obtener el conteo de usuarios.");
        } finally {
          setLoading(false);
        }
      } else {
        //si existe el dato lo parseo y lo envio al useState
        const countUserParse = JSON.parse(countUserSesionStorage);
        setUsers(countUserParse);
      }
    };

    fetchUserCount();
  }, []);

  return (
    // <!---------------- Metricas de desempeño Pablo------------>

    <Grid
      container
      spacing={{ xs: 0, md: 5 }}
      padding={8}
      rowSpacing={{ xs: 3, md: 0 }}
    >
      <Grid xs={12} md={3} alignContent={"center"}>
        <Typography variant="h4" color="primary" textAlign="center" padding={4}>
          Metricas de desempeño
        </Typography>
      </Grid>

      <Grid xs={12} md={3}>
        <Paper
          style={{ padding: 20, textAlign: "center" }}
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <Typography variant="h3" marginBottom={1.5} color="primary.light">
            {users}+
          </Typography>
          <Typography color="primary.main">Usuarios activos</Typography>
        </Paper>
      </Grid>

      <Grid xs={12} md={3}>
        <Paper
          style={{ padding: 20, textAlign: "center" }}
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <Typography variant="h3" marginBottom={1.5} color="primary.light">
            {publications}+
          </Typography>
          <Typography color="primary.main">Publicaciones activas</Typography>
        </Paper>
      </Grid>

      <Grid xs={12} md={3}>
        <Paper
          style={{ padding: 20, textAlign: "center" }}
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <Typography variant="h3" marginBottom={1.5} color="primary.light">
            {pets}+
          </Typography>
          <Typography color="primary.main">Mascotas encontradas</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Metrics;
