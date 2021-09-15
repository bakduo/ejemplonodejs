const express = require('express');

const ProductoController = require('../api/productos');

const routerProduct = express.Router();

const controller = new ProductoController();

const CustomControl = require("../middleware/custom-control");

const control3 = require('../middleware/fake-control');

const control = new CustomControl();


/******Control router*************/
routerProduct.get('/vista-test',control3.cookieControl, controller.getVistaFake);
routerProduct.get('/vista',control3.cookieControl,controller.getVista);
//routerProduct.get('/listar', controller.getAll);
//routerProduct.get('/listar/:id',controller.get);
//routerProduct.post('/guardar',control.checkForm,controller.save);
routerProduct.put('/actualizar/:id',  controller.update);
routerProduct.delete('/borrar/:id',controller.delete);
//refactor
routerProduct.post('/guardar',(req,res)=>{
    return res.status(200).json("Ahora solo por medio de GraphQL ");
});

routerProduct.get('/listar',(req,res)=>{
    return res.status(200).json("Ahora solo por medio de GraphQL ");
});

routerProduct.get('/listar/:id',(req,res)=>{
    return res.status(200).json("Ahora solo por medio de GraphQL ");
});

/** ******************************* */

module.exports = routerProduct;