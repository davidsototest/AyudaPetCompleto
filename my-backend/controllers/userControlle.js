
const db = require("../config/dbConfig");
const userModel = require("../models/userModel");
const isValidEmail = require("../utils/emailValidator");
const {
  hashedPasswordUser,
  comparePassword,
} = require("../utils/hashedPasswordUser");
const { generateToken, verifyToken } = require("../utils/authUtils");

//--------------------------OBTENER TODOS LOS USUARIOS---------------------------
const getUsersCount = (req, res) => {
  userModel.getUserCount((err, count) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener el conteo de usuarios" });
    }
    res.json({ count: count });
  });
};

//-------------------------  CREAR UN NUEVO USUARIO ------------------------------
const createUser = async (req, res) => {
  const { name, ubication, password, phone, email, imgUrl } = req.body;
  // valido los campos
  if (!name || !password || !email || !ubication || !phone) {
    return res.status(400).json({ message: "Faltan datos requeridos" });
  }

  //Valido  que sea un mail
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Email invalido" });
  }

  //validar si el email ya esta registrado en la base de datos
  try {
    const userExist = await userModel.getUserExistsDB(email);
    if (userExist) {
      return res.status(400).json({ message: "El email ya esta siendo usado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el email en DDBB ..." });
  }

  //validar que el numero tenga 10 o mas digitos
  if (phone.length < 10) {
    return res.status(400).json({
      message: "El numero de telefono debe tener al menos 10 digitos",
    });
  }

  //hashar contrasenia
  const hashedPassword = hashedPasswordUser(password);

  //ahora que todo esta bien, envio todos los datos a la DDBB
  //Insertar usuario en la base de datos!
  const sqlInsertUser =
    "INSERT INTO User (name, ubication, password, phone, email, status, imgUrl) VALUES (?,?,?,?,?,?,?)";
  db.query(
    sqlInsertUser,
    [name, ubication, hashedPassword, phone, email, 1, imgUrl],
    (err, result) => {
      if (err) {
        // Manejo del error
        console.error("Error al crear el usuario:", err); // Registro detallado del error
        return res.status(500).json({ message: "Error al crear el usuario" });
      }

      //guardo el ID del user
      const userId = result.insertId;

      //genero el token
      const token = generateToken(userId);

      // Si no hay error, enviar la respuesta de éxito
      res.status(201).json({
        message: "Usuario creado exitosamente!",
        token: token,
      });
    }
  );
};

// --------------------------------- MODIFICAR USUARIO POR ID ------PENDIENTE------------------------
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { Name, Ubication, Phone, Password, imgUrl } = req.body;

  //valido los campos
  if (!Name || !Ubication || !Phone || !Password || !imgUrl) {
    return res.status(400).json({ message: "Faltan datos en la peticion" });
  }
  //validar el usuario
  const sqlUser = "SELECT id FROM user WHERE id = ?";
  db.query(sqlUser, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error en la base de datos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    //validar el formato del numero
    if (Phone.length < 10) {
      return res.status(400).json({
        message: "El numero de telefono debe tener al menos 10 digitos",
      });
    }
    //actualizar datos del usuario
    const sqlUpdate =
      "UPDATE user SET Name = ?, Ubication = ?, Phone = ?, Password = ?, imgUrl = ? WHERE id = ?";
    db.query(
      sqlUpdate,
      [Name, Ubication, Phone, Password, imgUrl, userId],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: "Error al actualizar el usuario",
            error: err.message,
          });
        }
        res.json({ message: "Usuario modificado exitosamente!!" });
      }
    );
  });
};

//------------------------LOGIN USER-----------------------------------
const loginUser = (req, res) => {
  const { email, password } = req.body;

  //validar que llegen todos los datos
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos requeridos" });
  }

  userModel.getUser(email, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      //comparar contrasenias
      const passwordIsValid = comparePassword(password, result.password);

      //responder que un dato es incorrecto
      if (!passwordIsValid) {
        return res
          .status(400)
          .json({ message: "Email o contraseña incorrectos" });
      }

      //genero el token
      const token = generateToken(result.id);

      res.status(200).send({ auth: true, token: token, user_id: result.id });
    }
  });
};

//----------------------------DELETE USER--------------------------------------
const deleteUser = async (req, res) => {
  const { id } = req.body;
  let token = req.headers["authorization"];

  // Eliminar el prefijo "Bearer" si está presente
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // "Bearer " tiene 7 caracteres
  }

  //validar que enviaron el id y token
  if (!id || !token) {
    return res.status(400).json({ message: "Faltan datos requeridos" });
  }

  // Validar que el token sea válido
  try {
    const decoded = await verifyToken(token);
    const isValidToken = (token = decoded);
    if (!isValidToken) {
      return res.status(401).json({ message: "Token inválido o expirado ..." });
    }
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }

  // Validar que el usuario existe
  const sql = "SELECT * FROM User WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error en la base de datos", error: err.message });
    }
    if (result.length === 0 || result[0].status == 0)
      return res.status(404).send({ message: "Usuario no encontrado." });

    // "Eliminar" el usuario
    const sqlUpdate = "UPDATE User SET status = 0 WHERE id = ?;";
    db.query(sqlUpdate, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error al eliminar el usuario",
          error: err.message,
        });
      }
      res.status(202).json({ message: "Usuario eliminado exitosamente." });
    });
  });
};

//----------------------EXPORTACIONES--------------------------------
module.exports = {
  getUsersCount,
  createUser,
  updateUser,
  loginUser,
  deleteUser,
};
