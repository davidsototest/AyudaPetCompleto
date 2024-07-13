const bcrypt = require('bcryptjs');

//funcion para hashsar al crear el user
const hashedPasswordUser = (password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
};

//comparar contrasena hashsada con la enviada por el user
const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = {
    hashedPasswordUser,
    comparePassword
};