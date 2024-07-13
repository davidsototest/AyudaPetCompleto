
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const db = require("./config/dbConfig");
 


const app = express();
const port = process.env.PORT || 3001; //process.env.PORT es para que al subirlo al serve en la nube tome el puesto que este entorno le asigne y no el 3001.
const commentsRoutes = require("../src/routes/commentsRoutes.js");
const publicationsRoutes = require("../src/routes/publicationsRoutes.js");
const userRoutes = require("../src/routes/userRoutes.js");

// Configuración de CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://example.com"], // Permite solo local y futuro hosting
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};

// Middleware para manejar CORS
app.use(cors(corsOptions));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/publications", publicationsRoutes);
app.use("/publications/comments", commentsRoutes);

app.listen(port, () => {
  console.log(`Servidor backend corriendo en:  http://localhost:${port}`);
});
