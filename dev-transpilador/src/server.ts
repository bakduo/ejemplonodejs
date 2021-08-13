/**
 * ejemplo de un servidor http con express
 */

//Migro app hacia commonjs en lugar de modules porque socket io como modules type no me funciono bien.
import express from "express";

//creo una app de tipo express
export const app = express();

// indico donde estan los archivos estaticos
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/api/productos',(req,res)=>{
  
  res.json({status:true,description:'Hello transpilador'});

});

app.use('/',(req,res)=>{

  res.json({status:true,description:'Works!!!!'});

});

const puerto = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor socket escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error socket en el servidor:', error);
});