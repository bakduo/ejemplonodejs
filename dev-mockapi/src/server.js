
const express = require('express'); 
const routerProductos = require('./routes/productos');
const handlebars = require('express-handlebars');
const WSocket = require("./util/wsocket");

//creo una app de tipo express
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config/index');
const { port } = config.server;

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

app.use('/productos',routerProductos);//productos/vista productos/vista-test
app.use('/api/productos',routerProductos);
app.set("view engine","hbs");
app.set("views",__dirname + "/views");

//wrapper TODO fix si crece
const customsocket = new WSocket(io);

customsocket.init();

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(port, () => {
    console.log(`servidor socket escuchando en http://localhost:${port}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error socket en el servidor:', error);
});
