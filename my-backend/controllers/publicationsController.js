const db = require("../config/dbConfig");
const publicationMiddleware = require("../middleware/loggerMiddleware");
const publicationModel = require("../models/publicationModel");

//--------------------TRAER TODAS LAS PUBLICACIONES-----------------------
const getAllPublications = (req, res) => {
  const sql = `SELECT pub.id, pub.status, pub.date,
                    User.name, User.ubication, User.phone, User.email, User.status as status_user, User.imgUrl as imgUrl_user,
                    Pet.name as name_pet, Pet.raze, Pet.age, Pet.color, Pet.size, Pet.imgUrl as imgUrl_pet from Publications pub 
                JOIN User ON pub.user_id = User.id 
                JOIN Pet ON pub.pet_id = Pet.id
                WHERE pub.status != 0`;
  db.query(sql, (err, results) => {
    if (results == "")
      return res
        .status(204)
        .send({ message: "No existe datos para la solicitud." });
    const publications = [];
    for (let i = 0; i < results.length; i++) {
      publications.push({
        id: results[i].id,
        status: results[i].status,
        date: results[i].date,
        user: {
          name: results[i].name,
          ubication: results[i].ubication,
          phone: results[i].phone,
          email: results[i].email,
          status: results[i].status,
          imgUrl: results[i].imgUrl_user,
        },
        pet: {
          name: results[i].name_pet,
          raze: results[i].raze,
          age: results[i].age,
          color: results[i].color,
          size: results[i].size,
          imgUrl: results[i].imgUrl_pet,
        },
      });
    }
    res.json(publications);
  });
};
//---------------------TRAER PUBLICACIONES POR ID---------------------------
const getPublicationById = (req, res) => {
  const { id } = req.params;
  publicationModel.getPublicationById(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Publicación no encontrada" });
    } else {
      const result = {
        id: results[0].id,
        status: results[0].status,
        date: results[0].date,
        pet: {
          name: results[0].name_pet,
          raze: results[0].raze,
          age: results[0].age,
          size: results[0].size,
          color: results[0].color,
          description: results[0].description,
          imgUrl: results[0].imgUrl_pet,
        },
        user: {
          name: results[0].name,
          ubication: results[0].ubication,
          phone: results[0].phone,
          email: results[0].email,
          status: results[0].status_user,
          imgUrl: results[0].imgUrl_user,
        },
        comments: [],
      };
      if (!results[0].comment) return res.json(result);
      for (let i = 0; i < results.length; i++) {
        const comment = {
          id: results[i].id_com,
          comment: results[i].comment,
          date: results[i].date_com,
          status: results[i].status_com,
          user_name: results[i].user_com.name,
          user_ubication: results[i].user_com.ubication,
          user_phone: results[i].user_com.phone,
          user_email: results[i].user_com.email,
          user_status: results[i].user_com.status,
          user_imgUrl: results[i].user_com.imgUrl,
        };

        result.comments.push(comment);
      }
      res.json(result);
    }
  });
};
//-------------------------------- CREAR PUBLICACION-----------------------------------------------
const createPublication = (req, res) => {
  const { status, date, description, user_id, pet_id } = req.body;

  // Valida que todos los campos estén presentes
  if (!status || !date || !description || !user_id || !pet_id) {
    return res.status(400).json({ message: "Falta dato requerido" });
  }

  // Valida que el usuario exista
  const sqlUser = "SELECT id FROM user WHERE id = ?";
  db.query(sqlUser, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error en la base de datos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // El usuario existe, procede a insertar la publicación
    const sql =
      "INSERT INTO publication (user_id, pet_id, status, date, description) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [user_id, pet_id, status, date, description],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({
              message: "Error al crear la publicación",
              error: err.message,
            });
        }
        res
          .status(201)
          .json({
            message: "Publicación creada exitosamente",
            publicationId: result.insertId,
          });
      }
    );
  });
};
// ------------------------------------- MODIFICAR PUBLICACION ID --------------------------------------------

