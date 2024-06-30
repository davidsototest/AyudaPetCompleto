const db = require('../config/dbConfig');

//-------------------------------- CREAR PUBLICACION-----------------------------------------------
const createPublication = (req, res) => {
    const { status, date, description, user_id, pet_id } = req.body;

    // Valida que todos los campos estén presentes
    if (!status || !date || !description || !user_id || !pet_id) {
        return res.status(400).json({ message: 'Falta dato requerido' });
    }

    // Valida que el usuario exista
    const sqlUser = 'SELECT id FROM user WHERE id = ?';
    db.query(sqlUser, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // El usuario existe, procede a insertar la publicación
        const sql = 'INSERT INTO publication (user_id, pet_id, status, date, description) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [user_id, pet_id, status, date, description], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al crear la publicación', error: err.message });
            }
            res.status(201).json({ message: 'Publicación creada exitosamente', publicationId: result.insertId });
        });
    });
};
// ------------------------------------- MODIFICAR PUBLICACION ID --------------------------------------------

const updatePublication = (req, res) => {
    const publicationId = req.params.id;
    const { status, date, description, user_id, pet_id } = req.body;

    // Valida que estén todos los campos presentes
    if (!status || !date || !description || !user_id || !pet_id) {
        return res.status(400).json({ message: 'Falta dato requerido' });
    }

    // Valida que la publicación exista
    const sqlPublication = 'SELECT id FROM publication WHERE id = ?';
    db.query(sqlPublication, [publicationId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        // Si la publicación existe, procede a actualizarla
        const sqlUpdate = 'UPDATE publication SET status = ?, date = ?, description = ?, user_id = ?, pet_id = ? WHERE id = ?';
        db.query(sqlUpdate, [status, date, description, user_id, pet_id, publicationId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al actualizar la publicación', error: err.message });
            }
            res.json({ message: 'Publicación modificada exitosamente' });
        });
    });
};

// --------------------------------- MODIFICAR COMENTARIO POR ID --------------------------------------
const updateComment = (req, res) => {
    const { publicationId, commentId } = req.params;
    const { content } = req.body;

    // Validar que el usuario esté autenticado
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: 'Usuario no autenticado.' });
    }

    // Validar que todos los datos requeridos están presentes
    if (!content) {
        return res.status(400).json({ message: 'Dato faltante.' });
    }

    // Validar que la publicación existe
    const sqlPublication = 'SELECT id FROM publication WHERE id = ?';
    db.query(sqlPublication, [publicationId], (err, publicationResults) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos', error: err.message });
        }
        if (publicationResults.length === 0) {
            return res.status(404).json({ message: 'Publicación no encontrada.' });
        }

        // Validar que el comentario existe
        const sqlComment = 'SELECT id FROM comments WHERE id = ? AND publicationId = ?';
        db.query(sqlComment, [commentId, publicationId], (err, commentResults) => {
            if (err) {
                return res.status(500).json({ message: 'Error en la base de datos', error: err.message });
            }
            if (commentResults.length === 0) {
                return res.status(404).json({ message: 'Comentario no encontrado.' });
            }

            // Actualizar datos del comentario
            const sqlUpdate = 'UPDATE comments SET content = ? WHERE id = ?';
            db.query(sqlUpdate, [content, commentId], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al actualizar el comentario', error: err.message });
                }
                res.json({ message: 'Comentario modificado exitosamente.' });
            });
        });
    });
};


module.exports = {
    createPublication,
    updatePublication,
    updateComment
};
