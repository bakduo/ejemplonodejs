const express = require('express'); 
const routerProductos = require('./routes/productos');
const routerLogin = require('./routes/login');
const routerSession = require('./routes/session');
const routerProcess = require('./routes/wprocess');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const compression = require('compression');

//creo una app de tipo express
const app = express();
const config = require('./config/index');
const eplMiddleware = require('express-pino-logger')({
    // specify the logger
    logger: config.logger,
    // level to log
    useLevel: "info"
});

// indico donde estan los archivos estaticos
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(compression({ filter: shouldCompress, level: 6 }));

//Check compresion
//https://github.com/expressjs/compression
function shouldCompress (req, res) {
    if (req.headers['x-no-compression']){
      config.logger.info("Desde header");
      // don't compress responses with this request header
      return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
}

app.use(eplMiddleware);

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


module.exports = app;