
import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';

interface Props {
    // Define props here
}

const metrics = [
    {num: 50, desc: "Publicaciones activas"},
    {num: 30, desc: "Artículos Educativos"},    
    {num: 10, desc: "Mascotas encontradas"},
];

const Metrics: React.FC<Props> = (Props) => {
    return (
        // <!---------------- Metricas de desempeño Pablo------------>

        <Grid container spacing={{ xs: 0, md: 5 }} padding={8} rowSpacing={{xs: 3, md: 0}}>
            <Grid item xs={12} md={3} alignContent={"center"}>
                <Typography variant='h4' color="primary" textAlign="center" padding={4}>
                    Metricas de desempeño
                </Typography>
            </Grid>
            {metrics.map ((metric) => (
                <Grid item key={metric.desc} xs={12} md={3}>
                    <Paper style={{ padding: 20, textAlign: 'center' }} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        <Typography variant='h3' marginBottom={1.5} color="primary.light">
                            {metric.num}+
                        </Typography>
                        <Typography color="primary.main">
                            {metric.desc}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
            
        </Grid>

        // <div className="container">
        //     <section className="containerM">
        //         <div className="boxMW">
        //             <h2 className="font-style-subtitle">Metricas de desempeño</h2>
        //         </div>
        //         <div className="boxM">
        //             <h2 className="font-style-subtitle">30+ Articulos en el blog</h2>
        //         </div>
        //         <div className="boxM">
        //             <h2 className="font-style-subtitle">+1000 Listado activo</h2>
        //         </div>
        //         <div className="boxM">
        //             <h2 className="font-style-subtitle">+5000 Listados totales en el sistema</h2>
        //         </div>
        //     </section>
        // </div>
    );
};

export default Metrics;