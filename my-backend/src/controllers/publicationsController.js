const db = require("../config/dbConfig");
const publicationMiddleware = require("../middleware/loggerMiddleware");
const publicationModel = require("../models/publicationModel");
// const moment = require('moment');

// Validar formato de la fecha usando moment.js
// const isValidDate = (date) => moment(date, "YYYY-MM-DD", true).isValid();

//--------------------TRAER TODAS LAS PUBLICACIONES-----------------------
const getAllPublications = (req, res) => {
  const sql = `SELECT 
    p.id AS publication_id,
    p.date AS publication_date,
    p.description AS publication_description,
    p.status AS publication_status,
    u.name AS user_name,
    u.id AS user_id,
    u.ubication AS user_ubication,
    u.imgUrl AS user_imgUrl,
    pt.name AS pet_name,
    pt.raze AS pet_raze,
    pt.age AS pet_age,
    pt.color AS pet_color,
    pt.size AS pet_size,
    pt.imgUrl AS pet_imgUrl
FROM 
    bwarjdqn35lidbfwqtyy.Publications p
JOIN 
    bwarjdqn35lidbfwqtyy.User u ON p.user_id = u.id
JOIN 
    bwarjdqn35lidbfwqtyy.Pet pt ON p.pet_id = pt.id
WHERE 
    p.status IN (1, 2);`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send({
        message: "Error en el servidor al procesar la solicitud.",
        error: err,
      });
    }
    res.status(200).json(results);
  });
};

//-------------------------------- CREAR PUBLICACION-----------------------------------------------
const createPublication = (req, res) => {
  const {
    name_pet,
    raze_pet,
    age_pet,
    color_pet,
    size_pet,
    imgUrl_pet,
    user_id,
    date,
    description,
  } = req.body;

  // Valida que todos los campos estén presentes
  if (
    !name_pet ||
    !raze_pet ||
    !age_pet ||
    !color_pet ||
    !size_pet ||
    !imgUrl_pet ||
    !date ||
    !description ||
    !user_id
  ) {
    return res.status(400).json({ message: "Falta dato requerido" });
  }

  // Validar que la fecha tenga el formato correcto
  // if (!isValidDate(date)) {
  //   return res.status(400).json({ message: "Formato de fecha inválido" });
  // }

  // Valida que el usuario exista
  const sqlUser = "SELECT id FROM User WHERE id = ?";
  db.query(sqlUser, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error en la base de datos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    //CREAR el pet en la database
    const sqlPet =
      "INSERT INTO Pet (Name, Raze, Age, Color, Size, ImgUrl) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      sqlPet,
      [name_pet, raze_pet, age_pet, color_pet, size_pet, imgUrl_pet],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Error al crear el registro en PET",
            error: err.message,
          });
        }
        const pet_id = parseInt(result.insertId, 10);

        // Creada la mascota, procede a insertar la publicación
        const sql =
          "INSERT INTO Publications (user_id, pet_id, status, date, description) VALUES (?, ?, ?, ?, ?)";
        db.query(
          sql,
          [user_id, pet_id, 1, date, description],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Error al crear la publicación",
                error: err.message,
              });
            }
            res.status(200).json({
              message: "Publicación creada exitosamente",
            });
          }
        );
      }
    );
  });
};

