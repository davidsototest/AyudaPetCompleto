const db = require('../config/dbConfig');
const moment = require('moment');

// Validar formato de la fecha usando moment.js
const isValidDate = (date) => moment(date, 'YYYY-MM-DD', true).isValid();

// Validar existencia del usuario en la base de datos
const validateUserExistence = (userId, callback) => {
    const sql = 'SELECT id FROM User WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, false); // Usuario no encontrado
        }
        return callback(null, true); // Usuario encontrado
    });
};

// Validar existencia de una publicación en la base de datos
const validatePublicationExistence = (publicationId, callback) => {
    const sql = 'SELECT id FROM Publications WHERE id = ?';
    db.query(sql, [publicationId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, false); // Publicación no encontrada
        }
        return callback(null, true); // Publicación encontrada
    });
};

//-------------------------  Crear nuevo comentario ------------------------------
const createComment = (req, res) => {
    const { user_id, comment, date } = req.body;
    const { publicationId } = req.params;

    // Validar que vengan los campos requeridos
    if (!user_id || !publicationId || !comment || !date) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Validar que la fecha tenga el formato correcto
    if (!isValidDate(date)) {
        return res.status(400).json({ message: 'Formato de fecha inválido' });
    }

    // Validar existencia del usuario
    validateUserExistence(user_id, (err, userExists) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar el usuario', error: err.message });
        }
        if (!userExists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Validar existencia de la publicación
        validatePublicationExistence(publicationId, (err, publicationExists) => {
            if (err) {
                return res.status(500).json({ message: 'Error al verificar la publicación', error: err.message });
            }
            if (!publicationExists) {
                return res.status(404).json({ message: 'Publicación no encontrada' });
            }

            // Insertar comentario en la base de datos
            const sqlInsertComment = 'INSERT INTO Comments (user_id, publication_id, comment, date, status) VALUES (?, ?, ?, ?, ?)';
            db.query(sqlInsertComment, [user_id, publicationId, comment, date, 1], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ message: 'Error al crear el comentario' });
                    }
                    return res.status(500).json({ message: 'Error al crear el comentario', error: err.message });
                }
                res.status(201).json({ message: 'Comentario creado exitosamente!' });
            });
        });
    });
};

//-------------------EXPORTS--------------------------------------  
module.exports = {
    createComment
};
