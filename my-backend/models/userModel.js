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
};