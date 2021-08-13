
import express from 'express';

import {getItems,getItem,postItem, updateItem, deleteItem} from '../api/productos.js';

import { checkOrigin } from '../util/middleware.js';

var routerItems = express.Router();

routerItems.get('/addproducto',(req, res) => {
    try {
        return res.render("add_producto");
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
