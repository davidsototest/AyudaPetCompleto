const bcrypt = require('bcrypt');
const db = require ('../config/dbConfig');
const userModel = require('../models/userModel');

const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
};

const hashedPassword = (Password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(Password, saltRounds);
};

//-------------------------  CREAR UN NUEVO USUARIO ------------------------------
const createUser = (req, res) => {
    const { Name, Ubication, Password, Phone, Email, status, imgUrl} = req.body;
    // valido los campos
    if(!Name || !Password || !Email){
        return res.status(400).json({ message: 'Faltan datos requeridos'})
    }

    //Valido  que sea un mail 
    if(!isValidEmail(Email)) {
        return res.status(400).json({ message: 'Email invalido'})
    }

    if(Phone && Phone.length < 10) {
        return res.status(400).json({ message: 'El numero de telefono debe tener al menos 10 digitos'});
    }

    const hashedPassword = hashedPassword(Password);

    //Insertar usuario en la base de datos!
    const sqlInsertUser = 'INSERT INTO user (Name, Ubication, Password, Phone, Email, status, imgUrl) VALUES (?,?,?,?,?,?,?)';
    db.query(sqlInsertUser, [Name, Ubication, hashedPassword, Phone, Email, status, imgUrl], (err, result) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({message:'El usuario con el Email ya existe!'});
           }
           return res.status(500).json({message: 'Error al crear el usuario'})
        }
        res.status(201).json({message: 'Usuario creado exitosamente!'});
    });
}

// --------------------------------- MODIFICAR USUARIO POR ID ------------------------------------------
const updateUser = (req,res) => {
    const userId = req.params.id;
    const { Name, Ubication, Phone, Password, imgUrl } = req.body;

    //valido los campos
    if(!Name || !Ubication || !Phone || !Password || !imgUrl) {
        return res.status(400).json({ message: 'Faltan datos en l peticion'});
    }
    //validar el usuario
    const sqlUser ='SELECT id FROM user WHERE id = ?';
    db.query(sqlUser, [userId],(err,results) => {
        if(err){
            return res.status(500).json({ message: 'Error en la base de datos'});
        }
        if(results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado'});
        }
        //validar el formato del numero
        if(Phone.length < 10) {
            return res.status(400).json({ message: 'El numero de telefono debe tener al menos 10 digitos'});
        }
        //actualizar datos del usuario
        const sqlUpdate = 'UPDATE user SET Name = ?, Ubication = ?, Phone = ?, Password = ?, imgUrl = ? WHERE id = ?';
        db.query(sqlUpdate, [Name, Ubication, Phone, Password, imgUrl, userId],(err,results) => {
            if(err) {
                return res.status(500).json({ message: 'Error al actualizar el usuario', error: err.message});
            }
            res.json({message: 'Usuario modificado exitosamente!!'});
        });

    });
};


module.exports = {
    createUser,
    updateUser
};