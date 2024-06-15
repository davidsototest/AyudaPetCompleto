// toda esta data es de ejemplo, para tener en cuenta 

const userModel = require('../models/userModel');

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    userModel.getAll((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    userModel.getById(userId, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.json(result[0]);
        }
    });
};

// Crear un nuevo usuario
exports.createUser = (req, res) => {
    const newUser = req.body;
    userModel.create(newUser, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Usuario creado', userId: result.insertId });
        }
    });
};

// Actualizar un usuario por ID
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    userModel.update(userId, updatedUser, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.json({ message: 'Usuario actualizado' });
        }
    });
};

// Eliminar un usuario por ID
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    userModel.delete(userId, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.json({ message: 'Usuario eliminado' });
        }
    });
};