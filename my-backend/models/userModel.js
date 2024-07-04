// userModel.js
const db = require('../config/dbConfig');




//Obtengo el usuario por el email
const getUser = (userEmail, callback) => {
    db.query('SELECT * FROM user WHERE email = ?', [userEmail], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// // Crear un nuevo usuario
const create = (newUser, callback) => {
    db.query('INSERT INTO user SET ?', newUser, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

module.exports = {
    create,
    getUser
}
// // Obtener todos los usuarios
// exports.getAll = (callback) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, results);
//     });
// };

// // Obtener un usuario por ID
// exports.getById = (userId, callback) => {
//     db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, results);
//     });
// };

// // Crear un nuevo usuario
// exports.create = (newUser, callback) => {
//     db.query('INSERT INTO users SET ?', newUser, (err, result) => {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, result);
//     });
// };

// // Actualizar un usuario por ID
// exports.update = (userId, updatedUser, callback) => {
//     db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, result);
//     });
// };

// // Eliminar un usuario por ID
// exports.delete = (userId, callback) => {
//     db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, result);
//     });
// };