// ------------------------------------- MODIFICAR PUBLICACION ID --------------------------------------------
const updatePublication = (req, res) => {
  const publicationId = req.params.id;
  const {
    name_pet,
    raze_pet,
    age_pet,
    color_pet,
    size_pet,
    imgUrl_pet,
    description,
    user_id,
    pet_id,
  } = req.body;

  // Valida que estén todos los campos presentes
  if (
    !name_pet ||
    !raze_pet ||
    !age_pet ||
    !color_pet ||
    !size_pet ||
    !imgUrl_pet ||
    !description ||
    !user_id ||
    !pet_id
  ) {
    return res.status(400).json({ message: "Falta dato requerido" });
  }

  // Valida que la publicación exista
  const sqlPublication = "SELECT id FROM Publications WHERE id = ?";
  db.query(sqlPublication, [publicationId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error en la base de datos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Validar que la mascota exista
    const sqlPet = "SELECT id FROM Pet WHERE id = ?";
    db.query(sqlPet, [pet_id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error en la base de datos" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Pet no encontrada" });
      }

      // Si la publicación y mascota existen, procede a actualizar la mascota
      const sqlUpdatePet =
        "UPDATE Pet SET Name = ?, Raze = ?, Age = ?, Color = ?, Size = ?, ImgUrl = ? WHERE id = ?";
      db.query(
        sqlUpdatePet,
        [name_pet, raze_pet, age_pet, color_pet, size_pet, imgUrl_pet, pet_id],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Error al actualizar la mascota",
              error: err.message,
            });
          }

          // Actualiza la publicación
          const sqlUpdatePublication =
            "UPDATE Publications SET user_id = ?, pet_id = ?, description = ? WHERE id = ?";
          db.query(
            sqlUpdatePublication,
            [user_id, pet_id, description, publicationId],
            (err, result) => {
              if (err) {
                return res.status(500).json({
                  message: "Error al actualizar la publicación",
                  error: err.message,
                });
              }
              res.status(200).json({
                message: "Publicación actualizada exitosamente",
              });
            }
          );
        }
      );
    });
  });
};

//--------------------DELETE PUBLICACION--------------------------
const deletePublication = (req, res) => {
  const { id } = req.params;

  // Validar que la publicación existe
  const sqlPublicationsId = "SELECT * FROM Publications WHERE id = ?";
  db.query(sqlPublicationsId, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error en la base de datos", error: err.message });
    }

    if (result.length == 0 || result[0].status == 0) {
      return res.status(404).send({ message: "La publicación no existe." });
    }

    // "Eliminar" la publicacion
    const sqlUpdate = "UPDATE Publications SET status = 0 WHERE id = ?;";
    db.query(sqlUpdate, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error al eliminar el comentario",
          error: err.message,
        });
      }
      res.status(200).json({ message: "Publicación eliminada exitosamente." });
    });
  });
};

//-------COUNT PUBLICACIONES --------------------
const getPublicationsCount = (req, res) => {
  console.log("aqui");

  publicationModel.getPublicationCount((err, count) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener el conteo de publicaciones" });
    }
    res.json({ count: count });
  });
};

// ----------- PUBLICATIONS DE UN USUARIO ---------------
const getPublicationsForUser = (req, res) => {
  const { user_id } = req.body;

  // Validar que el user existe
  const sqlUserId = "SELECT * FROM User WHERE id = ?";
  db.query(sqlUserId, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error en la base de datos al consultar usuario",
        error: err.message,
      });
    }
    if (result.length == 0 || result[0].status == 0) {
      return res.status(404).send({ message: "El usuario no existe." });
    }

    // Envar todas las publicaciones de ese usuario
    const sqlPublicationsUserId = `
    SELECT 
        p.id AS publication_id,
        p.date AS publication_date,
        p.description AS publication_description,
        p.status AS publication_status,
        u.name AS user_name,
        u.id AS user_id,
        u.ubication AS user_ubication,
        u.imgUrl AS user_imgUrl,
        pt.name AS pet_name,
        pt.raze AS pet_raze,
        pt.age AS pet_age,
        pt.color AS pet_color,
        pt.size AS pet_size,
        pt.imgUrl AS pet_imgUrl
    FROM 
        bwarjdqn35lidbfwqtyy.Publications p
    JOIN 
        bwarjdqn35lidbfwqtyy.User u ON p.user_id = u.id
    JOIN 
        bwarjdqn35lidbfwqtyy.Pet pt ON p.pet_id = pt.id
    WHERE 
        p.status IN (1, 2) 
        AND p.user_id = ?;`;
    db.query(sqlPublicationsUserId, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error en base de datos",
          error: err.message,
        });
      }
      res.status(200).json(result);
    });
  });
};

//-------------------EXPORTS--------------------------------------
module.exports = {
  getAllPublications,
  createPublication,
  updatePublication,
  deletePublication,
  getPublicationsCount,
  getPublicationsForUser,
};
