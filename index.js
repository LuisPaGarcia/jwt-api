// Cargamos las dependencias
var express = require('express');
var jwt = require('jsonwebtoken');

var app = express();

// Registramos la ruta de inicio que muestre un mensaje de bienvenida
// Esta ruta puede ser ingresada sin un token
app.get('/', function (req, res) {
    res.send("Bienvenido a nuestra Api!");
})

// En esta ruta vamos a generar automaticamente un token
// En un ejemplo real, debemos solicitar usuario y contraseña,
// Y si estos son validos podemos generar un token.
// Para efectos de este ejemplo, cada vez que se ingrese vamos a generar uno
// que sea valido por 2 minutos
app.get('/token', function (req, res) {
    var token = jwt.sign({ usuario: "luispa" }, process.env.secret, { expiresIn: 120 });
    res.send(`Tu token es: ${token}`)
})

// Registramos una ruta que requiera un token en la URL para ver la data
app.get('/api', function (req, res) {
    var token = req.query.token;
    jwt.verify(token, process.env.secret, function (err, decoded) {
        if (!err) {
            var secrets = { "Cuenta": "938291239", "Numeracion": "11289", "Tipo": "Monetaria", "informacion_privada": "EJEJ" };
            res.json(secrets);
        } else {
            res.send(err);
        }
    })
})

// Launch our app on port 3000
app.listen(process.env.PORT,()=>{
    console.log(`escuchando en el puerto ${process.env.PORT}`)
});