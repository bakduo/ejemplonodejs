const express = require('express');

const ProductoController = require('../api/productos');

const routerProduct = express.Router();

const ProductoDAO = require('../dao/producto-dao');

const config = require('../config/index');

const repo = new ProductoDAO(config.db);

const controller = new ProductoController(repo);

const CustomControl = require("../middleware/custom-control");

const control3 = require('../middleware/fake-control');

const control = new CustomControl();


/******Control router*************/
routerProduct.get('/vista-test',control3.cookieControl, controller.getVistaFake);
routerProduct.get('/vista',control3.cookieControl,controller.getVista);
routerProduct.get('/listar', controller.getAll);
routerProduct.get('/listar/:id',controller.get);
routerProduct.post('/guardar',controller.save);
routerProduct.put('/actualizar/:id',  controller.update);
routerProduct.delete('/borrar/:id',controller.delete);
routerProduct.delete('/borrarTodo',controller.deleteAll);


//refactor
//deshabilitamos grapql para test
// routerProduct.post('/guardar',(req,res)=>{
//     return res.status(200).json("Ahora solo por medio de GraphQL ");
// });

// routerProduct.get('/listar',(req,res)=>{
//     return res.status(200).json("Ahora solo por medio de GraphQL ");
// });

// routerProduct.get('/listar/:id',(req,res)=>{
//     return res.status(200).json("Ahora solo por medio de GraphQL ");
// });

/** ******************************* */

module.exports = routerProduct;