const exampleModel = require('../models/userModel');

exports.getExample = (req, res) => {
    exampleModel.getAll((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

// esto es un test para validar como usar el controller