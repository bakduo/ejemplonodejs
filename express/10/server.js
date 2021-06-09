/**
 * ejemplo de un servidor http con express
 */

import express from 'express';
 
import routerProductos from "./routes/productos.js";

import handlebars from "express-handlebars";

import path from 'path';

const __dirname = path.resolve();

//import loadInitial from './util/load.js';

//creo una app de tipo express
const app = express();

// indico donde estan los archivos estaticos
//app.use(express.static('public'));

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

app.use('/',routerProductos);
app.use('/api/productos',routerProductos);
app.set("view engine","hbs");
app.set("views","./views");

const puerto = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {    
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});