const updatePublication = (req, res) => {
  const publicationId = req.params.id;
  const { status, date, description, user_id, pet_id } = req.body;

  // Valida que estén todos los campos presentes
  if (!status || !date || !description || !user_id || !pet_id) {
    return res.status(400).json({ message: "Falta dato requerido" });
  }

  // Valida que la publicación exista
  const sqlPublication = "SELECT id FROM publication WHERE id = ?";
  db.query(sqlPublication, [publicationId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error en la base de datos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    // Si la publicación existe, procede a actualizarla
    const sqlUpdate =
      "UPDATE publication SET status = ?, date = ?, description = ?, user_id = ?, pet_id = ? WHERE id = ?";
    db.query(
      sqlUpdate,
      [status, date, description, user_id, pet_id, publicationId],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({
              message: "Error al actualizar la publicación",
              error: err.message,
            });
        }
        res.json({ message: "Publicación modificada exitosamente" });
      }
    );
  });
};

// --------------------------------- MODIFICAR COMENTARIO POR ID --------------------------------------
const updateComment = (req, res) => {
  const { publicationId, commentId } = req.params;
  const { content } = req.body;

  // Validar que el usuario esté autenticado
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: "Usuario no autenticado." });
  }

  // Validar que todos los datos requeridos están presentes
  if (!content) {
    return res.status(400).json({ message: "Dato faltante." });
  }

  // Validar que la publicación existe
  const sqlPublication = "SELECT id FROM publication WHERE id = ?";
  db.query(sqlPublication, [publicationId], (err, publicationResults) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error en la base de datos", error: err.message });
    }
    if (publicationResults.length === 0) {
      return res.status(404).json({ message: "Publicación no encontrada." });
    }

    // Validar que el comentario existe
    const sqlComment =
      "SELECT id FROM comments WHERE id = ? AND publicationId = ?";
    db.query(sqlComment, [commentId, publicationId], (err, commentResults) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error en la base de datos", error: err.message });
      }
      if (commentResults.length === 0) {
        return res.status(404).json({ message: "Comentario no encontrado." });
      }

      // Actualizar datos del comentario
      const sqlUpdate = "UPDATE comments SET content = ? WHERE id = ?";
      db.query(sqlUpdate, [content, commentId], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({
              message: "Error al actualizar el comentario",
              error: err.message,
            });
        }
        res.json({ message: "Comentario modificado exitosamente." });
      });
    });
  });
};
//--------------------DELETE PUBLICACION--------------------------
const deletePublication = (req, res) => {
  const { id } = req.params;

  // Validar que la publicación existe
  const sql = "SELECT * FROM publications WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error en la base de datos", error: err.message });
    }
    if (result.length === 0 || result[0].status == 0)
      return res.status(404).send({ message: "La publicación no existe." });

    // "Eliminar" la publicacion
    const sqlUpdate = "UPDATE publications SET status = 0 WHERE id = ?;";
    db.query(sqlUpdate, [id], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({
            message: "Error al eliminar el comentario",
            error: err.message,
          });
      }
      res.status(204).send("Publicación eliminada exitosamente.");
    });
  });
};
//-------------------DELETE COMMENT--------------------------------------------------------------
const deleteComment = (req, res) => {
  const { publicationId, id } = req.params;

  //Validar Existencia de la publicación
  const sqlPub = "SELECT * FROM publications WHERE id = ?";
  db.query(sqlPub, [publicationId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error en la base de datos", error: err.message });
    }
    if (result.length === 0 || result[0].status == 0)
      return res.status(404).send({ message: "Publicación no encontrada." });

    //Validar la existencia del comentario
    const sqlCom = "SELECT * FROM comments WHERE id = ?";
    db.query(sqlCom, [id], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error en la base de datos", error: err.message });
      }
      if (result.length === 0 || result[0].status == 0)
        return res.status(404).send({ message: "Comentario no encontrado." });

      //"Eliminar" el comentario
      const sqlUpdate = "UPDATE comments SET status = 0 WHERE id = ?;";
      db.query(sqlUpdate, [id], (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({
              message: "Error al eliminar el comentario",
              error: err.message,
            });
        }
        res.status(204).send("Publicación eliminada exitosamente.");
      });
    });
  });
};
//-------------------EXPORTS--------------------------------------
module.exports = {
  getAllPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  updateComment,
  deletePublication,
  deleteComment,
};
