require('dotenv').config();
const mysql = require('mysql2');

//conexion a la base de datos. 
//todos los datos sensibles estan en la variable de entorno .env
//para que no se suba al repo y solo nosotros tengamos los datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//validar la conexion a la base.
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos con ID ' + db.threadId);
});

module.exports = db;