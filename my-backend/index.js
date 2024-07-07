// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const db = require("./config/dbConfig");

const app = express();
const port = process.env.PORT || 3001; //process.env.PORT es para que al subirlo al serve en la nube tome el puesto que este entorno le asigne y no el 3001.
const publicationsRoutes = require("./routes/publicationsRoutes");
const userRoutes = require("./routes/userRoutes");

// Configuración de CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://example.com"], // Permite solo local y futuro hosting
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};

// Middleware para manejar CORS
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GET equipo 12");
});

app.put("/", (req, res) => {
  res.send("PUT equipo 12");
});

app.post("/", (req, res) => {
  res.send("POST equipo 12");
});

app.delete("/", (req, res) => {
  res.send("DELETE equipo 12");
});

app.use("/user", userRoutes);
app.use("/publications", publicationsRoutes);

app.listen(port, () => {
  console.log(`Servidor backend corriendo en:  http://localhost:${port}`);
});
