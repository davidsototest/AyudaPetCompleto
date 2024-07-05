const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const db = require ('../config/dbConfig');
const config = require('../config/config');
const userModel = require('../models/userModel');

const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
};

const hashedPasswordUser = (Password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(Password, saltRounds);
};
//--------------------------OBTENER TODOS LOS USUARIOS---------------------------
const getUsers = (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.status(404).json(results);   
        }       
    });   
}
//-------------------------  CREAR UN NUEVO USUARIO ------------------------------
const createUser = async (req, res) => {
    const { name, ubication, password, phone, email, imgUrl} = req.body;
    // valido los campos
    if(!name || !password || !email || !ubication || !phone){
        return res.status(400).json({ message: 'Faltan datos requeridos'})
    };

    //Valido  que sea un mail 
    if(!isValidEmail(email)) {
        return res.status(400).json({ message: 'Email invalido'})
    };

    //validar si el email ya esta registrado en la base de datos
    try {
        const userExist = await userModel.getUserExistsDB(email);
        if(userExist){
            return res.status(400).json({ message: 'El email ya esta siendo usado'})
        };
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el email en DDBB ...' });
    };

    //validar que el numero tenga 10 o mas digitos
    if(phone.length < 10) {
        return res.status(400).json({ message: 'El numero de telefono debe tener al menos 10 digitos'});
    };

    //hashar contrasenia
    const hashedPassword = hashedPasswordUser(password);

    //ahora que todo esta bien, envio todos los datos a la DDBB
    //Insertar usuario en la base de datos!
    const sqlInsertUser = 'INSERT INTO User (name, ubication, password, phone, email, status, imgUrl) VALUES (?,?,?,?,?,?,?)';
    db.query(sqlInsertUser, [name, ubication, hashedPassword, phone, email, 1, imgUrl], (err, result) => {
        if (err) {
            // Manejo del error
            console.error('Error al crear el usuario:', err); // Registro detallado del error
            return res.status(500).json({ message: 'Error al crear el usuario' });
        }

        //guardo el ID del user
        const userId = result.insertId;
        const token = jwt.sign({userId}, config.secretKey, {expiresIn : config.tokenExpiresIn});

        // Si no hay error, enviar la respuesta de éxito
        res.status(201).json({
            message: 'Usuario creado exitosamente!',
            token: token,
        });
    });
};

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
    getUsers,
    createUser,
    updateUser, 
    //register,
    login, 
    deleteUser
 };