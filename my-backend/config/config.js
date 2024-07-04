require('dotenv').config()

module.exports = {
        secretKey : process.env.secretKey,
        tokenExpiresIn : '1h'
    }