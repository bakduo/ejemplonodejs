'use strict'

const Koa = require('koa');
const koaBody = require('koa-body');
const routerProductos = require('./routes/productos');
const routerLogin = require('./routes/login');
const session = require('koa-session');
const passport = require('koa-passport');
const compression = require('koa-compress');
const cors = require('@koa/cors');
const config = require('./config/index');
const app = new Koa();

app.use(koaBody());
app.keys = [`${config.secret}`];
app.use(session({},app));

const logMiddleware = require('koa-pino-logger')({
    logger: config.logger,
    useLevel: "info"
});

app.use(cors(config.cors));

app.use(compression({ filter: shouldCompress,  threshold: 2048,
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false}));

function shouldCompress (type) {
    
    if (type=="application/json"){
      return false;
    }
    return true;
}

app.use(logMiddleware);

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(routerProductos.routes());
app.use(routerLogin.routes());

module.exports = app;
