//toda esta data es de ejemplo para guiarnos

const db = require('../config/dbConfig');

// Obtener todos los usuarios
exports.getAll = (callback) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Obtener un usuario por ID
exports.getById = (userId, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Crear un nuevo usuario
exports.create = (newUser, callback) => {
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Actualizar un usuario por ID
exports.update = (userId, updatedUser, callback) => {
    db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Eliminar un usuario por ID
exports.delete = (userId, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};
