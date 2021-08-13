/**
 * ejemplo de un servidor http con express
 */

//Migro app hacia commonjs en lugar de modules porque socket io como modules type no me funciono bien.
const express = require('express');
 
const routerProductos = require('./routes/productos');

const handlebars = require('express-handlebars');

const WSocket = require("./util/wsocket");

//creo una app de tipo express
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// indico donde estan los archivos estaticos
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//using handlebars

app.engine("hbs",
    handlebars({
        extname: '.hbs',
        defaultLayaout: 'main.hbs',
        layoutDir: __dirname + "/views/layouts",
        partialDir: __dirname + "/views/partials"
    }) 
);

function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}

function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' })
    } else {
      next(err)
    }
}
  

//app.use('/',routerProductos);//Ahora usa public para poder tener socketio client-side
app.use('/api/productos',routerProductos);
app.set("view engine","hbs");
app.set("views","./views");


const puerto = process.env.PORT || 8080;

//wrapper TODO fix si crece
const customsocket = new WSocket(io);

customsocket.init();

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(puerto, () => {
    console.log(`servidor socket escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error socket en el servidor:', error);
});

module.exports = app; // for testing
