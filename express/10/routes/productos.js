const express = require('express');

const {getItems,getItem,postItem, updateItem, deleteItem} = require('../api/productos.js');
const CustomOrigin = require('../util/middleware');

const functionOrigin = new CustomOrigin();

const routerItems = express.Router();

routerItems.get('/addproducto',(req, res) => {
    try {
        return res.render("add_producto");
    } catch (error) {
        return res.status(500).json({error:error});
    }
});

//Rutas por default muestro los productos
routerItems.get("/",functionOrigin.checkOrigin,getItems);
routerItems.get("/productos/vista",functionOrigin.checkOrigin,getItems);

//Apis crud de antes
routerItems.get('/listar',functionOrigin.checkOrigin, getItems);
routerItems.get('/listar/:id', getItem);
routerItems.post('/guardar',functionOrigin.checkOrigin,postItem)
routerItems.put('/actualizar/:id',updateItem)
routerItems.delete('/borrar/:id',deleteItem)

module.exports = routerItems;