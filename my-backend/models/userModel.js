// userModel.js
const db = require('../config/dbConfig');


//Obtengo la cantidad de usuarios en la tabla User
const getUserCount = (callback) => {
    db.query('SELECT COUNT(*) AS count FROM User', (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0].count);
    });
};

//Obtengo el usuario por el email
const getUser = (email, callback) => {
    db.query('SELECT * FROM User WHERE email = ?', [email], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

//validar si el user EXISTE para permitir crear nuevo usuario
const getUserExistsDB = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM User WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            // Resuelve en true si el usuario existe, false si no existe
            resolve(results.length > 0);
        });
    });
};

// // Crear un nuevo usuario
const create = (newUser, callback) => {
    db.query('INSERT INTO User SET ?', newUser, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

module.exports = {
    create,
    getUser,
    getUserCount,
    getUserExistsDB
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
