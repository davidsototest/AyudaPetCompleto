const db = require('../config/dbConfig');

//--------------------TRAER TODAS LAS PUBLICACIONES-----------------------
const getAllPublications = (req, res) => {
    const sql = 'SELECT id, user_id, pet_id, status, date FROM publications WHERE status != 0';
    db.query(sql, (err, results) => {
        if(results == '') return res.status(204).send({ message: 'No existe datos para la solicitud.'});
        res.json(results);
    })
}
//---------------------TRAER PUBLICACIONES POR ID---------------------------
const getPublicationById = (req, res) => {
    const { id } = req.params;
    const sql = 'select pub.id, pub.user_id, pub.pet_id, pub.status, pub.date, pub.description, com.id as id_com, com.status as status_com, com.comment,  com.date as date_com, com.user_id as user_id_com from publications pub left join comments com on pub.id = com.publication_id where pub.id = ?';
    db.query(sql, [id], (err, results) => {
        if(results == '') return res.status(404).send({ message: 'No existe recursos para la solicitud.'});
        const result = {
            id : results[0].id,
            user_id : results[0].user_id,
            pet_id : results[0].pet_id,
            status : results[0].status,
            date : results[0].date,
            description : results[0].description,
            comments : []
        }
        if(!results[0].comment) return res.json(result);
        for (let index = 0; index < results.length; index++) {
            result.comments.push({id : results[index].id_com, comment : results[index].comment, date : results[index].date_com, user_id : results[index].user_id_com, status : results[index].status_com});            
        }
        res.json(result);
    });
}
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
    getAllPublications,
    getPublicationById,
    createPublication,
    updatePublication,
    updateComment
};
