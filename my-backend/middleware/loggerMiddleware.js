// esta data es de ejemplo para guiarnos

const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Llama a la siguiente función de middleware en la cadena
};

module.exports = loggerMiddleware;


//como integrar enn el index.js
// Middleware de logger personalizado
// app.use(loggerMiddleware);