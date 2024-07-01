const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const db = require ('../config/dbConfig');
const config = require('../config/config');
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
        return res.status(400).json({ message: 'Faltan datos en la peticion'});
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

//------------------------------------------------------------------------------------------
// REGISTRO ALTERNATIVO HECHO POR NICOLAS 
// const register = (req, res) => {
//     const newUser = req.body;
//     // valido los campos
//     if(!newUser.name || !newUser.password || !newUser.email || !newUser.ubication || !newUser.phone || !newUser.imgUrl){
//         return res.status(400).json({ message: 'Faltan datos requeridos'});
//     }

//     // //Valido  que sea un mail 
//     if(!isValidEmail(newUser.email)) {
//         return res.status(400).json({ message: 'Email invalido'});
//     }

//     if(newUser.phone && newUser.phone.length < 10) {
//         return res.status(400).json({ message: 'El numero de telefono debe tener al menos 10 digitos'});
//     }
//     const hashedPassword = bcrypt.hashSync(newUser.password, 8);
//     newUser.password = hashedPassword;

//     userModel.create(newUser, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//         } else {
//             res.status(201).json({ message: 'Usuario creado', userId: result.insertId });

//             const token = jwt.sign({ id: newUser.id}, config.secretKey, {expiresIn : config.tokenExpiresIn});

//             res.status(201).send({ auth : true, token});
//         }       
//     });
// }

const login = (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'Faltan datos requeridos'});
    }

    userModel.getUser(email, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            //const passwordIsValid = bcrypt.compareSync(password, result[0].password);
            //Comentada la linea de arriba porque nuestras contraseñas no estan encriptadas
            const passwordIsValid = password === result[0].password ;
            if(!passwordIsValid) return res.status(401).send({auth : false, token : null});

            const token = jwt.sign({id : result[0].id}, config.secretKey, {expiresIn : config.tokenExpiresIn});

            res.status(200).send({auth : true, token});     
        }       
    });   
}
//----------------------------DELETE--------------------------------------------------------------------
const deleteUser = (req, res) =>{
    const { id } = req.params;

    // Validar que el usuario existe
    const sql = 'SELECT * FROM user WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos', error: err.message });
        }
        if(result.length === 0 || result[0].status == 0) return res.status(404).send({ "message": "Usuario no encontrado." });

        // "Eliminar" el usuario
        const sqlUpdate = 'UPDATE user SET status = 0 WHERE id = ?;';
        db.query(sqlUpdate, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al eliminar el usuario', error: err.message });
            }
            res.status(204).send('Usuario eliminado exitosamente.') ;           
        });
        
    });
}
//-------------------------------------------------------------------------------------------------------
 module.exports = {
    createUser,
    updateUser, 
    //register,
    login, 
    deleteUser
 };