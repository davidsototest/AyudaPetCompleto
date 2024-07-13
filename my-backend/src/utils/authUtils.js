const jwt = require('jsonwebtoken');
const config = require('../config/config');

//funcion para generar el token, usar en login y crear user
const generateToken = (userId) => {
    return jwt.sign({userId}, config.secretKey, {expiresIn : config.tokenExpiresIn});
};

//validar que el token es el correcto
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};

module.exports = {
    generateToken,
    verifyToken
};