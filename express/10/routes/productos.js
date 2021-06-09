
import express from 'express';

import {getItems,getItem,postItem, updateItem, deleteItem} from '../controllers/index.js';

var routerItems = express.Router();

//Uso middleware a nivel de ruta porque me permite agregar funcionalidad de render sin modificar mucho el codigo original
function checkOrigin(req,res,next){
    
    //console.log(req);
    req.rendercustom = true;  
    if (req.headers['content-type']  && (!req.headers.connection)){
        //Si es un request via postman o otra herramienta via json que funcione de forma original
        //esto es lo malo de manejar render by server.
        //Con SPA la api queda desacoplada a diferencia de usar render en el server
        if (req.headers['content-type']==='application/json'){
            req.rendercustom=false;
        }
     }
    next();
}


//Ruta extra para renderizar formulario, no es la mejor practica, aunque este caso de uso de ejemplo es una alternativa
routerItems.get('/addproducto',(req, res) => {
    try {
        return res.render("layouts/add_producto");       
    } catch (error) {
        return res.status(500).json({error:error});
    }
});

//Rutas por default muestro los productos
routerItems.get("/",checkOrigin,getItems);
routerItems.get("/productos/vista",checkOrigin,getItems);

//Apis crud de antes
routerItems.get('/listar',checkOrigin, getItems);
routerItems.get('/listar/:id', getItem);
routerItems.post('/guardar',checkOrigin,postItem)
routerItems.put('/actualizar/:id',updateItem)
routerItems.delete('/borrar/:id',deleteItem)


export default routerItems;