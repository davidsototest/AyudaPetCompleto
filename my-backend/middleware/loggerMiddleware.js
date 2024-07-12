const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(!authHeader) return res.status(403).send({auth : false, message : 'No se creo el token.'})
    
    const token = authHeader.split(' ')[1]

    if(!token) return res.status(403).send({auth : false, message : 'El token no se genero correctamente.'})

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if(err) return res.status(500).send({auth : false, message : 'El token no se autentico.'})

        req.userId = decoded.id

        next()
    })
}