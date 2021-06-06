/**
 * ejemplo de un servidor http con express
 */

import express from 'express';
 
import routerItems from "./routes/index.js";

//import loadInitial from './util/load.js';

//creo una app de tipo express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',routerItems);

const puerto = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {    
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});