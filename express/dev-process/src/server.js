
const express = require('express'); 
const routerProductos = require('./routes/productos');
const routerLogin = require('./routes/login');
const routerSession = require('./routes/session');
const routerProcess = require('./routes/wprocess');
const handlebars = require('express-handlebars');
const WSocket = require("./util/wsocket");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


//creo una app de tipo express
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config/index');
const { port } = config.server;


// indico donde estan los archivos estaticos
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//initialize session
app.use(session({
    secret:'sample',
    store: config.session.getStore().getConnection(),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: config.timesession,expires:config.timesession },
}));

//using handlebars

app.engine("hbs",
    handlebars({
        extname: '.hbs',
        defaultLayaout: 'main.hbs',
        layoutDir: __dirname + "/views/layouts",
        partialDir: __dirname + "/views/partials"
    }) 
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/productos',routerProductos);//productos/vista productos/vista-test
app.use('/api/productos',routerProductos);
app.use('/',routerLogin);
app.use('/',routerProcess);
app.use('/session',routerSession);
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