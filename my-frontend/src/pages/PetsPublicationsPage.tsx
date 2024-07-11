import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import PublicationsCardSmall from "../layouts/PublicationsCardSmall";
import { petInfos } from "../components/data/petInfo";
import { Typography, useTheme } from "@mui/material";
import PublicationsInfo from "../layouts/PublicationsInfo";
import { maxWidth } from "../layouts/width";
import {
  mainInfo,
  detailInfo,
} from "../components/data/publicationInfoPublications";
import { usePublications } from "../context/PublicationsContext";
import { Publication } from "../context/PublicationsContext";

interface Props {
  // Define props here
}

const PetsPublicationsPage: React.FC<Props> = (Props) => {
  const [publicationsData, setPublicationsData] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { fetchPublications, publications } = usePublications();
  const theme = useTheme();

  // useEffect que consulta las publicaciones al montar el componente por primera vez
  useEffect(() => {
    if (publications.length === 0 ) {
      const getPublications = async () => {
        setIsLoading(true);
        try {
          await fetchPublications();
          setPublicationsData(publications);
        } catch (error) {
          setError(true);
          console.log("Error al consultar publicaciones: ", error);
        } finally {
          setIsLoading(false);
        }
      };

      getPublications();
    } else {
      setPublicationsData(publications);
    }
  }, []);

  return (
    <Grid container width={maxWidth} margin={"auto"}>
      <Grid xs={12} textAlign="center" padding={5}>
        <Typography variant="h2">Mascotas Extraviadas</Typography>
      </Grid>
      {error ? (
        <Grid
          xs={12}
          textAlign="center"
          sx={{ color: theme.palette.primary.main }}
        >
          <Typography variant="h5">
            Error al consultar las publicaciones ...
          </Typography>
        </Grid>
      ) : (
        <Grid marginBottom="50px">
          <PublicationsCardSmall
            petInfos={publicationsData}
            skeleton={isLoading}
          />
        </Grid>
      )}
      <Grid>
        <PublicationsInfo mainInfo={mainInfo} detailInfo={detailInfo} />
      </Grid>
    </Grid>
  );
};

export default PetsPublicationsPage;
