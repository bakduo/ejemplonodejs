/**
 * ejemplo de un servidor http con express
 */

//Migro app hacia commonjs en lugar de modules porque socket io como modules type no me funciono bien.
const express = require('express');
 
const Producto = require('./model/producto');

//creo una app de tipo express
const app = express();

// indico donde estan los archivos estaticos
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos',(req,res)=>{
  
  const p = new Producto();
  
  p.setId(1);
  p.setPrice(9900.0);
  p.setThumbail("sample thumbail");
  p.setTitle("Producto1");

  res.json({status:true,description:'Hello transpilador',producto:p});

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

module.exports = app; // for testing